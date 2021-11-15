import assert from "assert/strict";
import { gql, ModelStateConnection, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    type Domain {
      id: IntID!

      modelStates(input: ModelStateConnectionInput!): ModelStateConnection!
    }

    extend type ModelState {
      domain: Domain!
    }

    extend type Query {
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
          const notAdminAllowedProjectsIds =
            await authorization.expectNotAdminAllowedProjectsIdsModelStates;

          return ModelStateConnection(input, {
            where: {
              domain: {
                id,
                // If user is not admin, filter out not-authorized projects
                projects: notAdminAllowedProjectsIds
                  ? {
                      some: {
                        id: {
                          in: notAdminAllowedProjectsIds,
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
