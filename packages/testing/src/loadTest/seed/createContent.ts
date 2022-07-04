import { faker } from "@faker-js/faker";
import { prisma } from "db";
import { random, sample, sampleSize } from "lodash-es";
import { generate } from "randomstring";

export type CreatedContent = Awaited<ReturnType<typeof createContent>>;

export default async function createContent({
  code,
  projectId,
  contentTags,
}: {
  code: string;
  projectId: number;
  contentTags: string[];
}) {
  const [possibleKcs, possibleTopics] = await Promise.all([
    prisma.kC.findMany({
      where: {
        domain: {
          projects: {
            some: {
              id: projectId,
            },
          },
        },
      },
      select: {
        id: true,
      },
    }),
    prisma.topic.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
      },
    }),
  ]);

  const chosenTopic = sample(possibleTopics);

  const percent = random(0, 100);

  let contentType: "url" | "json" | "binary";

  if (percent < 30) {
    contentType = "url";
  } else if (percent < 70) {
    contentType = "json";
  } else {
    contentType = "binary";
  }

  return prisma.content.create({
    data: {
      code,
      label: generate(),
      description: generate(),
      project: {
        connect: {
          id: projectId,
        },
      },
      kcs: {
        connect: sampleSize(possibleKcs, random(1, 4)).map(({ id }) => ({
          id,
        })),
      },
      topics: chosenTopic
        ? {
            connect: {
              id: chosenTopic.id,
            },
          }
        : undefined,
      tags: {
        set: sampleSize(contentTags, random(0, 3)),
      },
      url: contentType === "url" ? faker.internet.url() : undefined,
      json:
        contentType === "json" ? JSON.parse(faker.datatype.json()) : undefined,
      binary:
        contentType === "binary"
          ? Buffer.from(faker.lorem.paragraphs(random(10 ** 2, 10 ** 4)))
          : undefined,
      binaryFilename:
        contentType === "binary" ? generate() + ".txt" : undefined,
    },
    include: {
      project: true,
      kcs: true,
      topics: true,
    },
  });
}
