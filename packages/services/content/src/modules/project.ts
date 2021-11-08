import {
  getIdsIntersection,
  getNodeIdList,
  ResolveCursorConnection,
} from "api-base";
import { gql, registerModule } from "../ez";

export const projectModule = registerModule(
  gql`
    input ProjectContentFilter {
      tags: [String!]
      topicsIds: [IntID!]
      kcsIds: [IntID!]

      createdStartDate: DateTime
      createdEndDate: DateTime

      updatedStartDate: DateTime
      updatedEndDate: DateTime
    }

    type Project {
      id: IntID!

      content(
        pagination: CursorConnectionArgs!
        filters: ProjectContentFilter
      ): ContentConnection!
    }

    type ContentConnection implements Connection {
      nodes: [Content!]!
      pageInfo: PageInfo!
    }

    extend type Query {
      projects(ids: [IntID!]!): [Project!]!
    }
  `,
  {
    resolvers: {
      Query: {
        async projects(_root, { ids }, { authorization, prisma }) {
          return getNodeIdList(
            prisma.project.findMany({
              where: {
                id: {
                  in:
                    (await authorization.expectUser).role === "ADMIN"
                      ? ids
                      : await getIdsIntersection(
                          ids,
                          authorization.expectUserProjects
                        ),
                },
              },
              select: {
                id: true,
              },
            }),
            ids
          );
        },
      },
      Project: {
        content({ id }, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.content.findMany({
              ...connection,
              where: {
                project: {
                  id,
                },
                tags: filters?.tags
                  ? {
                      hasSome: filters.tags,
                    }
                  : undefined,
                topics: filters?.topicsIds
                  ? {
                      some: {
                        id: {
                          in: filters.topicsIds,
                        },
                      },
                    }
                  : undefined,
                updatedAt:
                  filters?.updatedStartDate || filters?.updatedEndDate
                    ? {
                        gte: filters.updatedStartDate || undefined,
                        lte: filters.updatedEndDate || undefined,
                      }
                    : undefined,
                createdAt:
                  filters?.createdStartDate || filters?.createdEndDate
                    ? {
                        gte: filters.createdStartDate || undefined,
                        lte: filters.createdEndDate || undefined,
                      }
                    : undefined,
                kcs: filters?.kcsIds
                  ? {
                      some: {
                        id: {
                          in: filters.kcsIds,
                        },
                      },
                    }
                  : undefined,
              },
            });
          });
        },
      },
    },
  }
);
