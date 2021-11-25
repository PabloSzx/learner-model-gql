import { getIdsIntersection, getNodeIdList } from "api-base";
import { gql, registerModule } from "../ez";

export const projectModule = registerModule(
  gql`
    type Project {
      id: IntID!

      domains: [Domain!]!

      topics: [Topic!]!
    }

    extend type Query {
      """
      Get all the projects associated with the specified identifiers

      The projects data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      projects(ids: [IntID!]!): [Project!]!
    }
  `,
  {
    resolvers: {
      Query: {
        async projects(_root, { ids }, { authorization, prisma }) {
          return getNodeIdList(
            prisma.project.findMany({
              where: {
                id: {
                  in:
                    (await authorization.expectUser).role === "ADMIN"
                      ? ids
                      : await getIdsIntersection(
                          ids,
                          authorization.expectUserProjects
                        ),
                },
              },
              select: {
                id: true,
              },
            }),
            ids
          );
        },
      },
      Project: {
        async domains({ id }, _args, { prisma, authorization }) {
          await authorization.expectAllowedUserProject(id);

          return (
            (await prisma.project
              .findUnique({
                where: {
                  id,
                },
              })
              .domains()) || []
          );
        },
        async topics({ id }, _args, { prisma, authorization }) {
          await authorization.expectAllowedUserProject(id);

          return (
            (await prisma.project
              .findUnique({
                where: {
                  id,
                },
              })
              .topics()) || []
          );
        },
      },
    },
    id: "Domain Project",
  }
);
