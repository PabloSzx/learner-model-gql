import assert from "assert";
import { getNodeIdList } from "api-base";
import { gql, registerModule } from "../ez";

export const contentModule = registerModule(
  gql`
    type Content {
      id: IntID!

      domain: Domain!

      kcs: [KC!]!

      topics: [Topic!]!
    }

    extend type Query {
      content(ids: [IntID!]!): [Content!]!
    }
  `,
  {
    id: "Domain Content",
    resolvers: {
      Content: {
        async domain({ id }, _args, { prisma }) {
          const domain = await prisma.content
            .findUnique({
              where: {
                id,
              },
            })
            .domain();

          assert(domain, "Domain could not be found for Content " + id);

          return domain;
        },
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
