import assert from "assert";
import { expectRequestedIdsArePresent } from "api-base";

import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    type Domain {
      id: IntID!

      project: Project!
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
          return expectRequestedIdsArePresent(
            prisma.domain.findMany({
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
        async topics(_root, { ids }, { prisma, authorization }) {
          return expectRequestedIdsArePresent(
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
        async project({ id }, _args, { prisma }) {
          const project = await prisma.domain
            .findUnique({
              where: {
                id,
              },
            })
            .project();

          assert(project, "Project could not be found for domain " + id);

          return project;
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
