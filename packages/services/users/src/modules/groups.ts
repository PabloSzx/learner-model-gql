import { registerModule, gql } from "../ez";

export const groupsModule = registerModule(
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
    id: "Groups",
    dirname: import.meta.url,
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
