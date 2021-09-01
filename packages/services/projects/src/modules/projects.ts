import { gql, registerModule } from "../ez";

registerModule(
  gql`
    type Project {
      id: IntID!

      code: String!
      label: String!
    }

    type AdminQueries {
      allProjects: [Project!]!
    }

    input CreateProject {
      code: String!
      label: String!
    }

    type AdminMutations {
      createProject(data: CreateProject!): Project!
    }

    type Query {
      hello: String!
      admin: AdminQueries!
    }

    type Mutation {
      admin: AdminMutations!
    }
  `,
  {
    resolvers: {
      AdminQueries: {
        allProjects(_root, _args, { prisma }) {
          return prisma.project.findMany();
        },
      },
      AdminMutations: {
        createProject(_root, { data }, { prisma }) {
          return prisma.project.create({
            data,
          });
        },
      },
      Query: {
        async admin(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
        hello() {
          return "Hello World!";
        },
      },
      Mutation: {
        async admin(_root, _args, { authorization }) {
          await authorization.expectAdmin;
          return {};
        },
      },
    },
  }
);
