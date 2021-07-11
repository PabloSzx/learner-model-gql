import { gql, registerModule } from "../ez";

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
