import { gql, registerModule } from "../app";

registerModule(
  gql`
    enum UserRole {
      ADMIN
      USER
    }
    type User {
      id: ID!

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
