import { ResolveCursorConnection } from "api-base";
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
      contentID: IntID

      topicID: IntID

      stepID: ID

      hintID: ID

      amount: Float

      detail: String

      extra: JSONObject

      verbName: String!

      timestamp: Timestamp!

      projectId: IntID!
    }

    type Action {
      id: IntID!

      verb: ActionVerb!

      timestamp: Timestamp!

      result: Float

      user: User

      content: Content

      topic: Topic

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

    type AdminActionQueries {
      allActions(pagination: CursorConnectionArgs!): ActionsConnection!
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
        allActions(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.action.findMany({
              ...args,
            });
          });
        },
      },

      Action: {
        content({ id }, _args, { prisma }) {
          return prisma.action
            .findUnique({
              where: {
                id,
              },
            })
            .content();
        },
        topic({ id }, _args, { prisma }) {
          return prisma.action
            .findUnique({
              where: {
                id,
              },
            })
            .topic();
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
            .user();
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
            },
          },
          { authorization, prisma }
        ) {
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
                  id: (
                    await authorization.expectAllowedUserProject(projectId)
                  ).projectId,
                },
              },
              amount,
              content:
                contentID != null
                  ? {
                      connect: {
                        id: contentID,
                      },
                    }
                  : undefined,
              topic:
                topicID != null
                  ? {
                      connect: {
                        id: topicID,
                      },
                    }
                  : undefined,
              detail,
              extra,
              hintID: hintID?.toString(),
              stepID: stepID?.toString(),
              user: {
                connect: {
                  id: (await authorization.expectUser).id,
                },
              },
            },
            select: null,
          });
        },
      },
    },
  }
);
