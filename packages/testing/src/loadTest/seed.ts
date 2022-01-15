import faker from "@faker-js/faker";
import assert from "assert";
import { execaCommand } from "execa";
import { random, sampleSize } from "lodash-es";
import pMap from "p-map";
import { resolve } from "path";
import { generate } from "randomstring";

const testDir = resolve(__dirname, "../../../../test");

await execaCommand("docker-compose up -d", {
  cwd: testDir,
});

await execaCommand("docker-compose logs", {
  cwd: testDir,
});

const DATABASE_URL =
  (process.env.DATABASE_URL = `postgresql://postgres:postgres@localhost:5789/test_${generate(
    {
      length: Math.floor(Math.random() * 25) + 20,
    }
  )}`);

await execaCommand("pnpm -r migrate:deploy", {
  env: {
    DATABASE_URL,
    NODE_ENV: "test",
  },
  stdio: "inherit",
});

export const { prisma } = await import("db");

export function probability(n: number): boolean {
  assert(n > 0 && n < 100);

  return random(0, 100, true) < n;
}

const concurrency = 100;

function mapN(n: number): Array<undefined>;
function mapN<T>(n: number, cb: () => T): Array<T>;
function mapN(n: number, cb?: () => unknown): Array<unknown> {
  const list = new Array(n).fill(undefined);

  if (cb) return list.map(() => cb());

  return list;
}

const nProjects = 20;

const projectsCodes = mapN(nProjects, generate);

export const projects = await Promise.all(
  projectsCodes.map((code) => {
    return prisma.project.create({
      data: {
        code,
        label: generate(),
      },
    });
  })
);

const nUsers = 10000;

const userTags = mapN(50, generate);

export const users = await pMap(
  mapN(nUsers),
  async () => {
    return await prisma.user.create({
      data: {
        email: faker.internet.email(generate(), generate()),
        uids: {
          create: {
            uid: generate(),
          },
        },
        name: generate(),
        picture: faker.internet.url(),
        tags: {
          set: sampleSize(userTags, random(0, 4)),
        },
      },
    });
  },
  {
    concurrency,
  }
);

const nGroups = 100;

const groupsCodes = mapN(nGroups, generate);

const groupsTags = mapN(20, generate);

export const groups = await pMap(
  groupsCodes,
  async (code) => {
    return await prisma.group.create({
      data: {
        code,
        label: generate(),
        projects: {
          connect: sampleSize(projects, random(0, 2)).map(({ id }) => ({
            id,
          })),
        },
        users: {
          connect: sampleSize(users, random(0, 150)).map(({ id }) => ({
            id,
          })),
        },
        tags: {
          set: sampleSize(groupsTags, random(0, 4)),
        },
      },
    });
  },
  {
    concurrency,
  }
);

const nDomains = 50;

const domainsCodes = mapN(nDomains, generate);

export const domains = await pMap(
  domainsCodes,
  async (code) => {
    return await prisma.domain.create({
      data: {
        code,
        label: generate(),
        projects: {
          connect: sampleSize(projects, random(1, 5)).map(({ id }) => ({ id })),
        },
      },
      include: {
        projects: true,
      },
    });
  },
  {
    concurrency,
  }
);
