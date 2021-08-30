import assert from "assert";
import { ResolveCursorConnection } from "api-base";
import { gql, registerModule } from "../ez";

registerModule(
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

    type ActionActivity {
      id: IntID!

      content: Content

      topic: Topic

      stepID: ID

      hintID: ID

      amount: Float

      detail: String

      extra: JSONObject
    }

    input ActionActivityInput {
      contentID: IntID

      topicID: IntID

      stepID: ID

      hintID: ID

      amount: Float

      detail: String

      extra: JSONObject
    }

    input ActionInput {
      activity: ActionActivityInput!

      verbName: String!

      timestamp: Timestamp!

      projectId: IntID!
    }

    type Action {
      id: IntID!

      verb: ActionVerb!

      activity: ActionActivity!

      timestamp: Timestamp!

      result: Float

      user: User
    }

    type ActionsConnection {
      nodes: [Action!]!
      pageInfo: PageInfo!
    }

    type AdminQueries {
      allActions(pagination: CursorConnectionArgs!): ActionsConnection!
    }

    type Query {
      hello: String!
      admin: AdminQueries!
    }

    type Mutation {
      action(data: ActionInput!): Void!
    }
  `,
  {
    resolvers: {
      AdminQueries: {
        allActions(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.action.findMany({
              ...args,
            });
          });
        },
      },
      ActionActivity: {
        content({ id }, _args, { prisma }) {
          return prisma.actionActivity
            .findUnique({
              where: {
                id,
              },
            })
            .content();
        },
        topic({ id }, _args, { prisma }) {
          return prisma.actionActivity
            .findUnique({
              where: {
                id,
              },
            })
            .topic();
        },
      },
      Action: {
        async activity({ id }, _args, { prisma }) {
          const activity = await prisma.action
            .findUnique({
              where: {
                id,
              },
            })
            .activity();

          assert(activity, "Activity could not be found for action " + id);

          return activity;
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
        hello() {
          return "Hello World!";
        },
        async admin(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
      },
      Mutation: {
        async action(
          _root,
          {
            data: {
              activity: { amount, contentID, detail, extra, hintID, stepID, topicID },
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
                  id: (await authorization.expectAllowedUserProject(projectId)).projectId,
                },
              },
              activity: {
                create: {
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
