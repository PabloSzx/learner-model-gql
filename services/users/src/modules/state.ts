import { gql, registerModule } from "../app";

registerModule(
  gql`
    type Query {
      hello: String!
    }
  `,
  {
    resolvers: {
      Query: {},
    },
  }
);
