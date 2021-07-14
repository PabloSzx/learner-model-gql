import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Project {
      id: IntID!

      domains: [Domain!]!
    }

    extend type Query {
      projects(ids: [IntID!]!): [Project!]!
    }
  `,
  {
    resolvers: {
      Query: {
        async projects(_root, { ids }, { authorization, prisma }) {
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
      Project: {
        async domains({ id }, _args, { prisma }) {
          return (
            (await prisma.project
              .findUnique({
                where: {
                  id,
                },
              })
              .domains()) || []
          );
        },
      },
    },
  }
);
