import { registerModule, gql } from "../ez";

registerModule(
  gql`
    type Group {
      id: IntID!

      code: String!
      label: String!

      users: [User!]!
    }

    extend type User {
      groups: [Group!]!
    }
  `,
  {
    resolvers: {
      User: {
        async groups({ id }, _args, { prisma }) {
          const groups = await prisma.user
            .findUnique({
              where: {
                id,
              },
            })
            .groups();

          return groups || [];
        },
      },
    },
  }
);
