import { gql, registerModule } from "../ez";

import type { Content as DBContent } from "db";
import type { Content } from "../ez.generated";

registerModule(
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

    type AdminMutations {
      createContent(data: CreateContent!): Content!
    }
    type Query {
      hello: String!
    }
    type Mutation {
      admin: AdminMutations!
    }
  `,
  {
    resolvers: {
      AdminMutations: {
        createContent(
          _root,
          { data: { description, domainId, projectId, binaryBase64, json, topicId, url } },
          { prisma }
        ) {
          return prisma.content.create({
            data: {
              description,
              json,
              url,
              binary: binaryBase64 ? Buffer.from(binaryBase64, "base64") : undefined,
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
      Content: {
        binaryBase64({ binary }: Partial<Pick<DBContent, "binary">> & Content) {
          return binary?.toString("base64");
        },
      },
      Query: {
        hello() {
          return "Hello World!";
        },
      },
    },
  }
);
