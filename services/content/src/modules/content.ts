import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Content {
      id: IntID!

      json: JSONObject
    }
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
