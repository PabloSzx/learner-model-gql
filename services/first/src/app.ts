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
  buildContext({ request }) {
    if (request.headers.authorization) {
      request.jwtVerify<{}>().then(console.log, console.error);
    }

    return {};
  },
});

export const { plugin } = EnvelopApp.buildApp();
