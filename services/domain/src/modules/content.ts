import assert from "assert";

import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Content {
      id: IntID!

      domain: Domain!
    }

    extend type Query {
      content(ids: [IntID!]!): [Content!]!
    }
  `,
  {
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
      },
      Query: {
        async content(_root, { ids }, { prisma, authorization }) {
          return prisma.content.findMany({
            where: {
              AND: [
                {
                  id: {
                    in: ids,
                  },
                },
                {
                  id: {
                    in: await authorization.expectUserProjects,
                  },
                },
              ],
            },
          });
        },
      },
    },
  }
);
