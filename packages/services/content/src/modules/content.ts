import Prisma from "@prisma/client";
import { getNodeIdList, ResolveCursorConnection } from "api-base";
import assert from "assert";
import type { Content as DBContent } from "db";
import mime from "mime";
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
      binaryFilename: String

      json: JSONObject
      url: String

      sortIndex: Int

      tags: [String!]!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    input CreateContent {
      description: String!

      code: String!
      label: String!

      projectId: IntID!

      binaryBase64: String
      binaryFilename: String

      json: JSONObject
      url: URL

      topics: [IntID!]!

      kcs: [IntID!]!

      tags: [String!]!
    }

    input UpdateContent {
      id: IntID!

      description: String!

      code: String!
      label: String!

      projectId: IntID!

      binaryBase64: String
      binaryFilename: String

      json: JSONObject
      url: URL

      topics: [IntID!]!

      kcs: [IntID!]!

      tags: [String!]!
    }

    type ContentConnection implements Connection {
      nodes: [Content!]!
      pageInfo: PageInfo!
    }

    type AdminContentMutations {
      createContent(data: CreateContent!): Content!
      updateContent(data: UpdateContent!): Content!
    }

    input AdminContentFilter {
      tags: [String!]
      projects: [IntID!]
    }

    type AdminContentQueries {
      allContent(
        pagination: CursorConnectionArgs!
        filters: AdminContentFilter
      ): ContentConnection!
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
              projectId,
              binaryFilename,
              binaryBase64,
              json,
              url,
              code,
              label,
              topics,
              tags,
              kcs,
            },
          },
          { prisma }
        ) {
          if (binaryFilename) {
            assert(mime.getType(binaryFilename) != null, "Invalid File");
          }

          return prisma.content.create({
            data: {
              code,
              label,
              description,
              json: json || undefined,
              url: url?.toString() || null,
              binary: binaryBase64 ? Buffer.from(binaryBase64, "base64") : null,
              binaryFilename: binaryBase64
                ? binaryFilename ||
                  (() => {
                    throw Error(
                      "binaryFilename not specified alongside binaryBase64"
                    );
                  })()
                : null,
              project: {
                connect: {
                  id: projectId,
                },
              },
              topics: {
                connect: topics.map((id) => ({ id })),
              },
              tags: {
                set: tags,
              },
              kcs: {
                connect: kcs.map((id) => ({ id })),
              },
            },
          });
        },
        updateContent(
          _root,
          {
            data: {
              id,
              description,
              projectId,
              binaryBase64,
              binaryFilename,
              json,
              url,
              code,
              label,
              topics,
              tags,
              kcs,
            },
          },
          { prisma }
        ) {
          if (binaryFilename) {
            assert(mime.getType(binaryFilename) != null, "Invalid File");
          }

          return prisma.content.update({
            where: {
              id,
            },
            data: {
              code,
              label,
              description,
              json: json ?? Prisma.Prisma.DbNull,
              url: url?.toString() || null,
              binary: binaryBase64 ? Buffer.from(binaryBase64, "base64") : null,
              binaryFilename: binaryBase64
                ? binaryFilename ||
                  (() => {
                    throw Error(
                      "binaryFilename not specified alongside binaryBase64"
                    );
                  })()
                : null,
              project: {
                connect: {
                  id: projectId,
                },
              },
              topics: {
                connect: topics.map((id) => ({ id })),
              },
              tags: {
                set: tags,
              },
              kcs: {
                set: kcs.map((id) => ({ id })),
              },
            },
          });
        },
      },
      AdminContentQueries: {
        allContent(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.content.findMany({
              ...connection,
              where: filters
                ? {
                    tags: filters.tags
                      ? {
                          hasSome: filters.tags,
                        }
                      : undefined,

                    projectId: filters.projects
                      ? {
                          in: filters.projects,
                        }
                      : undefined,
                  }
                : undefined,
            });
          });
        },
      },
      Content: {
        binaryBase64({
          binary,
          binaryFilename,
        }: Partial<Pick<DBContent, "binary">> & Content) {
          return binaryFilename ? binary?.toString("base64") : null;
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
