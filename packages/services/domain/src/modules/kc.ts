import { getNodeIdList, ResolveCursorConnection } from "api-base";
import { gql, registerModule } from "../ez";

export const kcModule = registerModule(
  gql`
    "KC / Knowledge Component Entity"
    type KC {
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

    extend type Topic {
      "KCs associated with the topic"
      kcs: [KC!]!
    }

    extend type Domain {
      "KCs associated with the domain"
      kcs: [KC!]!
    }

    "Paginated KCs"
    type KCsConnection implements Connection {
      "Nodes of the current page"
      nodes: [KC!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Filter all KCs of admin query"
    input AdminKCsFilter {
      """
      Filter by the specified projects

      If the KC's domain matches any of the specified projects, the KC is included
      """
      domains: [IntID!]

      """
      Filter by the specified projects

      If the KC's project matches any of the specified projects, the KC is included
      """
      projects: [IntID!]

      """
      Filter by the specified topics

      If any of the KC's topics matches any of the specified topics, the KC is included
      """
      topics: [IntID!]
    }

    extend type AdminDomainQueries {
      """
      [ADMIN] Get all the KCs currently in the system

      Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
      """
      allKCs(
        pagination: CursorConnectionArgs!
        filters: AdminKCsFilter
      ): KCsConnection!
    }

    "KC creation input data"
    input CreateKCInput {
      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Domain associated with KC"
      domainId: IntID!
    }

    input UpdateKCInput {
      "Unique numeric identifier of the current KC"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!
    }

    extend type AdminDomainMutations {
      "[ADMIN] Create a new KC entity"
      createKC(data: CreateKCInput!): KC!

      "[ADMIN] Update an existent KC entity"
      updateKC(data: UpdateKCInput!): KC!
    }

    extend type Query {
      """
      Get all the KCs associated with the specified identifiers

      The KCs data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      kcs(ids: [IntID!]!): [KC!]!
    }
  `,
  {
    id: "KC",
    resolvers: {
      Topic: {
        async kcs({ id }, _args, { prisma }) {
          return (
            (await prisma.topic
              .findUnique({
                where: {
                  id,
                },
              })
              .kcs()) || []
          );
        },
      },
      Domain: {
        async kcs({ id }, _args, { prisma }) {
          return (
            (await prisma.domain
              .findUnique({
                where: {
                  id,
                },
              })
              .kcs()) || []
          );
        },
      },
      AdminDomainQueries: {
        allKCs(_root, { pagination, filters }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.kC.findMany({
              ...connection,
              where: {
                domain:
                  filters?.domains || filters?.projects || filters?.topics
                    ? {
                        id: filters?.domains
                          ? {
                              in: filters.domains,
                            }
                          : undefined,
                        projects: filters?.projects
                          ? {
                              some: {
                                id: {
                                  in: filters.projects,
                                },
                              },
                            }
                          : undefined,
                      }
                    : undefined,
                topics: filters?.topics
                  ? {
                      some: {
                        id: {
                          in: filters.topics,
                        },
                      },
                    }
                  : undefined,
              },
            });
          });
        },
      },
      AdminDomainMutations: {
        createKC(
          _root,
          { data: { domainId, ...data } },
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(data.code);

          return prisma.kC.create({
            data: {
              domain: {
                connect: {
                  id: domainId,
                },
              },
              ...data,
            },
          });
        },
        updateKC(
          _root,
          { data: { id, ...data } },
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(data.code);

          return prisma.kC.update({
            where: {
              id,
            },
            data: {
              ...data,
            },
          });
        },
      },
      Query: {
        async kcs(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.kC.findMany({
              where: {
                id: {
                  in: ids,
                },
                domain: {
                  projects:
                    await authorization.expectSomeProjectsInPrismaFilter,
                },
              },
            }),
            ids
          );
        },
      },
    },
  }
);
