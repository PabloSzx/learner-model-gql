import { CreateApp, gql } from "@pablosz/envelop-app/fastify";

const EnvelopApp = CreateApp({
  schema: {
    typeDefs: gql`
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello() {
          return "Hello World!";
        },
      },
    },
  },
  ide: true,
});

export const { plugin } = EnvelopApp.buildApp();
