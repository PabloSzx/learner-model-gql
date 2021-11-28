import assert from "assert/strict";
import { gql, ModelStateConnection, registerModule } from "../ez";

export const userModule = registerModule(
  gql`
    "User entity"
    type User {
      "Unique numeric identifier"
      id: IntID!

      "Model States associated with user"
      modelStates(input: ModelStateConnectionInput!): ModelStateConnection!
    }

    extend type ModelState {
      "User associated with Model State"
      user: User!
    }

    extend type Query {
      """
      Get all the users associated with the specified identifiers

      The users data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      users(ids: [IntID!]!): [User!]!
    }
  `,
  {
    resolvers: {
      ModelState: {
        async user({ id }, _args, { prisma }) {
          const user = await prisma.modelState
            .findUnique({
              where: {
                id,
              },
            })
            .user();

          assert(user, "User could not be found for Model State " + id);

          return user;
        },
      },
      User: {
        async modelStates({ id }, { input }, { authorization }) {
          const allowedProjectsIds =
            await authorization.expectAllowedProjectsIdsModelStates;

          return ModelStateConnection(input, {
            where: {
              user: {
                id,
              },
              // If user is not admin, filter out not-authorized projects
              domain: allowedProjectsIds
                ? {
                    projects: {
                      some: {
                        id: {
                          in: allowedProjectsIds,
                        },
                      },
                    },
                  }
                : undefined,
            },
          });
        },
      },
      Query: {
        async users(_root, { ids }, { prisma, authorization, getNodeIdList }) {
          return getNodeIdList(
            prisma.user.findMany({
              where: {
                id: {
                  in: ids,
                },
                projects: await authorization.expectSomeProjectsInPrismaFilter,
              },
              select: {
                id: true,
              },
            }),
            ids
          );
        },
      },
    },
  }
);
