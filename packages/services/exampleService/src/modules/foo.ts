import { gql, registerModule } from "../ez";

export const fooModule = registerModule(
  // This defines the types
  gql`
    extend type Query {
      foo: String!
    }
  `,
  {
    id: "Foo",
    dirname: import.meta.url,
    // This defines the resolvers associated with the defined types
    resolvers: {
      Query: {
        //foo() {
        // return "Foo!";
        // },
      },
    },
  }
);
