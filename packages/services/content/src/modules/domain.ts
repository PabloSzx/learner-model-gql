import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Domain {
      id: IntID!

      content: [Content!]!
    }

    type Topic {
      id: IntID!

      content: [Content!]!
    }

    extend type Query {
      domains(ids: [IntID!]!): [Domain!]!
      topics(ids: [IntID!]!): [Topic!]!
    }
  `,
  {
    resolvers: {
      Topic: {
        async content({ id }, _args, { prisma }) {
          return (
            (await prisma.topic
              .findUnique({
                where: {
                  id,
                },
              })
              .content()) || []
          );
        },
      },
      Domain: {
        async content({ id }, _args, { prisma }) {
          return (
            (await prisma.domain
              .findUnique({
                where: {
                  id,
                },
              })
              .content()) || []
          );
        },
      },
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
    },
  }
);
