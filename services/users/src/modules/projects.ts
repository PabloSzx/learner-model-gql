import { registerModule, gql } from "../ez";

registerModule(
  gql`
    type Project {
      id: IntID!
    }
    extend type User {
      projects: [Project!]!
    }
    extend type Group {
      projects: [Project!]!
    }
  `,
  {
    resolvers: {
      User: {
        async projects({ id }, _args, { prisma }) {
          return (
            (await prisma.user
              .findUnique({
                where: {
                  id,
                },
              })
              .projects()) || []
          );
        },
      },
      Group: {
        async projects({ id }, _args, { prisma }) {
          return (
            (await prisma.group
              .findUnique({
                where: {
                  id,
                },
              })
              .projects()) || []
          );
        },
      },
    },
  }
);
