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
      id: IntID!

      actions(
        pagination: CursorConnectionArgs!
        filters: ProjectActionsFilter
      ): ActionsConnection!
    }

    input ProjectActionsFilter {
      verbNames: [String!]
      users: [IntID!]
      kcs: [IntID!]
      content: [IntID!]
      topics: [IntID!]
      startDate: DateTime
      endDate: DateTime
    }

    extend type Query {
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
