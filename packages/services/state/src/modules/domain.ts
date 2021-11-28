import assert from "assert/strict";
import { gql, ModelStateConnection, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    "Domain entity"
    type Domain {
      "Unique numeric identifier"
      id: IntID!

      "Model States associated with domain"
      modelStates(input: ModelStateConnectionInput!): ModelStateConnection!
    }

    extend type ModelState {
      "Domain associated with Model State"
      domain: Domain!
    }

    extend type Query {
      """
      Get all the domains associated with the specified identifiers

      The domains data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      domains(ids: [IntID!]!): [Domain!]!
    }
  `,
  {
    id: "Domain",
    dirname: import.meta.url,
    resolvers: {
      ModelState: {
        async domain({ id }, _args, { prisma }) {
          const domain = await prisma.modelState
            .findUnique({
              where: {
                id,
              },
            })
            .domain();

          assert(domain, "Domain could not be found for Model State " + id);

          return domain;
        },
      },
      Domain: {
        async modelStates({ id }, { input }, { authorization }) {
          const allowedProjectsIds =
            await authorization.expectAllowedProjectsIdsModelStates;

          return ModelStateConnection(input, {
            where: {
              domain: {
                id,
                // If user is not admin, filter out not-authorized projects
                projects: allowedProjectsIds
                  ? {
                      some: {
                        id: {
                          in: allowedProjectsIds,
                        },
                      },
                    }
                  : undefined,
              },
            },
          });
        },
      },
      Query: {
        async domains(
          _root,
          { ids },
          { prisma, authorization, getNodeIdList }
        ) {
          return getNodeIdList(
            prisma.domain.findMany({
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
