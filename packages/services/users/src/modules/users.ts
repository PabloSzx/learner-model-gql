import { gql, registerModule, ResolveCursorConnection } from "../ez";

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

    input UpdateUserInput {
      id: IntID!
      role: UserRole!
      locked: Boolean!
    }

    type AdminUserMutations {
      "Upsert specified users, if user with specified email already exists, updates it with the specified name"
      upsertUsers(data: [UpsertUserInput!]!): [User!]!

      updateUser(data: UpdateUserInput!): User!
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
        updateUser(_root, { data: { id, ...data } }, { prisma }) {
          return prisma.user.update({
            where: {
              id,
            },
            data,
          });
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
