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
      "[ADMIN] Project related administration queries"
      adminProjects: AdminProjectsQueries!

      """
      Get all the projects associated with the specified identifiers

      The projects data is guaranteed to follow the specified identifiers order

      If any of the specified identifiers is not found or forbidden, query fails
      """
      projects(ids: [IntID!]!): [Project!]!

      """
      Get specified project by either "id" or "code".

      - If user is not authenticated it will always return NULL.
      - If authenticated user has no permissions on the specified project it returns NULL.
      """
      project(id: IntID, code: String): Project
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
        async project(
          _root,
          { code, id },
          { prisma, authorization, UserPromise }
        ) {
          if (code == null && id == null)
            throw Error("No identifier specified!");

          const [project, user] = await Promise.all([
            prisma.project.findUnique({
              where: code
                ? {
                    code,
                  }
                : {
                    id: id!,
                  },
            }),
            UserPromise,
          ]);

          if (!project || !user) return null;

          try {
            await authorization.expectAllowedUserProject(project.id);

            return project;
          } catch (err) {
            return null;
          }
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
