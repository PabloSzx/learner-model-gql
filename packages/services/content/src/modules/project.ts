import {
  getIdsIntersection,
  getNodeIdList,
  ResolveCursorConnection,
} from "api-base";
import { gql, registerModule } from "../ez";

export const projectModule = registerModule(
  gql`
    "Filter project content"
    input ProjectContentFilter {
      """
      Filter by the specified tags

      If any of the content's tags matches any of the specified tags, the content is included
      """
      tags: [String!]

      """
      Filter by the specified topics

      If content's topic matches any of the specified topics, the content is included
      """
      topics: [IntID!]

      """
      Filter by the specified KCs

      If any of the content's KCs matches any of the specified KCs, the content is included
      """
      kcs: [IntID!]

      """
      Filter by the specified starting created date

      If content's creation date is after the specified date, the content is included
      """
      createdStartDate: DateTime
      """
      Filter by the specified ending created date

      If content's creation date is before the specified date, the content is included
      """
      createdEndDate: DateTime

      """
      Filter by the specified starting last updated date

      If content's last updated date is after the specified date, the content is included
      """
      updatedStartDate: DateTime
      """
      Filter by the specified ending last updated date

      If content's last updated date is before the specified date, the content is included
      """
      updatedEndDate: DateTime
    }

    type Project {
      id: IntID!

      "Content associated with project"
      content(
        pagination: CursorConnectionArgs!
        filters: ProjectContentFilter
      ): ContentConnection!
    }

    extend type Query {
      """
      Get all the projects associated with the specified identifiers

      The projects data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
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
                topics: filters?.topics
                  ? {
                      some: {
                        id: {
                          in: filters.topics,
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
                kcs: filters?.kcs
                  ? {
                      some: {
                        id: {
                          in: filters.kcs,
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
