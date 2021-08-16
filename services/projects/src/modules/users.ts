import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type User {
      id: IntID!

      projects: [Project!]!
    }

    extend type Query {
      projects(ids: [IntID!]!): [Project!]!
    }
  `,
  {
    resolvers: {
      Query: {
        async projects(_root, { ids }, { prisma, authorization }) {
          return prisma.project.findMany({
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
