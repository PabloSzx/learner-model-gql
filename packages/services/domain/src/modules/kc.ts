import { ResolveCursorConnection } from "api-base";
import { gql, registerModule } from "../ez";

export const kcModule = registerModule(
  gql`
    type KC {
      id: IntID!

      code: String!
      label: String!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    extend type Topic {
      kcs: [KC!]!
    }

    extend type Domain {
      kcs: [KC!]!
    }

    type KCsConnection implements Connection {
      nodes: [KC!]!
      pageInfo: PageInfo!
    }

    extend type AdminDomainQueries {
      allKCs(pagination: CursorConnectionArgs!): KCsConnection!
    }

    input CreateKCInput {
      code: String!
      label: String!

      domainId: IntID!
    }

    input UpdateKCInput {
      id: IntID!

      code: String!
      label: String!
    }

    extend type AdminDomainMutations {
      createKC(data: CreateKCInput!): KC!

      updateKC(data: UpdateKCInput!): KC!
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
        allKCs(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.kC.findMany({
              ...connection,
            });
          });
        },
      },
      AdminDomainMutations: {
        createKC(_root, { data: { domainId, ...data } }, { prisma }) {
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
        updateKC(_root, { data: { id, ...data } }, { prisma }) {
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
    },
  }
);
