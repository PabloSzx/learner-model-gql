import {
  getIdsIntersection,
  getNodeIdList,
  PrismaNS,
  ResolveCursorConnection,
} from "api-base";
import { gql, registerModule } from "../ez";

export const projectsModule = registerModule(
  gql`
    type Project {
      "Unique numeric identifier"
      id: IntID!

      """
      All actions of the project

      ADMIN User role or "readProjectActions" group permissions flag required
      """
      actions(
        pagination: CursorConnectionArgs!
        filters: ProjectActionsFilter
      ): ActionsConnection!
    }

    """
    Filter the actions of a project
    """
    input ProjectActionsFilter {
      """
      Filter by the specified verbs

      If action's verb matches any of the specified verbs, the action is included
      """
      verbNames: [String!]
      """
      Filter by the specified users

      If action's user matches any of the specified users, the action is included
      """
      users: [IntID!]

      """
      Filter by the specified KCs

      If any of the action's KCs matches any of the specified KCs, the action is included
      """
      kcs: [IntID!]

      """
      Filter by the specified content

      If action's content matches any of the specified content, the action is included
      """
      content: [IntID!]

      """
      Filter by the specified topics

      If action's topic matches any of the specified topics, the action is included
      """
      topics: [IntID!]

      """
      Filter by the specified starting date

      If action's timestamp is after the specified date, the action is included
      """
      startDate: DateTime

      """
      Filter by the specified end date

      If action's timestamp is before the specified date, the action is included
      """
      endDate: DateTime
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
      Project: {
        async actions(
          { id },
          { pagination, filters },
          { prisma, authorization }
        ) {
          await authorization.expectAllowedReadProjectActions(id);

          const where: PrismaNS.ActionWhereInput = {};

          if (filters) {
            const {
              verbNames,
              users,
              kcs,
              content,
              topics,
              startDate,
              endDate,
            } = filters;
            if (verbNames) {
              where.verb = {
                name: {
                  in: verbNames,
                },
              };
            }

            if (users) {
              where.user = {
                id: {
                  in: users,
                },
              };
            }

            if (kcs) {
              where.kcs = {
                some: {
                  id: {
                    in: kcs,
                  },
                },
              };
            }

            if (content) {
              where.content = {
                id: {
                  in: content,
                },
              };
            }

            if (topics) {
              where.topic = {
                id: {
                  in: topics,
                },
              };
            }

            if (startDate || endDate) {
              where.timestamp = {
                gte: startDate || undefined,
                lte: endDate || undefined,
              };
            }
          }

          return ResolveCursorConnection(pagination, (args) => {
            return prisma.project
              .findUnique({
                where: {
                  id,
                },
              })
              .actions({
                ...args,
                where,
              });
          });
        },
      },
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
    },
  }
);
