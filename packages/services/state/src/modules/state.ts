import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Query {
      hello: String!
    }
  `,
  {
    resolvers: {
      Query: {
        hello() {
          return "Hello World!";
        },
      },
    },
  }
);
