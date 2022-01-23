import assert from "assert";
import { kill } from "cross-port-killer";
import { execaCommand } from "execa";
import { sampleSize, uniqBy } from "lodash-es";
import ms from "ms";
import pMap from "p-map";
import { resolve } from "path";
import Tinypool from "tinypool";
import waitOn from "wait-on";
import { baseServicesList } from "../../../services/list";
import type { CreateUserActionsParams, UserActionsResult } from "./userActions";

async function killServices() {
  await Promise.allSettled(
    [...Object.values(baseServicesList), 8080, 4010].map(kill)
  );
}

await killServices();

const { n, prisma, users, verbNames } = await import("./seed/main");

const usersActionsParameters = await pMap(
  users,
  async (user): Promise<CreateUserActionsParams> => {
    const { email, uids, projects, groups } = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        email: true,
        uids: {
          select: {
            uid: true,
          },
        },
        projects: {
          select: {
            id: true,
          },
        },
        groups: {
          select: {
            projects: true,
          },
        },
      },
      rejectOnNotFound: true,
    });

    const uid = uids[0]?.uid;
    assert(uid, "UID not found for: " + email);

    const projectsFlat = uniqBy(
      [...projects, ...groups.flatMap((v) => v.projects)],
      (v) => v.id
    );

    return {
      uid,
      email,
      projects: projectsFlat.map((v) => v.id),
      verbNames,
    };
  },
  {
    concurrency: 10,
  }
);

await prisma.$disconnect();

process.on("SIGINT", killServices);
process.on("beforeExit", killServices);
process.on("exit", killServices);

const useMonoService = true;

Promise.all([
  execaCommand(
    `pnpm -r start --filter=${useMonoService ? "mono" : "service-*"}`,
    {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "test",
        ADMIN_USER_EMAIL: "pablosaez1995@gmail.com",
      },
    }
  ),
  execaCommand("pnpm -r dev:localhost", {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "development",
    },
  }),
]).catch((err) => {
  console.error(err);
  killServices().finally(() => {
    process.exit(0);
  });
});

await waitOn({
  resources: ["tcp:8080"],
});

console.log("---Gateway ready---");

const concurrentUsersN = 100;

assert(concurrentUsersN < n.users);

console.log("---Action creation started---");

const usersActionsPool = new Tinypool({
  filename: resolve(__dirname, "./userActions.ts"),
});

while (true) {
  const concurrentUsers = sampleSize(usersActionsParameters, concurrentUsersN);

  const start = performance.now();

  const results = await Promise.all(
    concurrentUsers.map((params): Promise<UserActionsResult> => {
      return usersActionsPool.run(params);
    })
  );

  const end = performance.now();

  const total = results.reduce(
    (acc, value) => {
      acc.requests += value.results.length;

      acc.duration += value.results.reduce((acc, value) => {
        return acc + value.duration;
      }, 0);

      return acc;
    },
    {
      requests: 0,
      duration: 0,
    }
  );

  const requestsFlat = results
    .flatMap((v) => v.results)
    .map((v) => v.duration)
    .sort((a, b) => a - b);

  const medianActionLatency = ms(
    requestsFlat[Math.floor(requestsFlat.length / 2)]!,
    {
      long: true,
    }
  );

  const averageActionLatency = ms(total.duration / total.requests, {
    long: true,
  });

  const resultsTime = ms(end - start, {
    long: true,
  });

  console.log({
    averageActionLatency,
    medianActionLatency,
    resultsTime,
    resultsAmount: total.requests,
    actionsPerSecond: total.requests / ((end - start) / 1000),
  });
}
