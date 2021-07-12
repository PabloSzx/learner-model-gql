import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Topic {
      id: IntID

      parent: Domain!

      childrens: [Domain!]!
    }
    type Domain {
      id: IntID!

      topic: [Topic!]!
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
