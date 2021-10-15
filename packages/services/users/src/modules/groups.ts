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

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    extend type User {
      groups: [Group!]!
    }

    input CreateGroupInput {
      code: String!
      label: String!

      tags: [String!]!

      projectIds: [IntID!]!
    }

    input UpdateGroupInput {
      id: IntID!

      code: String!
      label: String!

      tags: [String!]!

      projectIds: [IntID!]!
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
          { data: { code, label, projectIds, tags } },
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
            },
          });
        },
        async updateGroup(
          _root,
          { data: { id, code, label, projectIds, tags } },
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
