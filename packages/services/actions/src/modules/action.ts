import {
  isInt,
  logger,
  PrismaNS,
  PromiseAllCallbacks,
  ResolveCursorConnection,
  serializeError,
} from "api-base";
import assert from "assert";
import { gql, registerModule } from "../ez";

export const actionModule = registerModule(
  gql`
    """
    Action Verb

    Main action categorization system
    """
    type ActionVerb {
      "Unique numeric identifier"
      id: IntID!

      "Name of the verb"
      name: String!
    }

    "Content entity"
    type Content {
      "Unique numeric identifier"
      id: IntID!
    }

    type KC {
      "Unique numeric identifier"
      id: IntID!
    }

    "Topic entity"
    type Topic {
      "Unique numeric identifier"
      id: IntID!
    }

    "User entity"
    type User {
      "Unique numeric identifier"
      id: IntID!
    }

    "Input of action report"
    input ActionInput {
      """
      Content identifier

      If it's numeric, it points to the "id" property of the content, otherwise, it points to the "code" property.

      Validation of content presence/authorization is made before confirming action
      """
      contentID: ID

      """
      Topic identifier

      If it's numeric, it points to the "id" property of the content, otherwise, it points to the "code" property.

      Validation of topic presence/authorization is made before confirming action
      """
      topicID: ID

      """
      KCs identifiers

      If it's numeric, it points to the "id" property of the content, otherwise, it points to the "code" property.

      Validation of kc presence/authorization is made before confirming action
      """
      kcsIDs: [ID!]

      "Arbitrary step identifier"
      stepID: ID

      """
      Arbitrary hint identifier
      """
      hintID: ID

      "Arbitrary numeric amount"
      amount: Float

      "Arbitrary string content detail"
      detail: String

      "Arbitrary JSON object data"
      extra: JSONObject

      """
      Type of action, if specified verb doesn't exist, it's automatically created
      """
      verbName: String!

      """
      Timestamp of the action.

      Format in number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
      """
      timestamp: Timestamp!

      """
      Identifier of project related to action.

      It's verified based on authenticated user, and attached validated ids are validated against the specified project
      """
      projectId: IntID!

      "Arbitrary numeric result"
      result: Float
    }

    """
    User-emitted actions related to system, data mainly used for logging and modeling purposes
    """
    type Action {
      "Unique numeric identifier"
      id: IntID!

      "Type of action"
      verb: ActionVerb!

      "Timestamp of the action, set by the action emitter"
      timestamp: Timestamp!

      "Arbitrary numeric result"
      result: Float

      "User that emitted the action"
      user: User

      "Related content"
      content: Content

      "Related topic"
      topic: Topic

      "Related KCs"
      kcs: [KC!]!

      "Arbitrary step identifier"
      stepID: ID

      "Arbitrary hint identifier"
      hintID: ID

      "Arbitrary numeric amount"
      amount: Float

      "Arbitrary string content detail"
      detail: String

      "Arbitrary JSON object data"
      extra: JSONObject

      "Timestamp of the action, set by the database on row creation"
      createdAt: DateTime!
    }

    "Paginated Actions"
    type ActionsConnection implements Connection {
      "Nodes of the current page"
      nodes: [Action!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Paginated Actions Verbs"
    type ActionsVerbsConnection implements Connection {
      "Nodes of the current page"
      nodes: [ActionVerb!]!
      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Filter all actions of admin query"
    input AdminActionsFilter {
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
      Filter by the specified projects

      If action's project matches any of the specified projects, the action is included
      """
      projects: [IntID!]
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

    "Order Admin Actions"
    input AdminActionsOrderBy {
      """
      Order the actions ascendingly or descendingly

      Following the cursor pagination's nature, ordering by "id" tends to follow the action creation date

      By default the actions are ordered descendingly, showing the newer actions first
      """
      id: ORDER_BY = DESC
    }

    "Admin Action-Related Queries"
    type AdminActionQueries {
      """
      Get all the actions currently in the system

      Pagination parameters are mandatory, but filters and orderBy are optional, and therefore the search can be customized.
      """
      allActions(
        pagination: CursorConnectionArgs!
        filters: AdminActionsFilter
        orderBy: AdminActionsOrderBy
      ): ActionsConnection!

      """
      Get all the action's verbs currently in the system
      """
      allActionsVerbs(
        pagination: CursorConnectionArgs!
      ): ActionsVerbsConnection!
    }

    extend type Query {
      """
      Admin related actions queries, only authenticated users with the role "ADMIN" can access
      """
      adminActions: AdminActionQueries!
    }

    extend type Mutation {
      """
      Report an action to the modeling service

      - User authentication is required
      - Authenticated user has to be associated with specified project
      """
      action(data: ActionInput!): Void
    }
  `,
  {
    resolvers: {
      AdminActionQueries: {
        allActions(_root, { pagination, filters, orderBy }, { prisma }) {
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
              projects,
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

            if (projects) {
              where.project = {
                id: {
                  in: projects,
                },
              };
            }
          }

          return ResolveCursorConnection(pagination, (args) => {
            return prisma.action.findMany({
              ...args,
              where,
              orderBy: {
                id: orderBy?.id === "ASC" ? "asc" : "desc",
              },
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
                            await prisma.content.findFirstOrThrow({
                              where: isInt(contentID)
                                ? {
                                    projectId: userProjectId,
                                    id: parseInt(contentID.toString()),
                                  }
                                : {
                                    projectId: userProjectId,
                                    code: contentID.toString(),
                                  },
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
                            await prisma.topic.findFirstOrThrow({
                              where: isInt(topicID)
                                ? {
                                    projectId: userProjectId,
                                    id: parseInt(topicID),
                                  }
                                : {
                                    projectId: userProjectId,
                                    code: topicID,
                                  },
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

          await prisma.$executeRaw`INSERT INTO "ActionVerb" ("name") VALUES (${verbName}) ON CONFLICT DO NOTHING;`;

          await prisma.action.create({
            data: {
              timestamp,
              verb: {
                connect: {
                  name: verbName,
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
