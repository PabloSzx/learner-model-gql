import { gql, registerModule } from "../ez";

export const usersModule = registerModule(
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
    id: "Users",
    dirname: import.meta.url,
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
