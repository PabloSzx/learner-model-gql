import { gql, Prisma, registerModule } from "../ez";

export const projectsModule = registerModule(
  gql`
    extend type User {
      projectsIds: [IntID!]!
    }

    extend type Group {
      projectsIds: [IntID!]!
    }

    extend type AdminUserMutations {
      setProjectsToUsers(projectIds: [IntID!]!, userIds: [IntID!]!): [User!]!
    }
  `,
  {
    id: "User Projects",
    dirname: import.meta.url,
    resolvers: {
      AdminUserMutations: {
        setProjectsToUsers(_root, { projectIds, userIds }, { prisma }) {
          const projectsIdsDataSet: Prisma.UserUpdateInput = {
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
