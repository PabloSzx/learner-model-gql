import { getNodeIdList } from "api-base";
import { gql, registerModule } from "../ez";

export const contentModule = registerModule(
  gql`
    "Content entity"
    type Content {
      "Unique numeric identifier"
      id: IntID!

      "KCs associated with the content"
      kcs: [KC!]!

      "Topics associated with the content"
      topics: [Topic!]!
    }

    extend type Query {
      """
      Get all the content associated with the specified identifiers

      The content data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      content(ids: [IntID!]!): [Content!]!
    }
  `,
  {
    id: "Domain Content",
    resolvers: {
      Content: {
        async kcs({ id }, _args, { prisma }) {
          const kcs = await prisma.content
            .findUnique({
              where: {
                id,
              },
            })
            .kcs();

          return kcs || [];
        },
        async topics({ id }, _args, { prisma }) {
          return (
            (await prisma.content
              .findUnique({
                where: {
                  id,
                },
              })
              .topics()) || []
          );
        },
      },
      Query: {
        async content(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.content.findMany({
              where: {
                id: {
                  in: ids,
                },
                projectId: await authorization.expectProjectsInPrismaFilter,
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
