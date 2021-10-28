import {
  CreateProject,
  CreateUser,
  expectDeepEqual,
  generate,
  GetTestClient,
  gql,
  MockAuthUser,
  prisma,
  TestClient,
} from "testing";
import { actionModule, projectsModule } from "../src/modules/index";

export const ActionsTestClient = () =>
  GetTestClient({
    prepare({ registerModule }) {
      registerModule(actionModule);
      registerModule(projectsModule);
    },
  });

export const CreateActionDoc = gql(/* GraphQL */ `
  mutation CreateAction($data: ActionInput!) {
    action(data: $data)
  }
`);

export async function CheckActionsCreationRetrieval({
  query,
  mutation,
}: Pick<TestClient, "query" | "mutation">) {
  await prisma.$queryRaw`TRUNCATE "Action" CASCADE;`;

  const { project, projectId } = await CreateProject();

  const { authUser, userId } = await CreateUser({ project });

  const verbName = generate();

  MockAuthUser.user = authUser;

  {
    const data = await mutation(CreateActionDoc, {
      variables: {
        data: {
          projectId,
          timestamp: Date.now(),
          verbName,
        },
      },
    });

    expectDeepEqual(data, {
      data: {
        action: null,
      },
    });
  }

  const actions = await query(
    gql(/* GraphQL */ `
      query AllActions($pagination: CursorConnectionArgs!) {
        adminActions {
          allActions(pagination: $pagination) {
            nodes {
              verb {
                name
              }
              result
              user {
                id
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `),
    {
      variables: {
        pagination: {
          first: 20,
        },
      },
    }
  );

  expectDeepEqual(actions, {
    data: {
      adminActions: {
        allActions: {
          nodes: [
            {
              verb: {
                name: verbName,
              },
              user: {
                id: userId,
              },
              result: null,
            },
          ],
          pageInfo: {
            hasNextPage: false,
          },
        },
      },
    },
  });
}

export async function CheckProjectActions({
  assertedQuery,
}: Pick<TestClient, "assertedQuery">) {
  await prisma.$queryRaw`TRUNCATE "Action", "Project" CASCADE;`;

  const { project, projectId } = await CreateProject();

  const { authUser, userId } = await CreateUser({ project });

  const verbName = generate();

  MockAuthUser.user = authUser;

  await assertedQuery(CreateActionDoc, {
    variables: {
      data: {
        projectId,
        timestamp: Date.now(),
        verbName,
      },
    },
  });

  const result = await assertedQuery(
    gql(/* GraphQL */ `
      query ProjectActions(
        $projectId: IntID!
        $pagination: CursorConnectionArgs!
        $filters: ProjectActionsFilter
      ) {
        projects(ids: [$projectId]) {
          id
          actions(pagination: $pagination, filters: $filters) {
            nodes {
              id
              verb {
                name
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `),
    {
      variables: {
        projectId,
        pagination: {
          first: 10,
        },
        filters: {
          users: [userId],
          verbNames: [verbName],
        },
      },
    }
  );

  expectDeepEqual(result, {
    projects: [
      {
        id: projectId,
        actions: {
          nodes: [
            {
              id: result.projects[0]?.actions.nodes[0]?.id!,
              verb: {
                name: verbName,
              },
            },
          ],
          pageInfo: {
            hasNextPage: false,
          },
        },
      },
    ],
  });
}
