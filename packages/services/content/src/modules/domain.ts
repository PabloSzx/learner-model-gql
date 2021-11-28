import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    "Topic entity"
    type Topic {
      "Unique numeric identifier"
      id: IntID!

      "Content associated with topic"
      content: [Content!]!
    }

    extend type Content {
      "Topics associated with content"
      topics: [Topic!]!
    }

    extend type Query {
      """
      Get all the topics associated with the specified identifiers

      The topics data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
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
        async topics(_root, { ids }, { prisma, authorization, getNodeIdList }) {
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
