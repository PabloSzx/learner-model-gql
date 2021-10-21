import {
  getNodeIdList,
  getIdsIntersection,
  ResolveCursorConnection,
} from "api-base";
import { gql, registerModule } from "../ez";

export const projectsModule = registerModule(
  gql`
    type Project {
      id: IntID!

      code: String!
      label: String!

      createdAt: DateTime!
      updatedAt: DateTime!
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

      domains: [IntID!]!
    }

    input UpdateProject {
      id: IntID!

      code: String!
      label: String!

      domains: [IntID!]!
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
        createProject(_root, { data: { domains, ...data } }, { prisma }) {
          return prisma.project.create({
            data: {
              ...data,
              domains: {
                connect: domains.map((id) => ({ id })),
              },
            },
          });
        },
        updateProject(_root, { data: { id, domains, ...data } }, { prisma }) {
          return prisma.project.update({
            where: {
              id,
            },
            data: {
              ...data,
              domains: {
                set: domains.map((id) => ({ id })),
              },
            },
          });
        },
      },
      Query: {
        async adminProjects(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
        async projects(_root, { ids }, { prisma, authorization }) {
          return getNodeIdList(
            prisma.project.findMany({
              where: {
                id: {
                  in:
                    (await authorization.expectUser).role === "ADMIN"
                      ? ids
                      : await getIdsIntersection(
                          ids,
                          authorization.expectUserProjects
                        ),
                },
              },
            }),
            ids
          );
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
