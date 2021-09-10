import { getIdsIntersection } from "api-base";
import { gql, registerModule } from "../ez";

export const projectModule = registerModule(
  gql`
    type Project {
      id: IntID!

      domains: [Domain!]!
    }

    extend type Query {
      projects(ids: [IntID!]!): [Project!]!
    }
  `,
  {
    resolvers: {
      Query: {
        async projects(_root, { ids }, { authorization, prisma }) {
          return prisma.project.findMany({
            where: {
              id: {
                in: await getIdsIntersection(
                  ids,
                  authorization.expectUserProjects
                ),
              },
            },
          });
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
      },
    },
    id: "Domain Project",
  }
);
