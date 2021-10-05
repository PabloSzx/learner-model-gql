import pMap from "p-map";
import { gql, Prisma, registerModule, ResolveCursorConnection } from "../ez";

export const groupsModule = registerModule(
  gql`
    type Group {
      id: IntID!

      code: String!
      label: String!

      users: [User!]!
    }

    extend type User {
      groups: [Group!]!
    }

    input CreateGroupInput {
      code: String!
      label: String!

      projectIds: [IntID!]!
    }

    input UpdateGroupInput {
      id: IntID!

      code: String!
      label: String!

      projectIds: [IntID!]!
    }

    extend type AdminUserMutations {
      setUserGroups(
        usersEmails: [EmailAddress!]!
        groupIds: [IntID!]!
      ): [User!]!

      createGroup(data: CreateGroupInput!): Group!
      updateGroup(data: UpdateGroupInput!): Group!
    }

    extend type Query {
      groups(ids: [IntID!]!): [Group!]!
    }

    type GroupsConnection implements Connection {
      nodes: [Group!]!
      pageInfo: PageInfo!
    }

    extend type AdminUserQueries {
      allGroups(pagination: CursorConnectionArgs!): GroupsConnection!
    }
  `,
  {
    id: "Groups",
    dirname: import.meta.url,
    resolvers: {
      Group: {
        async users({ id }, _args, { prisma }) {
          return (
            (await prisma.group
              .findUnique({
                where: {
                  id,
                },
              })
              .users()) || []
          );
        },
      },
      User: {
        async groups({ id }, _args, { prisma }) {
          const groups = await prisma.user
            .findUnique({
              where: {
                id,
              },
            })
            .groups();

          return groups || [];
        },
      },
      AdminUserQueries: {
        allGroups(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.group.findMany({
              ...connection,
            });
          });
        },
      },
      AdminUserMutations: {
        async setUserGroups(_root, { usersEmails, groupIds }, { prisma }) {
          const userDataSet: Prisma.UserUpdateInput = {
            groups: {
              set: groupIds.map((id) => {
                return {
                  id,
                };
              }),
            },
          };

          return pMap(
            usersEmails,
            (email) => {
              return prisma.user.update({
                where: {
                  email,
                },
                data: userDataSet,
              });
            },
            {
              concurrency: 4,
            }
          );
        },
        async createGroup(
          _root,
          { data: { code, label, projectIds } },
          { prisma }
        ) {
          return prisma.group.create({
            data: {
              code,
              label,
              projects: {
                connect: projectIds.map((id) => ({ id })),
              },
            },
          });
        },
        async updateGroup(
          _root,
          { data: { id, code, label, projectIds } },
          { prisma }
        ) {
          return prisma.group.update({
            where: {
              id,
            },
            data: {
              code,
              label,
              projects: {
                set: projectIds.map((id) => ({ id })),
              },
            },
          });
        },
      },
      Query: {
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
          });
        },
      },
    },
  }
);
