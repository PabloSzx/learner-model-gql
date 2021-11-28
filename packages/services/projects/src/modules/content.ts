import { getNodeIdList } from "api-base";
import assert from "assert";
import { gql, registerModule } from "../ez";

export const contentModule = registerModule(
  gql`
    "Content entity"
    type Content {
      "Unique numeric identifier"
      id: IntID!

      "Project associated with the content"
      project: Project!
    }

    extend type Query {
      """
      Get all the content associated with the specified identifiers

      The content data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
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
