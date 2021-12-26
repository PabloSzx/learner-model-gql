import { getNodeIdList } from "api-base";
import pMap from "p-map";
import { gql, registerModule, ResolveCursorConnection } from "../ez";

export const usersModule = registerModule(
  gql`
    "Possible roles of an authenticated user"
    enum UserRole {
      """
      Administrator of the system

      Most of the authorization logic is enabled
      """
      ADMIN

      "Default user role"
      USER
    }

    "User entity"
    type User {
      "Unique numeric identifier"
      id: IntID!

      "Email Address"
      email: String!

      "Name of person"
      name: String

      """
      Locked user authentication

      If set as "true", user won't be able to use the system
      """
      locked: Boolean!

      """
      Active flag

      By default it starts as "false", and the first time the user accesses the system, it's set as "true"
      """
      active: Boolean!

      "Date of latest user access"
      lastOnline: DateTime

      "Picture of user, set by external authentication service"
      picture: String

      """
      Tags associated with the user

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      "User role, by default is USER"
      role: UserRole!

      "Date of creation"
      createdAt: DateTime!

      "Date of last update"
      updatedAt: DateTime!
    }

    "Paginated Users"
    type UsersConnection implements Connection {
      "Nodes of the current page"
      nodes: [User!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Filter all users of admin query"
    input AdminUsersFilter {
      """
      Filter by the specified tags

      If any of the user's tags matches any of the specified tags, the user is included
      """
      tags: [String!]
    }

    "Admin User-Related Queries"
    type AdminUserQueries {
      """
      [ADMIN] Get all the users currently in the system

      Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
      """
      allUsers(
        pagination: CursorConnectionArgs!
        filters: AdminUsersFilter
      ): UsersConnection!
    }

    "User update input data"
    input UpdateUserInput {
      "Current user identifier"
      id: IntID!

      "Name of person"
      name: String

      "Role of user"
      role: UserRole!

      "Locked flag"
      locked: Boolean!

      "Projects associated with user"
      projectIds: [IntID!]!

      """
      Tags associated with the user

      Tags can be used to categorize or filter
      """
      tags: [String!]!
    }

    "Admin User-Related Queries"
    type AdminUserMutations {
      "Upsert specified users with specified projects"
      upsertUsersWithProjects(
        emails: [EmailAddress!]!
        projectsIds: [IntID!]!
      ): [User!]!

      "[ADMIN] Update an existent user entity"
      updateUser(data: UpdateUserInput!): User!
    }

    extend type Query {
      """
      [ADMIN] Admin related user queries, only authenticated users with the role "ADMIN" can access
      """
      adminUsers: AdminUserQueries!

      "Authenticated user information"
      currentUser: User

      """
      Get all the users associated with the specified identifiers

      The users data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      users(ids: [IntID!]!): [User!]!
    }

    extend type Mutation {
      """
      [ADMIN] Admin related user mutations, only authenticated users with the role "ADMIN" can access
      """
      adminUsers: AdminUserMutations!
    }
  `,
  {
    id: "Users",
    dirname: import.meta.url,
    resolvers: {
      User: {
        active({ lastOnline }) {
          return lastOnline != null;
        },
      },
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
          const user = await UserPromise;

          if (user == null) return null;

          return user as Omit<typeof user, "groups">;
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
        allUsers(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.user.findMany({
              ...connection,
              where: filters
                ? {
                    tags: filters.tags
                      ? {
                          hasSome: filters.tags,
                        }
                      : undefined,
                  }
                : undefined,
            });
          });
        },
      },
    },
  }
);
