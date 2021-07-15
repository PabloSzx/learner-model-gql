import assert from "assert";
import { ResolveCursorConnection } from "api-base";

import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Topic {
      id: IntID!

      domain: Domain!

      parent: Topic

      childrens: [Topic!]!
    }

    type Domain {
      id: IntID!

      topics: [Topic!]!
    }

    type TopicsConnection implements Connection {
      nodes: [Topic!]!
      pageInfo: PageInfo
    }

    type DomainsConnection implements Connection {
      nodes: [Domain!]!
      pageInfo: PageInfo
    }

    type AdminQueries {
      allTopics(pagination: CursorConnectionArgs!): TopicsConnection!
      allDomains(pagination: CursorConnectionArgs!): DomainsConnection!
    }

    input CreateDomain {
      code: String!
      label: String!

      projectId: IntID!
    }

    input CreateTopic {
      code: String!
      label: String!

      parentTopicId: IntID

      domainId: IntID!

      projectId: IntID!
    }

    input UpdateTopic {
      id: IntID!

      code: String!
      label: String!

      parentTopicId: IntID

      domainId: IntID!

      projectId: IntID!
    }

    type AdminMutations {
      createDomain(input: CreateDomain!): Domain!
      createTopic(input: CreateTopic!): Topic!
      updateTopic(input: UpdateTopic!): Topic!
    }

    type Query {
      topics(ids: [IntID!]!): [Topic!]!
      domains(ids: [IntID!]!): [Domain!]!

      admin: AdminQueries!
    }

    type Mutation {
      admin: AdminMutations!
    }
  `,
  {
    resolvers: {
      AdminMutations: {
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
        createTopic(
          _root,
          { input: { code, label, projectId, parentTopicId, domainId } },
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
            },
          });
        },
        updateTopic(
          _root,
          { input: { code, label, projectId, parentTopicId, domainId, id } },
          { prisma }
        ) {
          return prisma.topic.update({
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
            },
          });
        },
      },
      AdminQueries: {
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
      Mutation: {
        async admin(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
      },
      Query: {
        async admin(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
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
      },
    },
  }
);
