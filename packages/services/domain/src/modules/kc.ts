import { gql, registerModule } from "../ez";

export const kcModule = registerModule(
  gql`
    type KC {
      id: IntID!

      code: String!
      label: String!
    }

    extend type Topic {
      kcs: [KC!]!
    }

    extend type Domain {
      kcs: [KC!]!
    }
  `,
  {
    id: "KC Module",
    resolvers: {},
  }
);
