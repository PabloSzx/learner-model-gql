import { getNodeIdList } from "api-base";
import pMap from "p-map";
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

      tags: [String!]!

      role: UserRole!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type UsersConnection implements Connection {
      nodes: [User!]!
      pageInfo: PageInfo!
    }

    type AdminUserQueries {
      allUsers(pagination: CursorConnectionArgs!): UsersConnection!
    }

    input UpdateUserInput {
      id: IntID!
      name: String
      role: UserRole!
      locked: Boolean!
      projectIds: [IntID!]!
      tags: [String!]!
    }

    type AdminUserMutations {
      "Upsert specified users with specified project"
      upsertUsersWithProjects(
        emails: [EmailAddress!]!
        projectsIds: [IntID!]!
      ): [User!]!

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
          return getNodeIdList(
            prisma.user.findMany({
              where: {
                id: {
                  in: ids,
                },
                projects: await authorization.expectSomeProjectsInPrismaFilter,
              },
            }),
            ids
          );
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
        async upsertUsersWithProjects(
          _root,
          { emails, projectsIds },
          { prisma }
        ) {
          return pMap(
            emails,
            (email) => {
              return prisma.user.upsert({
                create: {
                  email,
                  projects: {
                    connect: projectsIds.map((id) => ({ id })),
                  },
                },
                where: {
                  email,
                },
                update: {
                  projects: {
                    connect: projectsIds.map((id) => ({ id })),
                  },
                },
              });
            },
            {
              concurrency: 4,
            }
          );
        },
        updateUser(
          _root,
          { data: { id, projectIds, tags, ...data } },
          { prisma }
        ) {
          return prisma.user.update({
            where: {
              id,
            },
            data: {
              ...data,
              projects: {
                set: projectIds.map((id) => ({ id })),
              },
              tags: {
                set: tags,
              },
            },
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
