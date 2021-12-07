import Prisma from "@prisma/client";
import { getNodeIdList, ResolveCursorConnection } from "api-base";
import assert from "assert";
import type { Content as DBContent } from "db";
import mime from "mime";
import { gql, registerModule } from "../ez";
import type { Content } from "../ez.generated";

export const contentModule = registerModule(
  gql`
    "Content entity"
    type Content {
      "Unique numeric identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Arbitrary content description"
      description: String!

      """
      Binary content encoded in base64

      If present, it's guaranteed to be present alongisde binaryFilename
      """
      binaryBase64: String
      """
      Binary content filename

      If present, it's guaranteed to be present alongisde binaryBase64

      It's required and guaranteed to contain an extension where the mimetype can be inferred
      """
      binaryFilename: String

      "Arbitrary JSON object data"
      json: JSONObject

      "External URL"
      url: String

      "Parameter that can be used to sort a list of content"
      sortIndex: Int

      """
      Tags associated with the content

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      "Date of creation"
      createdAt: DateTime!

      "Date of last update"
      updatedAt: DateTime!
    }

    "Content creation input data"
    input CreateContent {
      "Arbitrary content description"
      description: String!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Project associated with new content"
      projectId: IntID!

      """
      Binary content encoded in base64

      If present, binaryFilename has to be specified
      """
      binaryBase64: String
      """
      Binary content filename

      If present, it's required to contain an extension where the mimetype can be inferred
      """
      binaryFilename: String

      "Arbitrary JSON object data"
      json: JSONObject

      "External URL"
      url: URL

      "Topics associated with the content"
      topics: [IntID!]!

      "KCs associated with the content"
      kcs: [IntID!]!

      """
      Tags associated with the content

      Tags can be used to categorize or filter
      """
      tags: [String!]!
    }

    "Content update input data"
    input UpdateContent {
      "Current content identifier"
      id: IntID!

      "Arbitrary content description"
      description: String!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Project associated with content"
      projectId: IntID!

      """
      Binary content encoded in base64

      If present, binaryFilename has to be specified
      """
      binaryBase64: String
      """
      Binary content filename

      If present, it's required to contain an extension where the mimetype can be inferred
      """
      binaryFilename: String

      "Arbitrary JSON object data"
      json: JSONObject

      "External URL"
      url: URL

      "Topics associated with the content"
      topics: [IntID!]!

      "KCs associated with the content"
      kcs: [IntID!]!

      """
      Tags associated with the content

      Tags can be used to categorize or filter
      """
      tags: [String!]!
    }

    "Paginated Content"
    type ContentConnection implements Connection {
      "Nodes of the current page"
      nodes: [Content!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    """
    [ADMIN] Admin related content mutations, only authenticated users with the role "ADMIN" can access
    """
    type AdminContentMutations {
      "[ADMIN] Create a new content entity"
      createContent(data: CreateContent!): Content!

      "[ADMIN] Update an existent content entity"
      updateContent(data: UpdateContent!): Content!
    }

    "Filter all content of admin query"
    input AdminContentFilter {
      """
      Filter by the specified tags

      If any of the content's tags matches any of the specified tags, the content is included
      """
      tags: [String!]

      """
      Filter by the specified projects

      If the content's project matches any of the specified projects, the content is included
      """
      projects: [IntID!]
    }

    "Admin Content-Related Queries"
    type AdminContentQueries {
      """
      [ADMIN] Get all the content currently in the system

      Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
      """
      allContent(
        pagination: CursorConnectionArgs!
        filters: AdminContentFilter
      ): ContentConnection!
    }

    extend type Query {
      """
      [ADMIN] Admin related content queries, only authenticated users with the role "ADMIN" can access
      """
      adminContent: AdminContentQueries!
      """
      Get all the content associated with the specified identifiers

      The content data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      content(ids: [IntID!]!): [Content!]!
      """
      Get specified content by "code".

      - If user is not authenticated it throws.
      - If authenticated user has no permissions on the corresponding project it returns NULL.
      """
      contentByCode(code: String!): Content
    }
    extend type Mutation {
      """
      [ADMIN] Admin related content mutations, only authenticated users with the role "ADMIN" can access
      """
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
          { prisma, assertNotNumericCode }
        ) {
          if (binaryFilename) {
            assert(mime.getType(binaryFilename) != null, "Invalid File");
          }

          assertNotNumericCode(code);

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
          { prisma, assertNotNumericCode }
        ) {
          if (binaryFilename) {
            assert(mime.getType(binaryFilename) != null, "Invalid File");
          }

          assertNotNumericCode(code);

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
        async contentByCode(_root, { code }, { prisma, authorization }) {
          return prisma.content.findFirst({
            where: {
              code,
              project: await authorization.expectProjectsIdInPrismaFilter,
            },
          });
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
