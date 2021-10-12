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

      domain: Domain!

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

      topics: [Topic!]!

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

    type AdminDomainQueries {
      allTopics(pagination: CursorConnectionArgs!): TopicsConnection!
      allDomains(pagination: CursorConnectionArgs!): DomainsConnection!
    }

    input CreateDomain {
      code: String!
      label: String!

      projectId: IntID!
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

      domainId: IntID!

      projectId: IntID!

      contentIds: [IntID!]!
    }

    input UpdateTopic {
      id: IntID!

      code: String!
      label: String!

      parentTopicId: IntID

      domainId: IntID!

      projectId: IntID!

      contentIds: [IntID!]!
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
        createDomain(_root, { input: { code, label, projectId } }, { prisma }) {
          return prisma.domain.create({
            data: {
              code,
              label,
              project: {
                connect: {
                  id: projectId,
                },
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
              domainId,
              contentIds,
            },
          },
          { prisma }
        ) {
          return prisma.topic.create({
            data: {
              code,
              label,
              domain: {
                connect: {
                  id: domainId,
                },
              },
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
            },
          });
        },
        async updateTopic(
          _root,
          {
            input: {
              code,
              label,
              projectId,
              parentTopicId,
              domainId,
              id,
              contentIds,
            },
          },
          { prisma }
        ) {
          const topic = await prisma.topic.update({
            where: {
              id,
            },
            data: {
              code,
              label,
              domain: {
                connect: {
                  id: domainId,
                },
              },
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
                set: contentIds.map((id) => ({ id })),
              },
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
        allTopics(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.topic.findMany(args);
          });
        },
        allDomains(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.domain.findMany(args);
          });
        },
      },
      Topic: {
        async domain({ id }, _args, { prisma }) {
          const domain = await prisma.topic
            .findUnique({
              where: {
                id,
              },
            })
            .domain();

          assert(domain, "Domain could not be found for topic " + id);

          return domain;
        },
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
                project: await authorization.expectProjectsIdInPrismaFilter,
              },
            }),
            ids
          );
        },
      },
    },
  }
);
