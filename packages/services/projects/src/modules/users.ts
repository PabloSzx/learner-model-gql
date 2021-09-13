import { gql, registerModule } from "../ez";

export const usersModule = registerModule(
  gql`
    type User {
      id: IntID!

      projects: [Project!]!
    }

    type Group {
      id: IntID!

      projects: [Project!]!
    }

    extend type Query {
      users(ids: [IntID!]!): [User!]!
      groups(ids: [IntID!]!): [Group!]!
    }
  `,
  {
    id: "Users",
    dirname: import.meta.url,
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
      Query: {
        async users(_root, { ids }, { prisma, authorization }) {
          return prisma.user.findMany({
            where: {
              id: {
                in: ids,
              },
              projects: {
                some: {
                  id: {
                    in: await authorization.expectUserProjects,
                  },
                },
              },
            },
            select: {
              id: true,
            },
          });
        },

        async groups(_root, { ids }, { prisma, authorization }) {
          return prisma.group.findMany({
            where: {
              id: {
                in: ids,
              },
              projects: {
                some: {
                  id: {
                    in: await authorization.expectUserProjects,
                  },
                },
              },
            },
            select: {
              id: true,
            },
          });
        },
      },
    },
  }
);
