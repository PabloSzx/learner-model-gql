import { getNodeIdList } from "api-base";
import keyBy from "lodash/keyBy.js";
import pMap from "p-map";
import { gql, registerModule, ResolveCursorConnection } from "../ez";

export const groupsModule = registerModule(
  gql`
    type Group {
      id: IntID!

      code: String!
      label: String!

      users: [User!]!

      tags: [String!]!

      flags: GroupFlags!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type GroupFlags {
      id: IntID!

      readProjectActions: Boolean!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    extend type User {
      groups: [Group!]!
    }

    input GroupFlagsInput {
      readProjectActions: Boolean!
    }

    input CreateGroupInput {
      code: String!
      label: String!

      tags: [String!]!

      projectIds: [IntID!]!

      flags: GroupFlagsInput
    }

    input UpdateGroupInput {
      id: IntID!

      code: String!
      label: String!

      tags: [String!]!

      projectIds: [IntID!]!

      flags: GroupFlagsInput
    }

    extend type AdminUserMutations {
      setUserGroups(
        usersEmails: [EmailAddress!]!
        groupIds: [IntID!]!
      ): [Group!]!

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

    input AdminGroupsFilter {
      tags: [String!]
    }

    extend type AdminUserQueries {
      allGroups(
        pagination: CursorConnectionArgs!
        filters: AdminGroupsFilter
      ): GroupsConnection!
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
        async flags({ id }, _args, { prisma }) {
          const flags = await prisma.group
            .findUnique({
              where: {
                id,
              },
            })
            .flags();

          if (!flags) {
            return prisma.groupFlags.upsert({
              where: {
                groupId: id,
              },
              create: {
                group: {
                  connect: {
                    id,
                  },
                },
              },
              update: {},
            });
          }

          return flags;
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
        allGroups(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.group.findMany({
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
      AdminUserMutations: {
        async setUserGroups(_root, { usersEmails, groupIds }, { prisma }) {
          const usersEmailsSet = await prisma.user.findMany({
            where: {
              email: {
                in: usersEmails,
              },
            },
            select: {
              email: true,
            },
          });

          const foundsUsers = keyBy(usersEmailsSet, (v) => v.email);

          const notFoundEmails = usersEmails.filter((v) => {
            return !foundsUsers[v];
          });

          if (notFoundEmails.length) {
            throw Error("Users Not Found: " + notFoundEmails.join());
          }

          return pMap(
            groupIds,
            (id) => {
              return prisma.group.update({
                where: {
                  id,
                },
                data: {
                  users: {
                    set: usersEmailsSet,
                  },
                },
              });
            },
            {
              concurrency: 4,
            }
          );
        },
        async createGroup(
          _root,
          { data: { code, label, projectIds, tags, flags } },
          { prisma }
        ) {
          return prisma.group.create({
            data: {
              code,
              label,
              projects: {
                connect: projectIds.map((id) => ({ id })),
              },
              tags: {
                set: tags,
              },
              flags: {
                create: flags || {},
              },
            },
          });
        },
        async updateGroup(
          _root,
          { data: { id, code, label, projectIds, tags, flags } },
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
              tags: {
                set: tags,
              },
              flags: flags
                ? {
                    upsert: {
                      create: flags,
                      update: flags,
                    },
                  }
                : undefined,
            },
          });
        },
      },
      Query: {
        async groups(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.group.findMany({
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
      },
    },
  }
);
