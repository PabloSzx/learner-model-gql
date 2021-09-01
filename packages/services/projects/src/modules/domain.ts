import assert from "assert";

import { gql, registerModule } from "../ez";

registerModule(
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
    resolvers: {
      Query: {
        async domains(_root, { ids }, { prisma, authorization }) {
          return prisma.domain.findMany({
            where: {
              id: {
                in: ids,
              },
              project: {
                id: {
                  in: await authorization.expectUserProjects,
                },
              },
            },
          });
        },
        async topics(_root, { ids }, { prisma, authorization }) {
          return prisma.topic.findMany({
            where: {
              id: {
                in: ids,
              },
              project: {
                id: {
                  in: await authorization.expectUserProjects,
                },
              },
            },
          });
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
