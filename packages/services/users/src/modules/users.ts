import { ResolveCursorConnection } from "api-base";

import { gql, registerModule } from "../ez";

export const usersModule = registerModule(
  gql`
    enum UserRole {
      ADMIN
      USER
    }
    type User {
      id: IntID!

      enabled: Boolean!

      email: String!
      name: String
      locked: Boolean!
      active: Boolean!
      lastOnline: DateTime

      role: UserRole!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type UsersConnection {
      nodes: [User!]!
      pageInfo: PageInfo!
    }

    type AdminUserQueries {
      allUsers(pagination: CursorConnectionArgs!): UsersConnection!
    }

    input UpsertUserInput {
      email: String!
      name: String
    }

    type AdminUserMutations {
      assignProjectsToUsers(projectIds: [IntID!]!, userIds: [IntID!]!): [User!]!
      unassignProjectsToUsers(
        projectIds: [IntID!]!
        userIds: [IntID!]!
      ): [User!]!
      "Upsert specified users, if user with specified email already exists, updates it with the specified name"
      upsertUsers(data: [UpsertUserInput!]!): [User!]!
    }

    extend type Query {
      adminUsers: AdminUserQueries!
      currentUser: User
      users(ids: [IntID!]!): [User!]!
    }

    extend type Mutation {
      adminUsers: AdminUserMutations!
    }
  `,
  {
    id: "Users",
    dirname: import.meta.url,
    resolvers: {
      Mutation: {
        async adminUsers(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
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
          });
        },
        async adminUsers(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
        async currentUser(_root, _args, { UserPromise }) {
          return await UserPromise;
        },
      },
      AdminUserMutations: {
        async assignProjectsToUsers(
          _root,
          { projectIds, userIds },
          { prisma }
        ) {
          return prisma.$transaction(
            userIds.map((id) => {
              return prisma.user.update({
                where: {
                  id_enabled: {
                    id,
                    enabled: true,
                  },
                },
                data: {
                  projects: {
                    connect: projectIds.map((id) => ({ id })),
                  },
                },
              });
            })
          );
        },
        async unassignProjectsToUsers(
          _root,
          { projectIds, userIds },
          { prisma }
        ) {
          return prisma.$transaction(
            userIds.map((id) => {
              return prisma.user.update({
                where: {
                  id_enabled: {
                    id,
                    enabled: true,
                  },
                },
                data: {
                  projects: {
                    disconnect: projectIds.map((id) => ({ id })),
                  },
                },
              });
            })
          );
        },
        async upsertUsers(_root, { data }, { prisma }) {
          return Promise.all(
            data.map(async ({ email, name }) => {
              return prisma.user.upsert({
                create: {
                  email,
                  name,
                },
                update: {
                  name,
                },
                where: {
                  email,
                },
              });
            })
          );
        },
      },
      AdminUserQueries: {
        allUsers(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.user.findMany({
              ...connection,
            });
          });
        },
      },
    },
  }
);
