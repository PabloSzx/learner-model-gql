import assert from "assert";

import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Content {
      id: IntID!

      project: Project!
    }

    extend type Query {
      content(ids: [IntID!]!): [Content!]!
    }
  `,
  {
    resolvers: {
      Content: {
        async project({ id }, _args, { prisma }) {
          const project = await prisma.content
            .findUnique({
              where: {
                id,
              },
            })
            .project();

          assert(project, "Project could not be found for Content " + id);

          return project;
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
