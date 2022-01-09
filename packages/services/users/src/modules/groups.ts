import { getNodeIdList } from "api-base";
import keyBy from "lodash/keyBy.js";
import pMap from "p-map";
import { gql, registerModule, ResolveCursorConnection } from "../ez";

export const groupsModule = registerModule(
  gql`
    """
    Group Entity

    - Used to group/cluster users
    - Set permissions flags to the users
    - Associate projects to users, allowing users to access the projects
    """
    type Group {
      "Unique numeric identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Users associated with the group"
      users: [User!]!

      """
      Tags associated with the group

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      "Permissions flags"
      flags: GroupFlags!

      "Date of creation"
      createdAt: DateTime!

      "Date of last update"
      updatedAt: DateTime!
    }

    "Permissions flags of group"
    type GroupFlags {
      "Unique numeric identifier"
      id: IntID!

      "Allows the users part of the group to read all the actions of the projects of the group"
      readProjectActions: Boolean!

      "Allows the users part of the group to read all the model states of the projects of the group"
      readProjectModelStates: Boolean!

      "Date of creation"
      createdAt: DateTime!

      "Date of last update"
      updatedAt: DateTime!
    }

    extend type User {
      "Groups associated with the user"
      groups: [Group!]!
    }

    "Group Flags input data"
    input GroupFlagsInput {
      "Allows the users part of the group to read all the actions of the projects of the group"
      readProjectActions: Boolean!

      "Allows the users part of the group to read all the model states of the projects of the group"
      readProjectModelStates: Boolean!
    }

    "Group creation input data"
    input CreateGroupInput {
      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      """
      Tags associated with the group

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      "Projects associated with the group"
      projectIds: [IntID!]!

      "Permissions flags"
      flags: GroupFlagsInput
    }

    "Group update input data"
    input UpdateGroupInput {
      "Current group identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      """
      Tags associated with the group

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      "Projects associated with the group"
      projectIds: [IntID!]!

      "Permissions flags of group"
      flags: GroupFlagsInput
    }

    extend type AdminUserMutations {
      "Set the users (by email) associated with the groups"
      setUserGroups(
        usersEmails: [EmailAddress!]!
        groupIds: [IntID!]!
      ): [Group!]!

      "Create a new group entity"
      createGroup(data: CreateGroupInput!): Group!

      "Update an existent group entity"
      updateGroup(data: UpdateGroupInput!): Group!
    }

    extend type Query {
      """
      Get all the groups associated with the specified identifiers

      The groups data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      groups(ids: [IntID!]!): [Group!]!
    }

    "Paginated Groups"
    type GroupsConnection implements Connection {
      "Nodes of the current page"
      nodes: [Group!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Filter all groups of admin query"
    input AdminGroupsFilter {
      """
      Tags associated with the group

      Tags can be used to categorize or filter
      """
      tags: [String!]
    }

    extend type AdminUserQueries {
      """
      Get all the groups currently in the system

      Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
      """
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
