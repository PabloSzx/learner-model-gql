import { getNodeIdList, ResolveCursorConnection } from "api-base";
import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    type Domain {
      id: IntID!

      content(pagination: CursorConnectionArgs!): ContentConnection!
    }

    type Topic {
      id: IntID!

      content: [Content!]!
    }

    extend type Content {
      topics: [Topic!]!
    }

    extend type Query {
      domains(ids: [IntID!]!): [Domain!]!
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
      Domain: {
        async content({ id }, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.domain
              .findUnique({
                where: {
                  id,
                },
              })
              .content({
                ...connection,
              });
          });
        },
      },
      Query: {
        async domains(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.domain.findMany({
              where: {
                id: {
                  in: ids,
                },
                projects: await authorization.expectSomeProjectsInPrismaFilter,
              },
              select: {
                id: true,
              },
            }),
            ids
          );
        },
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
