import { getIdsIntersection, ResolveCursorConnection } from "api-base";
import { gql, registerModule } from "../ez";

export const projectsModule = registerModule(
  gql`
    type Project {
      id: IntID!

      code: String!
      label: String!
    }

    type ProjectsConnection implements Connection {
      nodes: [Project!]!
      pageInfo: PageInfo!
    }

    type AdminProjectsQueries {
      allProjects(pagination: CursorConnectionArgs!): ProjectsConnection!
    }

    input CreateProject {
      code: String!
      label: String!
    }

    input UpdateProject {
      id: IntID!

      code: String!
      label: String!
    }

    type AdminProjectsMutations {
      createProject(data: CreateProject!): Project!
      updateProject(data: UpdateProject!): Project!
    }

    extend type Query {
      adminProjects: AdminProjectsQueries!

      projects(ids: [IntID!]!): [Project!]!
    }

    extend type Mutation {
      adminProjects: AdminProjectsMutations!
    }
  `,
  {
    id: "Projects",
    dirname: import.meta.url,
    resolvers: {
      AdminProjectsQueries: {
        allProjects(_root, { pagination }, { prisma }) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.project.findMany({
              ...connection,
            });
          });
        },
      },
      AdminProjectsMutations: {
        createProject(_root, { data }, { prisma }) {
          return prisma.project.create({
            data,
          });
        },
        updateProject(_root, { data: { id, ...data } }, { prisma }) {
          return prisma.project.update({
            where: {
              id,
            },
            data,
          });
        },
      },
      Query: {
        async adminProjects(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },

        async projects(_root, { ids }, { prisma, authorization }) {
          return prisma.project.findMany({
            where: {
              id: {
                in: await getIdsIntersection(
                  ids,
                  authorization.expectUserProjects
                ),
              },
            },
          });
        },
      },
      Mutation: {
        async adminProjects(_root, _args, { authorization }) {
          await authorization.expectAdmin;
          return {};
        },
      },
    },
  }
);
