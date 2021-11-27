import { getNodeIdList } from "api-base";
import { gql, registerModule } from "../ez";

export const usersModule = registerModule(
  gql`
    type User {
      "Unique numeric identifier"
      id: IntID!

      "Projects associated with the user"
      projects: [Project!]!
    }

    type Group {
      "Unique numeric identifier"
      id: IntID!

      "Projects associated with the group"
      projects: [Project!]!
    }

    extend type Query {
      """
      Get all the users associated with the specified identifiers

      The users data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      users(ids: [IntID!]!): [User!]!

      """
      Get all the groups associated with the specified identifiers

      The groups data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
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
