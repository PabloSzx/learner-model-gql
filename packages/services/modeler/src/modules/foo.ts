import { gql, registerModule } from "../ez";

export const fooModule = registerModule(
  // This defines the types
  gql`
    extend type Mutation {
      createModel(userId: IntID!, domainId: IntID!, type: String!): Void
    }
  `,
  {
    id: "Foo",
    dirname: import.meta.url,
    // This defines the resolvers associated with the defined types
    resolvers: {
      Mutation: {
        async createModel(
          _root,
          { userId, domainId, type },
          { authorization, prisma }
        ) {
          const user = await authorization.expectAdmin;
          const actionsUser = await prisma.action.findMany({
            where: {
              user: { id: userId },
              OR: [
                {
                  kcs: {
                    some: {
                      domainId,
                    },
                  },
                },
              ],
            },
          });
        },
      },
    },
  }
);
