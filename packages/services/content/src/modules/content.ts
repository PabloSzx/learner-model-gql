import { getNodeIdList, ResolveCursorConnection } from "api-base";
import type { Content as DBContent } from "db";
import { gql, registerModule } from "../ez";
import type { Content } from "../ez.generated";

export const contentModule = registerModule(
  gql`
    type Content {
      id: IntID!

      code: String!
      label: String!

      description: String!

      binaryBase64: String
      json: JSONObject
      url: String

      sortIndex: Int

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    input CreateContent {
      description: String!

      code: String!
      label: String!

      projectId: IntID!
      domainId: IntID!

      binaryBase64: String
      json: JSONObject
      url: String

      topics: [IntID!]!
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
    extend type Query {
      adminContent: AdminContentQueries!
      content(ids: [IntID!]!): [Content!]!
    }
    extend type Mutation {
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
              url,
              code,
              label,
              topics,
            },
          },
          { prisma }
        ) {
          return prisma.content.create({
            data: {
              code,
              label,
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
              topics: {
                connect: topics.map((id) => ({ id })),
              },
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
        async adminContent(_root, _args, { authorization }) {
          await authorization.expectAdmin;
          return {};
        },
        async content(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.content.findMany({
              where: {
                id: {
                  in: ids,
                },
                projectId: await authorization.expectProjectsInPrismaFilter,
              },
            }),
            ids
          );
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
