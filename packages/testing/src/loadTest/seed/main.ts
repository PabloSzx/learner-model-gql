import { faker } from "@faker-js/faker";
import { execaCommand } from "execa";
import { groupBy, random, sample, sampleSize } from "lodash-es";
import pMap from "p-map";
import { resolve } from "path";
import { generate } from "randomstring";
import Tinypool from "tinypool";
import type { CreatedContent } from "./createContent";

const testDir = resolve(__dirname, "../../../../../test");

await execaCommand("docker-compose up -d", {
  cwd: testDir,
});

await execaCommand("docker-compose logs", {
  cwd: testDir,
});

export const DATABASE_URL = (process.env.DATABASE_URL =
  `postgresql://postgres:postgres@localhost:5789/test_${generate({
    length: Math.floor(Math.random() * 25) + 20,
  })}` as const);

await execaCommand("pnpm -r migrate:deploy", {
  env: {
    DATABASE_URL,
    NODE_ENV: "test",
  },
  stdio: "inherit",
});

export const { prisma } = await import("db");

const concurrency = 100;

export const n = {
  projects: 20,
  users: 10000,
  groups: 500,
  groupTags: 20,
  domains: 50,
  topics: 1500,
  kcs: 500,
  content: 1500,
  contentTags: 100,
  verbNames: 1000,
} as const;

function mapN(n: number): Array<undefined>;
function mapN<T>(n: number, cb: () => T): Array<T>;
function mapN(n: number, cb?: () => unknown): Array<unknown> {
  const list = new Array(n).fill(undefined);

  if (cb) return list.map(() => cb());

  return list;
}

const generateAlphabetic15chars = () =>
  generate({
    length: 15,
    charset: "alphabetic",
  });

const projectsCodes = mapN(n.projects, generateAlphabetic15chars);

console.log("Creating projects");

export const projects = await pMap(
  projectsCodes,
  (code) => {
    return prisma.project.create({
      data: {
        code,
        label: generateAlphabetic15chars(),
      },
    });
  },
  {
    concurrency,
  }
);

console.log(`${n.projects} projects created`);

const userTags = mapN(50, generateAlphabetic15chars);

console.log("Creating users...");

let currentUsersProgress = 0;

export const users = await pMap(
  mapN(n.users),
  async () => {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(
          generateAlphabetic15chars(),
          faker.internet.domainName()
        ),
        uids: {
          create: {
            uid: generate(),
          },
        },
        name: faker.name.firstName(),
        picture: faker.internet.url(),
        tags: {
          set: sampleSize(userTags, random(0, 4)),
        },
        projects: {
          connect: sampleSize(projects, random(1, 2)).map(({ id }) => ({ id })),
        },
      },
    });

    const percentProgress = (++currentUsersProgress / n.users) * 100;

    if (percentProgress % 10 === 0) {
      console.log(`${percentProgress}% of users created`);
    }

    return user;
  },
  {
    concurrency,
  }
);

console.log(`${n.users} users created`);

const groupsCodes = mapN(n.groups, generateAlphabetic15chars);

const groupsTags = mapN(n.groupTags, generateAlphabetic15chars);

console.log("Creating groups...");

export const groups = await pMap(
  groupsCodes,
  async (code) => {
    return prisma.group.create({
      data: {
        code,
        label: generateAlphabetic15chars(),
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

console.log(`${n.groups} groups created`);

const domainsCodes = mapN(n.domains, generateAlphabetic15chars);

console.log("Creating domains...");

export const domains = await pMap(
  domainsCodes,
  async (code) => {
    return prisma.domain.create({
      data: {
        code,
        label: generateAlphabetic15chars(),
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

console.log(`${n.domains} domains created`);

console.log("Creating topics...");

const topicsCodes = mapN(n.topics, generateAlphabetic15chars);

export const topics = await pMap(
  topicsCodes,
  async (code) => {
    return prisma.topic.create({
      data: {
        code,
        label: generateAlphabetic15chars(),
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

console.log(`${n.topics} topics created`);

console.log("Associating topics...");

export const topicsByProject = groupBy(topics, (v) => v.projectId);

export const topicsGrupedByProjectWithParent = await pMap(
  Object.values(topicsByProject),
  async (topics) => {
    const topicsLeftToAssign = [...topics];
    const topicsAssigned: typeof topicsLeftToAssign = [];

    const topicsTags = mapN(
      Math.floor(topics.length / 3),
      generateAlphabetic15chars
    );

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
          await prisma.topic.findUniqueOrThrow({
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
      projectId: topics[0]!.projectId,
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

console.log(`${n.topics} topics associated`);

console.log("Creating KCs...");

const kcsCodes = mapN(n.kcs, generateAlphabetic15chars);

export const kcs = await pMap(
  kcsCodes,
  async (code) => {
    return prisma.kC.create({
      data: {
        code,
        label: generateAlphabetic15chars(),
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

console.log(`${n.kcs} KCs created`);

console.log("Creating content...");

const contentCodes = mapN(n.content, generateAlphabetic15chars);

const contentTags = mapN(n.contentTags, generateAlphabetic15chars);

process.env.SILENT = "true";

const contentCreatePool = new Tinypool({
  filename: resolve(__dirname, "./createContent.ts"),
});

let currentContentProgress = 0;

export const content: CreatedContent[] = await Promise.all(
  contentCodes.map(async (code) => {
    const projectId = sample(projects)!.id;

    const content = await contentCreatePool.run({
      code,
      projectId,
      contentTags,
    });

    const percentProgress = (++currentContentProgress / n.content) * 100;

    if (percentProgress % 10 === 0) {
      console.log(`${percentProgress}% of content created`);
    }

    return content;
  })
);

console.log(`${n.content} content created`);

export const verbNames = mapN(n.verbNames, generateAlphabetic15chars);
