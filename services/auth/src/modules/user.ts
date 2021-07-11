import { gql, registerModule } from "../ez";

registerModule(
  gql`
    enum UserRole {
      ADMIN
      USER
    }
    type User {
      id: IntID!

      enabled: Boolean!

      email: String!
      name: String
      locked: Boolean!
      active: Boolean!
      lastOnline: DateTime

      role: UserRole!

      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type Query {
      currentUser: User
    }
  `,
  {
    resolvers: {
      Query: {
        async currentUser(_root, _args, { UserPromise }) {
          return await UserPromise;
        },
      },
    },
  }
);
