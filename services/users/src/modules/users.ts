import { ResolveCursorConnection } from "api-base";

import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type User {
      id: IntID!
    }
    type UsersConnection {
      nodes: [User!]!
      pageInfo: PageInfo!
    }
    type AdminQueries {
      allUsers(pagination: CursorConnectionArgs!): UsersConnection!
    }
    type AdminMutations {
      assignProjectsToUsers(projectIds: [IntID!]!, userIds: [IntID!]!): [User!]!
      unassignProjectsToUsers(projectIds: [IntID!]!, userIds: [IntID!]!): [User!]!
    }
    type Query {
      hello: String!
      admin: AdminQueries!
    }
    type Mutation {
      admin: AdminMutations!
    }
  `,
  {
    resolvers: {
      Mutation: {
        async admin(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
      },
      Query: {
        async admin(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
        hello() {
          return "Hello World!";
        },
      },
      AdminMutations: {
        async assignProjectsToUsers(_root, { projectIds, userIds }, { prisma }) {
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
        async unassignProjectsToUsers(_root, { projectIds, userIds }, { prisma }) {
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
      },
      AdminQueries: {
        allUsers(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.user.findMany({
              ...args,
            });
          });
        },
      },
    },
  }
);
