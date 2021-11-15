import { getNodeIdList } from "api-base";
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
        async projects({ id }, _args, { prisma, authorization }) {
          return (
            (await prisma.user
              .findUnique({
                where: {
                  id,
                },
              })
              .projects({
                where: await authorization.expectProjectsIdInPrismaFilter,
              })) || []
          );
        },
      },
      Group: {
        async projects({ id }, _args, { prisma, authorization }) {
          return (
            (await prisma.group
              .findUnique({
                where: {
                  id,
                },
              })
              .projects({
                where: await authorization.expectProjectsIdInPrismaFilter,
              })) || []
          );
        },
      },
      Query: {
        async users(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.user.findMany({
              where: {
                id: {
                  in: ids,
                },
                projects: await authorization.expectSomeProjectsInPrismaFilter,
              },
              select: {
                id: true,
              },
            }),
            ids
          );
        },
        async groups(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.group.findMany({
              where: {
                id: {
                  in: ids,
                },
                projects: await authorization.expectSomeProjectsInPrismaFilter,
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
