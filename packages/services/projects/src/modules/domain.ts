import assert from "assert";
import { getNodeIdList } from "api-base";

import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    type Domain {
      id: IntID!

      projects: [Project!]!
    }

    type Topic {
      id: IntID!

      project: Project!
    }

    extend type Query {
      domains(ids: [IntID!]!): [Domain!]!
      topics(ids: [IntID!]!): [Topic!]!
    }
  `,
  {
    id: "Domain",
    dirname: import.meta.url,
    resolvers: {
      Query: {
        async domains(_root, { ids }, { prisma, authorization }) {
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
        async topics(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.topic.findMany({
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
      Domain: {
        async projects({ id }, _args, { prisma }) {
          return (
            (await prisma.domain
              .findUnique({
                where: {
                  id,
                },
              })
              .projects()) || []
          );
        },
      },
      Topic: {
        async project({ id }, _args, { prisma }) {
          const project = await prisma.topic
            .findUnique({
              where: {
                id,
              },
            })
            .project();

          assert(project, "Project could not be found for topic " + id);

          return project;
        },
      },
    },
  }
);
