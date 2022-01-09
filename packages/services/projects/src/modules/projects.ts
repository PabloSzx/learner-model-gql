import {
  getNodeIdList,
  getIdsIntersection,
  ResolveCursorConnection,
} from "api-base";
import { gql, registerModule } from "../ez";

export const projectsModule = registerModule(
  gql`
    "Project entity"
    type Project {
      "Unique numeric identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Date of creation"
      createdAt: DateTime!

      "Date of last update"
      updatedAt: DateTime!
    }

    "Paginated Projects"
    type ProjectsConnection implements Connection {
      "Nodes of the current page"
      nodes: [Project!]!

      "Pagination related information"
      pageInfo: PageInfo!
    }

    "Admin Project-Related Queries"
    type AdminProjectsQueries {
      """
      Get all the projects currently in the system
      """
      allProjects(pagination: CursorConnectionArgs!): ProjectsConnection!
    }

    "Project creation input data"
    input CreateProject {
      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Domains associated with project"
      domains: [IntID!]!
    }

    "Project update input data"
    input UpdateProject {
      "Current project identifier"
      id: IntID!

      "Unique string identifier"
      code: String!

      "Human readable identifier"
      label: String!

      "Domains associated with project"
      domains: [IntID!]!
    }

    "Admin Project-Related Mutations"
    type AdminProjectsMutations {
      "Create a new project entity"
      createProject(data: CreateProject!): Project!

      "Update an existent project entity"
      updateProject(data: UpdateProject!): Project!
    }

    extend type Query {
      "Project related administration queries"
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
      """
      Admin related project mutations, only authenticated users with the role "ADMIN" can access
      """
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
        createProject(
          _root,
          { data: { domains, ...data } },
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(data.code);

          return prisma.project.create({
            data: {
              ...data,
              domains: {
                connect: domains.map((id) => ({ id })),
              },
            },
          });
        },
        updateProject(
          _root,
          { data: { id, domains, ...data } },
          { prisma, assertNotNumericCode }
        ) {
          assertNotNumericCode(data.code);

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
