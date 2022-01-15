import assert from "assert";
import { getNodeIdList, ResolveCursorConnection } from "api-base";

import { gql, registerModule } from "../ez";

export const domainModule = registerModule(
  gql`
    "Topic entity"
    type Topic {
      "Unique numeric identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Parameter that can be used to sort a list of domains"
      sortIndex: Int

      """
      Parent topic

      Used to set the hierarchy of topics
      """
      parent: Topic

      """
      Tags associated with the domain

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      """
      Childrens topics

      Direct childrens of the current topic

      To build the topics tree, use the "parent" topic
      """
      childrens: [Topic!]!

      "Date of creation"
      createdAt: DateTime!

      "Date of last update"
      updatedAt: DateTime!
    }

    extend type KC {
      "Domain associated with the KC"
      domain: Domain!

      "Topics associated with the KC"
      topics: [Topic!]!
    }

    "Domain entity"
    type Domain {
      "Unique numeric identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Date of creation"
      createdAt: DateTime!

      "Date of last update"
      updatedAt: DateTime!
    }

    "Paginated Topics"
    type TopicsConnection implements Connection {
      "Nodes of the current page"
      nodes: [Topic!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Paginated Domains"
    type DomainsConnection implements Connection {
      "Nodes of the current page"
      nodes: [Domain!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Filter all domains of admin query"
    input AdminDomainsFilter {
      """
      Filter by the specified projects

      If the domain's project matches any of the specified projects, the domain is included
      """
      projects: [IntID!]

      """
      Filter by text search inside "code" or "label"
      """
      textSearch: String
    }

    "Filter all topics of admin query"
    input AdminTopicsFilter {
      """
      Filter by the specified projects

      If the topic's project matches any of the specified projects, the topic is included
      """
      projects: [IntID!]

      """
      Filter by text search inside "code", "label" or "tags"
      """
      textSearch: String
    }

    "Admin Domain-Related Queries"
    type AdminDomainQueries {
      """
      Get all the topics currently in the system

      Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
      """
      allTopics(
        pagination: CursorConnectionArgs!
        filters: AdminTopicsFilter
      ): TopicsConnection!

      """
      Get all the domains currently in the system

      Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
      """
      allDomains(
        pagination: CursorConnectionArgs!
        filters: AdminDomainsFilter
      ): DomainsConnection!
    }

    "Domain creation input data"
    input CreateDomain {
      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Projects associated with domain"
      projectsIds: [IntID!]!
    }

    "Domain update input data"
    input UpdateDomain {
      "Current domain identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!
    }

    "Topic creation input data"
    input CreateTopic {
      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      """
      Tags associated with the topic

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      """
      Parent topic

      Used to set the hierarchy of topics
      """
      parentTopicId: IntID

      "Project associated with topic"
      projectId: IntID!

      "Content associated with topic"
      contentIds: [IntID!]!

      "Parameter that can be used to sort a list of topics"
      sortIndex: Int
    }

    "Topic update input data"
    input UpdateTopic {
      "Current topic identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      """
      Tags associated with the topic

      Tags can be used to categorize or filter
      """
      tags: [String!]!

      """
      Parent topic

      Used to set the hierarchy of topics
      """
      parentTopicId: IntID

      "Content associated with topic"
      contentIds: [IntID!]!

      "Parameter that can be used to sort a list of topics"
      sortIndex: Int
    }

    "Admin Domain-Related Queries"
    type AdminDomainMutations {
      "Create a new domain entity"
      createDomain(input: CreateDomain!): Domain!

      "Update an existent domain entity"
      updateDomain(input: UpdateDomain!): Domain!

      "Create a new topic entity"
      createTopic(input: CreateTopic!): Topic!

      "Update an existent topic entity"
      updateTopic(input: UpdateTopic!): Topic!
    }

    extend type Query {
      """
      Get all the topics associated with the specified identifiers

      The topics data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      topics(ids: [IntID!]!): [Topic!]!

      """
      Get all the domains associated with the specified identifiers

      The domains data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      domains(ids: [IntID!]!): [Domain!]!

      """
      Get specified topic by "code".

      - If user is not authenticated it throws.
      - If authenticated user has no permissions on the corresponding project it returns NULL.
      """
      topicByCode(code: String!): Topic

      """
      Admin related domain queries, only authenticated users with the role "ADMIN" can access
      """
      adminDomain: AdminDomainQueries!
    }

    extend type Mutation {
      """
      Admin related domain mutations, only authenticated users with the role "ADMIN" can access
      """
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
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(code);

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
        updateDomain(
          _root,
          { input: { id, label, code } },
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(code);

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
              tags,
            },
          },
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(code);

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
              tags: {
                set: tags,
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
              parentTopicId,
              id,
              contentIds,
              sortIndex,
              tags,
            },
          },
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(code);

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
              tags: {
                set: tags,
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
        allTopics(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.topic.findMany({
              ...args,
              where: filters
                ? {
                    projectId: filters.projects
                      ? {
                          in: filters.projects,
                        }
                      : undefined,
                    OR: filters.textSearch
                      ? [
                          {
                            code: {
                              contains: filters.textSearch,
                            },
                          },
                          {
                            label: {
                              contains: filters.textSearch,
                            },
                          },
                          {
                            tags: {
                              has: filters.textSearch,
                            },
                          },
                        ]
                      : undefined,
                  }
                : undefined,
            });
          });
        },
        allDomains(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (args) => {
            return prisma.domain.findMany({
              ...args,
              where: filters
                ? {
                    projects: filters.projects
                      ? {
                          some: {
                            id: {
                              in: filters.projects,
                            },
                          },
                        }
                      : undefined,
                    OR: filters.textSearch
                      ? [
                          {
                            code: {
                              contains: filters.textSearch,
                            },
                          },
                          {
                            label: {
                              contains: filters.textSearch,
                            },
                          },
                        ]
                      : undefined,
                  }
                : undefined,
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
        async topicByCode(_root, { code }, { prisma, authorization }) {
          return prisma.topic.findFirst({
            where: {
              code,
              project: await authorization.expectProjectsIdInPrismaFilter,
            },
          });
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
