import { ResolveCursorConnection } from "api-base";
import type { Content as DBContent } from "db";
import { gql, registerModule } from "../ez";
import type { Content } from "../ez.generated";

export const contentModule = registerModule(
  gql`
    type Content {
      id: IntID!

      description: String!

      binaryBase64: String
      json: JSONObject
      url: String

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    input CreateContent {
      description: String!

      projectId: IntID!
      domainId: IntID!
      topicId: IntID

      binaryBase64: String
      json: JSONObject
      url: String
    }

    type ContentConnection implements Connection {
      nodes: [Content!]!
      pageInfo: PageInfo!
    }

    type AdminContentMutations {
      createContent(data: CreateContent!): Content!
    }

    type AdminContentQueries {
      allContent(pagination: CursorConnectionArgs!): ContentConnection!
    }
    type Query {
      hello: String!
      adminContent: AdminContentQueries!
    }
    type Mutation {
      adminContent: AdminContentMutations!
    }
  `,
  {
    resolvers: {
      AdminContentMutations: {
        createContent(
          _root,
          {
            data: {
              description,
              domainId,
              projectId,
              binaryBase64,
              json,
              topicId,
              url,
            },
          },
          { prisma }
        ) {
          return prisma.content.create({
            data: {
              description,
              json,
              url,
              binary: binaryBase64
                ? Buffer.from(binaryBase64, "base64")
                : undefined,
              domain: {
                connect: {
                  id: domainId,
                },
              },
              project: {
                connect: {
                  id: projectId,
                },
              },
              topic:
                topicId != null
                  ? {
                      connect: {
                        id: topicId,
                      },
                    }
                  : undefined,
            },
          });
        },
      },
      AdminContentQueries: {
        allContent(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.content.findMany({
              ...connection,
            });
          });
        },
      },
      Content: {
        binaryBase64({ binary }: Partial<Pick<DBContent, "binary">> & Content) {
          return binary?.toString("base64");
        },
      },
      Query: {
        hello() {
          return "Hello World!";
        },
        async adminContent(_root, _args, { authorization }) {
          await authorization.expectAdmin;
          return {};
        },
      },
      Mutation: {
        async adminContent(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
      },
    },
  }
);
