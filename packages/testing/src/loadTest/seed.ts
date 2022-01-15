import faker from "@faker-js/faker";
import assert from "assert";
import { execaCommand } from "execa";
import { random, sampleSize, sample, groupBy } from "lodash-es";
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

export const projects = await pMap(
  projectsCodes,
  (code) => {
    return prisma.project.create({
      data: {
        code,
        label: generate(),
      },
    });
  },
  {
    concurrency,
  }
);

const nUsers = 10000;

const userTags = mapN(50, generate);

export const users = await pMap(
  mapN(nUsers),
  async () => {
    return prisma.user.create({
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
        projects: {
          connect: sampleSize(projects, random(0, 2)).map(({ id }) => ({ id })),
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
    return prisma.group.create({
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
    return prisma.domain.create({
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

const nTopics = 1500;

const topicsCodes = mapN(nTopics, generate);

export const topics = await pMap(
  topicsCodes,
  async (code) => {
    return prisma.topic.create({
      data: {
        code,
        label: generate(),
        project: {
          connect: {
            id: sample(projects)!.id,
          },
        },
      },
    });
  },
  {
    concurrency,
  }
);

export const topicsByProject = groupBy(topics, (v) => v.projectId);

export const topicsGrupedByProjectWithParent = await pMap(
  Object.values(topicsByProject),
  async (topics) => {
    const topicsLeftToAssign = [...topics];
    const topicsAssigned: typeof topicsLeftToAssign = [];

    const topicsTags = mapN(Math.floor(topics.length / 3), generate);

    function pickTopic() {
      const topic = sample(topicsLeftToAssign);
      if (!topic) return;

      topicsLeftToAssign.splice(topicsLeftToAssign.indexOf(topic), 1);
      topicsAssigned.push(topic);
      return topic;
    }

    while (topicsLeftToAssign.length) {
      const parent = sample(topicsAssigned) || pickTopic()!;

      const child = pickTopic();

      if (!child) continue;

      await prisma.topic.update({
        where: {
          id: child.id,
        },
        data: {
          parent: {
            connect: {
              id: parent.id,
            },
          },
          tags: {
            set: sampleSize(
              topicsTags,
              random(0, Math.min(4, topicsTags.length))
            ),
          },
        },
        select: null,
      });
    }

    await Promise.all(
      topicsAssigned.map(async (topic) => {
        const childrens = (
          await prisma.topic.findUnique({
            where: {
              id: topic.id,
            },
            select: {
              childrens: {
                select: {
                  id: true,
                },
              },
            },
            rejectOnNotFound: true,
          })
        ).childrens;

        if (childrens.length > 1) {
          let index = 0;
          await Promise.all(
            childrens.map(async (topic) => {
              await prisma.topic.update({
                where: {
                  id: topic.id,
                },
                data: {
                  sortIndex: ++index,
                },
                select: null,
              });
            })
          );
        }
      })
    );

    return {
      projectId: topics[0].projectId,
      topics: await prisma.topic.findMany({
        where: {
          id: {
            in: topics.map((v) => v.id),
          },
        },
        include: {
          parent: true,
          project: true,
        },
      }),
    };
  },
  {
    concurrency,
  }
);

const nKcs = 500;

const kcsCodes = mapN(nKcs, generate);

export const kcs = await pMap(
  kcsCodes,
  async (code) => {
    return prisma.kC.create({
      data: {
        code,
        label: generate(),
        domain: {
          connect: {
            id: sample(domains)!.id,
          },
        },
      },
      include: {
        domain: {
          include: {
            projects: true,
          },
        },
      },
    });
  },
  {
    concurrency,
  }
);
