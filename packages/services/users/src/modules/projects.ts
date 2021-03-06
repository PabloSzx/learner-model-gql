import type { PrismaNS } from "api-base";
import { gql, registerModule } from "../ez";

export const projectsModule = registerModule(
  gql`
    extend type User {
      "IDs of projects associated with the user"
      projectsIds: [IntID!]!
    }

    extend type Group {
      "IDs of projects associated with the group"
      projectsIds: [IntID!]!
    }

    extend type AdminUserMutations {
      "Set the projects of the specified users"
      setProjectsToUsers(projectIds: [IntID!]!, userIds: [IntID!]!): [User!]!
    }
  `,
  {
    id: "User Projects",
    dirname: import.meta.url,
    resolvers: {
      AdminUserMutations: {
        setProjectsToUsers(_root, { projectIds, userIds }, { prisma }) {
          const projectsIdsDataSet: PrismaNS.UserUpdateInput = {
            projects: {
              set: projectIds.map((projectId) => {
                return {
                  id: projectId,
                };
              }),
            },
          };
          return prisma.$transaction(
            userIds.map((id) => {
              return prisma.user.update({
                where: {
                  id,
                },
                data: projectsIdsDataSet,
              });
            })
          );
        },
      },
      User: {
        async projectsIds({ id }, _args, { prisma }) {
          return (
            (
              await prisma.user
                .findUnique({
                  where: {
                    id,
                  },
                })
                .projects({
                  select: {
                    id: true,
                  },
                })
            )?.map((v) => v.id) || []
          );
        },
      },
      Group: {
        async projectsIds({ id }, _args, { prisma }) {
          return (
            (
              await prisma.group
                .findUnique({
                  where: {
                    id,
                  },
                })
                .projects({
                  select: {
                    id: true,
                  },
                })
            )?.map((v) => v.id) || []
          );
        },
      },
    },
  }
);
