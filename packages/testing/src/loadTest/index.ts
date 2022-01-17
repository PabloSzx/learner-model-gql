import assert from "assert";
import { kill } from "cross-port-killer";
import { execaCommand } from "execa";
import { sampleSize } from "lodash-es";
import { resolve } from "path";
import Tinypool from "tinypool";
import waitOn from "wait-on";
import { baseServicesList } from "../../../services/list";
import { nUsers, prisma, users, verbNames } from "./seed/main";

await prisma.$disconnect();

async function killServices() {
  await Promise.allSettled(
    [...Object.values(baseServicesList), 8080, 4010].map(kill)
  );
}

await killServices();

process.on("SIGINT", killServices);

Promise.all([
  execaCommand("pnpm -r start --filter=service-*", {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "test",
      ADMIN_USER_EMAIL: "pablosaez1995@gmail.com",
    },
  }),
  execaCommand("pnpm -r dev:localhost", {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "development",
    },
  }),
  execaCommand("pnpm -r test:watch:generate", {
    stdio: "inherit",
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

const concurrentUsersN = 100;

assert(concurrentUsersN < nUsers);

const usersActionsPool = new Tinypool({
  filename: resolve(__dirname, "./userActions.ts"),
});

while (true) {
  const concurrentUsers = sampleSize(users, concurrentUsersN);

  await Promise.all(
    concurrentUsers.map(({ id }) => {
      return usersActionsPool.run({
        userId: id,
        verbNames,
      });
    })
  );
}
