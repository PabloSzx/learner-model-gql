import {
  CreateActionDocument,
  CreateProject,
  CreateUser,
  expectDeepEqual,
  generate,
  MockAuthUser,
  prisma,
  TestClient,
  gql,
} from "testing";

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
    const data = await mutation(CreateActionDocument, {
      variables: {
        data: {
          activity: {},
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
