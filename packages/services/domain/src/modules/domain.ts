import assert from "assert";
import { getNodeIdList, ResolveCursorConnection } from "api-base";

import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    type Topic {
      id: IntID!

      code: String!
      label: String!

      sortIndex: Int

      parent: Topic

      childrens: [Topic!]!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    extend type KC {
      domain: Domain!

      topics: [Topic!]!
    }

    type Domain {
      id: IntID!

      code: String!
      label: String!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type TopicsConnection implements Connection {
      nodes: [Topic!]!
      pageInfo: PageInfo!
    }

    type DomainsConnection implements Connection {
      nodes: [Domain!]!
      pageInfo: PageInfo!
    }

    input AdminDomainsFilter {
      projects: [IntID!]
    }

    input AdminTopicsFilter {
      projects: [IntID!]
    }

    type AdminDomainQueries {
      allTopics(
        pagination: CursorConnectionArgs!
        filters: AdminTopicsFilter
      ): TopicsConnection!
      allDomains(
        pagination: CursorConnectionArgs!
        filters: AdminDomainsFilter
      ): DomainsConnection!
    }

    input CreateDomain {
      code: String!
      label: String!

      projectsIds: [IntID!]!
    }

    input UpdateDomain {
      id: IntID!

      code: String!

      label: String!
    }

    input CreateTopic {
      code: String!
      label: String!

      parentTopicId: IntID

      projectId: IntID!

      contentIds: [IntID!]!

      sortIndex: Int
    }

    input UpdateTopic {
      id: IntID!

      code: String!
      label: String!

      parentTopicId: IntID

      contentIds: [IntID!]!

      sortIndex: Int
    }

    type AdminDomainMutations {
      createDomain(input: CreateDomain!): Domain!
      updateDomain(input: UpdateDomain!): Domain!
      createTopic(input: CreateTopic!): Topic!
      updateTopic(input: UpdateTopic!): Topic!
    }

    extend type Query {
      topics(ids: [IntID!]!): [Topic!]!
      domains(ids: [IntID!]!): [Domain!]!

      adminDomain: AdminDomainQueries!
    }

    extend type Mutation {
      adminDomain: AdminDomainMutations!
    }
  `,
  {
    id: "Domain Module",
    resolvers: {
      AdminDomainMutations: {
        createDomain(
          _root,
          { input: { code, label, projectsIds } },
          { prisma }
        ) {
          return prisma.domain.create({
            data: {
              code,
              label,
              projects: {
                connect: projectsIds.map((id) => ({ id })),
              },
            },
          });
        },
        updateDomain(_root, { input: { id, label, code } }, { prisma }) {
          return prisma.domain.update({
            where: {
              id,
            },
            data: {
              code,
              label,
            },
          });
        },
        createTopic(
          _root,
          {
            input: {
              code,
              label,
              projectId,
              parentTopicId,
              contentIds,
              sortIndex,
            },
          },
          { prisma }
        ) {
          return prisma.topic.create({
            data: {
              code,
              label,
              project: {
                connect: {
                  id: projectId,
                },
              },
              parent:
                parentTopicId != null
                  ? {
                      connect: {
                        id: parentTopicId,
                      },
                    }
                  : undefined,
              content: {
                connect: contentIds.map((id) => ({ id })),
              },
              sortIndex,
            },
          });
        },
        async updateTopic(
          _root,
          { input: { code, label, parentTopicId, id, contentIds, sortIndex } },
          { prisma }
        ) {
          const topic = await prisma.topic.update({
            where: {
              id,
            },
            data: {
              code,
              label,
              parent:
                parentTopicId != null
                  ? {
                      connect: {
                        id: parentTopicId,
                      },
                    }
                  : undefined,
              content: {
                set: contentIds.map((id) => ({ id })),
              },
              sortIndex,
            },
          });

          if (parentTopicId == null) {
            await prisma.topic.update({
              where: {
                id,
              },
              data: {
                parentId: null,
              },
              select: null,
            });
          }

          return topic;
        },
      },
      AdminDomainQueries: {
        allTopics(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.topic.findMany({
              ...args,
              where: {
                projectId: filters?.projects
                  ? {
                      in: filters.projects,
                    }
                  : undefined,
              },
            });
          });
        },
        allDomains(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.domain.findMany({
              ...args,
              where: {
                projects: filters?.projects
                  ? {
                      some: {
                        id: {
                          in: filters.projects,
                        },
                      },
                    }
                  : undefined,
              },
            });
          });
        },
      },
      Topic: {
        parent({ id }, _args, { prisma }) {
          return prisma.topic
            .findUnique({
              where: {
                id,
              },
            })
            .parent();
        },
        async childrens({ id }, _args, { prisma }) {
          return (
            (await prisma.topic
              .findUnique({
                where: {
                  id,
                },
              })
              .childrens()) || []
          );
        },
      },
      KC: {
        async domain({ id }, _args, { prisma }) {
          const domain = await prisma.kC
            .findUnique({
              where: {
                id,
              },
            })
            .domain();

          assert(domain, "Domain could not be found for KC " + id);

          return domain;
        },
        async topics({ id }, _args, { prisma }) {
          return (
            (await prisma.kC
              .findUnique({
                where: {
                  id,
                },
              })
              .topics()) || []
          );
        },
      },
      Mutation: {
        async adminDomain(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
      },
      Query: {
        async adminDomain(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
        async topics(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.topic.findMany({
              where: {
                id: {
                  in: ids,
                },
                project: await authorization.expectProjectsIdInPrismaFilter,
              },
            }),
            ids
          );
        },
        async domains(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.domain.findMany({
              where: {
                id: {
                  in: ids,
                },
                projects: await authorization.expectSomeProjectsInPrismaFilter,
              },
            }),
            ids
          );
        },
      },
    },
  }
);
