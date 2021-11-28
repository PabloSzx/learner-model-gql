import assert from "assert";
import { getNodeIdList } from "api-base";

import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    "Domain entity"
    type Domain {
      "Unique numeric identifier"
      id: IntID!

      "Projects associated with the domain"
      projects: [Project!]!
    }

    "Topic entity"
    type Topic {
      "Unique numeric identifier"
      id: IntID!

      "Project associated with the topic"
      project: Project!
    }

    extend type Query {
      """
      Get all the domains associated with the specified identifiers

      The domains data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      domains(ids: [IntID!]!): [Domain!]!

      """
      Get all the topics associated with the specified identifiers

      The topics data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
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
        async projects({ id }, _args, { prisma, authorization }) {
          return (
            (await prisma.domain
              .findUnique({
                where: {
                  id,
                },
              })
              .projects({
                where: await authorization.expectProjectsIdInPrismaFilter,
              })) || []
          );
        },
      },
      Topic: {
        async project({ id }, _args, { prisma, authorization }) {
          const project = await prisma.topic
            .findUnique({
              where: {
                id,
              },
            })
            .project();

          assert(project, "Project could not be found for topic " + id);

          await authorization.expectAllowedUserProject(project.id, {
            checkExists: false,
          });

          return project;
        },
      },
    },
  }
);
