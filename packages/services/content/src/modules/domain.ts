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

      content(pagination: CursorConnectionArgs!): ContentConnection!
    }

    extend type Query {
      domains(ids: [IntID!]!): [Domain!]!
      topics(ids: [IntID!]!): [Topic!]!
    }
  `,
  {
    resolvers: {
      Topic: {
        async content({ id }, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.topic
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
                projectId: await authorization.expectProjectsInPrismaFilter,
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
