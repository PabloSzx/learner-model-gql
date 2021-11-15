import { getNodeIdList } from "api-base";
import assert from "assert";
import { gql, registerModule } from "../ez";

export const contentModule = registerModule(
  gql`
    type Content {
      id: IntID!

      project: Project!
    }

    extend type Query {
      content(ids: [IntID!]!): [Content!]!
    }
  `,
  {
    id: "Content",
    dirname: import.meta.url,
    resolvers: {
      Content: {
        async project({ id }, _args, { prisma, authorization }) {
          const project = await prisma.content
            .findUnique({
              where: {
                id,
              },
            })
            .project();

          assert(project, "Project could not be found for Content " + id);

          await authorization.expectAllowedUserProject(project.id, {
            checkExists: false,
          });

          return project;
        },
      },
      Query: {
        async content(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.content.findMany({
              where: {
                id: {
                  in: ids,
                },
                projectId: await authorization.expectProjectsInPrismaFilter,
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
