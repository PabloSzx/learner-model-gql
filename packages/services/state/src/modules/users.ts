import assert from "assert/strict";
import { gql, ModelStateConnection, registerModule } from "../ez";

export const userModule = registerModule(
  gql`
    type User {
      id: IntID!

      modelStates(input: ModelStateConnectionInput!): ModelStateConnection!
    }

    extend type ModelState {
      user: User!
    }

    extend type Query {
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
        modelStates({ id }, { input }) {
          return ModelStateConnection(input, {
            where: {
              user: {
                id,
              },
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
