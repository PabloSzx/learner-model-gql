import {
  logger,
  PromiseAllCallbacks,
  ResolveCursorConnection,
  serializeError,
  isInt,
  PrismaNS,
} from "api-base";
import assert from "assert";
import { gql, registerModule } from "../ez";

export const actionModule = registerModule(
  gql`
    type ActionVerb {
      id: IntID!

      # TRY_STEP REQUEST_HINT CLICK_STEP_TAB
      # FINISH_CONTENT DRAG_RESPONSE SELECT_TEXT
      # LOAD_CONTENT
      name: String!
    }

    type Content {
      id: IntID!
    }

    type KC {
      id: IntID!
    }

    type Domain {
      id: IntID!
    }

    type Topic {
      id: IntID!
    }

    type User {
      id: IntID!
    }

    input ActionInput {
      contentID: ID

      topicID: ID

      kcsIDs: [ID!]

      stepID: ID

      hintID: ID

      amount: Float

      detail: String

      extra: JSONObject

      verbName: String!

      timestamp: Timestamp!

      projectId: IntID!

      result: Float
    }

    type Action {
      id: IntID!

      verb: ActionVerb!

      timestamp: Timestamp!

      result: Float

      user: User

      content: Content

      topic: Topic

      kcs: [KC!]!

      stepID: ID

      hintID: ID

      amount: Float

      detail: String

      extra: JSONObject
    }

    type ActionsConnection {
      nodes: [Action!]!
      pageInfo: PageInfo!
    }

    type ActionsVerbsConnection {
      nodes: [ActionVerb!]!
      pageInfo: PageInfo!
    }

    input AdminActionsFilter {
      verbNames: [String!]
      users: [IntID!]
      kcs: [IntID!]
      content: [IntID!]
      topics: [IntID!]
      startDate: DateTime
      endDate: DateTime
    }

    type AdminActionQueries {
      allActions(
        pagination: CursorConnectionArgs!
        filters: AdminActionsFilter
      ): ActionsConnection!
      allActionsVerbs(
        pagination: CursorConnectionArgs!
      ): ActionsVerbsConnection!
    }

    extend type Query {
      adminActions: AdminActionQueries!
    }

    extend type Mutation {
      action(data: ActionInput!): Void
    }
  `,
  {
    resolvers: {
      AdminActionQueries: {
        allActions(_root, { pagination, filters }, { prisma }) {
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
            return prisma.action.findMany({
              ...args,
              where,
            });
          });
        },
        allActionsVerbs(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.actionVerb.findMany({
              ...args,
            });
          });
        },
      },

      Action: {
        async kcs({ id }, _args, { prisma }) {
          return (
            (await prisma.action
              .findUnique({
                where: {
                  id,
                },
              })
              .kcs({
                select: {
                  id: true,
                },
              })) || []
          );
        },
        content({ id }, _args, { prisma }) {
          return prisma.action
            .findUnique({
              where: {
                id,
              },
            })
            .content({
              select: {
                id: true,
              },
            });
        },
        topic({ id }, _args, { prisma }) {
          return prisma.action
            .findUnique({
              where: {
                id,
              },
            })
            .topic({
              select: {
                id: true,
              },
            });
        },
        async verb({ id }, _args, { prisma }) {
          const verb = await prisma.action
            .findUnique({
              where: {
                id,
              },
            })
            .verb();

          assert(verb, "Verb could not be found for action " + id);

          return verb;
        },
        user({ id }, _args, { prisma }) {
          return prisma.action
            .findUnique({
              where: {
                id,
              },
            })
            .user({
              select: {
                id: true,
              },
            });
        },
      },
      Query: {
        async adminActions(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
      },
      Mutation: {
        async action(
          _root,
          {
            data: {
              amount,
              contentID,
              detail,
              extra,
              hintID,
              stepID,
              topicID,
              timestamp,
              verbName,
              projectId,
              kcsIDs,
              result,
            },
          },
          { authorization, prisma }
        ) {
          const {
            projectId: userProjectId,
            user: { id: userId },
          } = await authorization.expectAllowedUserProject(projectId);

          const currentYear = new Date().getFullYear();
          const timestampYear = timestamp.getFullYear();
          assert(
            timestampYear >= currentYear - 1 &&
              timestampYear <= currentYear + 1,
            `Invalid timestamp`
          );

          const [{ content }, { topic }, { kcs }] = await PromiseAllCallbacks(
            async () => {
              return {
                content:
                  contentID != null && (contentID = contentID.toString())
                    ? {
                        connect: {
                          id: (
                            await prisma.content.findFirst({
                              where: isInt(contentID)
                                ? {
                                    projectId: userProjectId,
                                    id: parseInt(contentID.toString()),
                                  }
                                : {
                                    projectId: userProjectId,
                                    code: contentID.toString(),
                                  },
                              rejectOnNotFound: true,
                              select: {
                                id: true,
                              },
                            })
                          ).id,
                        },
                      }
                    : undefined,
              };
            },
            async () => {
              return {
                topic:
                  topicID != null && (topicID = topicID.toString())
                    ? {
                        connect: {
                          id: (
                            await prisma.topic.findFirst({
                              where: isInt(topicID)
                                ? {
                                    projectId: userProjectId,
                                    id: parseInt(topicID),
                                  }
                                : {
                                    projectId: userProjectId,
                                    code: topicID,
                                  },
                              rejectOnNotFound: true,
                              select: {
                                id: true,
                              },
                            })
                          ).id,
                        },
                      }
                    : undefined,
              };
            },
            async () => {
              if (!kcsIDs?.length) return {};

              const parsedKcsIds = kcsIDs?.reduce<{
                ids: Set<number>;
                codes: Set<string>;
              }>(
                (acum, value) => {
                  if (isInt((value = value.toString()))) {
                    acum.ids.add(parseInt(value));
                  } else {
                    acum.codes.add(value);
                  }
                  return acum;
                },
                {
                  ids: new Set(),
                  codes: new Set(),
                }
              );

              const kcs = await prisma.kC.findMany({
                where: {
                  OR: [
                    {
                      id: {
                        in: Array.from(parsedKcsIds.ids),
                      },
                      domain: {
                        projects: {
                          some: {
                            id: userProjectId,
                          },
                        },
                      },
                    },
                    {
                      code: {
                        in: Array.from(parsedKcsIds.codes),
                      },
                      domain: {
                        projects: {
                          some: {
                            id: userProjectId,
                          },
                        },
                      },
                    },
                  ],
                },
                select: {
                  id: true,
                },
              });

              if (
                kcs.length !==
                parsedKcsIds.ids.size + parsedKcsIds.codes.size
              )
                throw Error("Forbidden!");

              return {
                kcs: {
                  connect: kcs,
                },
              };
            }
          ).catch((err) => {
            logger.error(serializeError(err));

            throw Error("Forbidden!");
          });

          await prisma.action.create({
            data: {
              timestamp,
              verb: {
                connectOrCreate: {
                  create: {
                    name: verbName,
                  },
                  where: {
                    name: verbName,
                  },
                },
              },
              project: {
                connect: {
                  id: userProjectId,
                },
              },
              amount,
              content,
              topic,
              detail,
              extra,
              hintID: hintID?.toString(),
              stepID: stepID?.toString(),
              user: {
                connect: {
                  id: userId,
                },
              },
              result,
              kcs,
            },
            select: null,
          });
        },
      },
    },
  }
);
