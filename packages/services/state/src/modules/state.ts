import { gql, ModelStateConnection, registerModule } from "../ez";
import type { ModelState } from "../ez.generated";

export const stateModule = registerModule(
  gql`
    extend type Query {
      hello: String!

      adminState: AdminStateQueries!
    }

    input ModelStateOrderBy {
      id: ORDER_BY = DESC
    }

    input ModelStateFilter {
      type: [String!]
      creators: [String!]
    }

    type AdminStateQueries {
      allModelStates(input: ModelStateConnectionInput!): ModelStateConnection!
      allModelStateCreators(
        pagination: CursorConnectionArgs!
      ): ModelStateCreatorConnection!
      allModelStateTypes(
        pagination: CursorConnectionArgs!
      ): ModelStateTypeConnection!
    }

    type ModelStateCreator {
      id: IntID!

      name: String!

      updatedAt: DateTime!
      createdAt: DateTime!
    }

    type ModelStateType {
      id: IntID!

      name: String!

      updatedAt: DateTime!
      createdAt: DateTime!
    }

    type ModelStateCreatorConnection implements Connection {
      nodes: [ModelStateCreator!]!
      pageInfo: PageInfo!
    }

    type ModelStateTypeConnection implements Connection {
      nodes: [ModelStateType!]!
      pageInfo: PageInfo!
    }

    input ModelStateConnectionInput {
      pagination: CursorConnectionArgs!
      orderBy: ModelStateOrderBy
      filters: ModelStateFilter
    }

    type ModelStateConnection implements Connection {
      nodes: [ModelState!]!
      pageInfo: PageInfo!
    }

    type ModelState {
      id: IntID!

      type: String

      creator: String!

      json: JSON!

      createdAt: DateTime!
      updatedAt: DateTime!
    }
  `,
  {
    resolvers: {
      ModelState: {
        async id(
          { id, userId }: ModelState & { userId?: number },
          _args,
          { authorization, prisma }
        ) {
          const user = await authorization.expectUser;

          if (userId === user.id || user.role === "ADMIN") return id;

          const domainProjects =
            (
              await prisma.modelState
                .findUnique({
                  where: {
                    id,
                  },
                })
                .domain({
                  select: {
                    projects: {
                      select: {
                        id: true,
                      },
                    },
                  },
                })
            )?.projects.map((v) => v.id) || [];

          await authorization.expectAllowedReadProjectModelStates(
            domainProjects
          );

          return id;
        },
      },
      Query: {
        hello() {
          return "Hello World!";
        },
        async adminState(_root, _args, { authorization }) {
          await authorization.expectAdmin;

          return {};
        },
      },
      AdminStateQueries: {
        allModelStates(_root, { input }) {
          return ModelStateConnection(input);
        },
        allModelStateCreators(
          _root,
          { pagination },
          { prisma, ResolveCursorConnection }
        ) {
          return ResolveCursorConnection(pagination, async (connection) => {
            return prisma.modelStateCreator.findMany(connection);
          });
        },
        allModelStateTypes(
          _root,
          { pagination },
          { prisma, ResolveCursorConnection }
        ) {
          return ResolveCursorConnection(pagination, (connection) => {
            return prisma.modelStateType.findMany(connection);
          });
        },
      },
    },
  }
);
