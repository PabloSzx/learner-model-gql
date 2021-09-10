import { gql, registerModule } from "../ez";

registerModule(
  gql`
    extend type Query {
      hello2: String!
    }
  `,
  {
    resolvers: {
      Query: {
        hello2() {
          return "Hello World!";
        },
      },
    },
  }
);
