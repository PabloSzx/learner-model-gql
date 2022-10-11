import {
  getNodeIdList,
  ResolveCursorConnection,
  KcRelation,
  enumParser,
} from "api-base";
import { gql, registerModule } from "../ez";
import { KCRelationType } from "../ez.generated";

const parseKCRelationType = enumParser(KCRelationType);

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

      "All relations of KC"
      relations: [KCRelation!]!
    }

    "Type of KC Relationship"
    enum KCRelationType {
      PARTOF
      INTERACT
      PREREQUISITE
    }

    "Relations between KCs"
    type KCRelation {
      "Unique numeric identifier"
      id: IntID!

      "Type of relation"
      type: KCRelationType!

      "Domain shared by both KCs"
      domain: Domain!
      "Domain id shared by both KCs"
      domainId: IntID!

      "Custom Label of KC Relation"
      label: String

      "Custom Comment of KC Relation"
      comment: String

      "KC A"
      kcA: KC!
      "KC A id"
      kcAId: IntID!

      "KC B"
      kcB: KC!
      "KC B id"
      kcBId: IntID!
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

      """
      Filter by text search inside "code" or "label"
      """
      textSearch: String
    }

    extend type AdminDomainQueries {
      """
      Get all the KCs currently in the system

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

    input KCRelationInput {
      "Type of KC Relation"
      type: KCRelationType!

      "KC A"
      kcA: IntID!

      "KC B"
      kcB: IntID!

      "Relation readable label"
      label: String

      "Custom comment text"
      comment: String
    }

    extend type AdminDomainMutations {
      "Create a new KC entity"
      createKC(data: CreateKCInput!): KC!

      "Update an existent KC entity"
      updateKC(data: UpdateKCInput!): KC!

      "Set KC Relation"
      setKCRelation(data: KCRelationInput!): KCRelation!

      "Unset KC Relation"
      unsetKCRelation(data: KCRelationInput!): Void
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
      KCRelation: {
        domain({ domainId }, _args, { prisma }) {
          return prisma.domain.findUniqueOrThrow({
            where: {
              id: domainId,
            },
          });
        },
        kcA({ kcAId }, _args, { prisma }) {
          return prisma.kC.findUniqueOrThrow({
            where: {
              id: kcAId,
            },
          });
        },
        kcB({ kcBId }, _args, { prisma }) {
          return prisma.kC.findUniqueOrThrow({
            where: {
              id: kcBId,
            },
          });
        },
        type({ relation = "null" }: Partial<KcRelation>) {
          return parseKCRelationType(relation);
        },
      },
      KC: {
        async relations({ id }, _args, { prisma }) {
          const kc = prisma.kC.findUnique({
            where: {
              id,
            },
          });
          const [ARelations, BRelations] = await Promise.all([
            kc.kcARelations(),
            kc.kcBRelations(),
          ]);

          return [...(ARelations || []), ...(BRelations || [])];
        },
      },
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
              where: filters
                ? {
                    domain:
                      filters.domains || filters.projects || filters.topics
                        ? {
                            id: filters.domains
                              ? {
                                  in: filters.domains,
                                }
                              : undefined,
                            projects: filters.projects
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
        async setKCRelation(
          _root,
          { data: { type, kcA, kcB, label = null, comment = null } },
          { prisma }
        ) {
          const kcsDomain = await prisma.domain.findFirst({
            where: {
              AND: [
                {
                  kcs: {
                    some: {
                      id: kcA,
                    },
                  },
                },
                {
                  kcs: {
                    some: {
                      id: kcB,
                    },
                  },
                },
              ],
            },
            select: {
              id: true,
            },
          });

          if (kcsDomain == null) {
            throw Error(
              `Shared domain could not be found between KCs "${kcA}" and "${kcB}"`
            );
          }

          return await prisma.kcRelation.upsert({
            create: {
              domain: {
                connect: {
                  id: kcsDomain.id,
                },
              },
              relation: type,
              kcA: {
                connect: {
                  id: kcA,
                },
              },
              kcB: {
                connect: {
                  id: kcB,
                },
              },
              comment,
              label,
            },
            update: {
              comment,
              label,
            },
            where: {
              kcAId_kcBId_relation: {
                kcAId: kcA,
                kcBId: kcB,
                relation: type,
              },
            },
          });
        },
        async unsetKCRelation(_root, { data: { kcA, kcB, type } }, { prisma }) {
          await prisma.kcRelation.delete({
            where: {
              kcAId_kcBId_relation: {
                kcAId: kcA,
                kcBId: kcB,
                relation: type,
              },
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
