import { getNodeIdList } from "api-base";
import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    type Topic {
      id: IntID!

      content: [Content!]!
    }

    extend type Content {
      topics: [Topic!]!
    }

    extend type Query {
      topics(ids: [IntID!]!): [Topic!]!
    }
  `,
  {
    resolvers: {
      Content: {
        async topics({ id }, _args, { prisma }) {
          return (
            (await prisma.content
              .findUnique({
                where: {
                  id,
                },
              })
              .topics({
                select: {
                  id: true,
                },
              })) || []
          );
        },
      },
      Topic: {
        async content({ id }, _args, { prisma }) {
          return (
            (await prisma.topic
              .findUnique({
                where: {
                  id,
                },
              })
              .content()) || []
          );
        },
      },
      Query: {
        async topics(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.topic.findMany({
              where: {
                id: {
                  in: ids,
                },
                projectId: await authorization.expectProjectsInPrismaFilter,
              },
              select: {
                id: true,
              },
            }),
            ids
          );
        },
      },
    },
  }
);
