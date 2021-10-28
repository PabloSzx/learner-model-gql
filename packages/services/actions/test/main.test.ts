import {
  CreateProject,
  CreateUser,
  deepEqual,
  expectDeepEqual,
  gql,
  MockAuthUser,
} from "testing";
import {
  ActionsTestClient,
  CheckActionsCreationRetrieval,
  CheckProjectActions,
} from "./test";

describe("Actions service", () => {
  it("Hello World", async () => {
    const { query } = await ActionsTestClient();

    expectDeepEqual(
      await query(
        gql(/* GraphQL */ `
          query hello {
            hello
          }
        `)
      ),
      {
        data: {
          hello: "Hello World!",
        },
      }
    );
  });

  it("actions creation and retrieval", async () => {
    const { mutation, query } = await ActionsTestClient();

    await CheckActionsCreationRetrieval({
      mutation,
      query,
    });
  });

  it("projects actions", async () => {
    const test = await ActionsTestClient();

    await CheckProjectActions(test);
  });

  describe("authorization", async () => {
    it("create actions without user", async () => {
      const { mutation } = await ActionsTestClient();

      deepEqual(
        await mutation(
          gql(/* GraphQL */ `
            mutation CreateAction($data: ActionInput!) {
              action(data: $data)
            }
          `),
          {
            variables: {
              data: {
                projectId: "55",
                timestamp: Date.now(),
                verbName: "zxczx",
              },
            },
          }
        ),
        {
          data: {
            action: null,
          },
          errors: [
            {
              locations: [
                {
                  column: 3,
                  line: 2,
                },
              ],
              message: "Forbidden!",
              path: ["action"],
            },
          ],
        }
      );
    });

    it("create actions on not assigned project", async () => {
      const { mutation } = await ActionsTestClient();

      const { authUser } = await CreateUser({
        role: "USER",
      });

      MockAuthUser.user = authUser;

      const otherProject = await CreateProject();

      deepEqual(
        await mutation(
          gql(/* GraphQL */ `
            mutation CreateAction($data: ActionInput!) {
              action(data: $data)
            }
          `),
          {
            variables: {
              data: {
                projectId: otherProject.projectId,
                timestamp: Date.now(),
                verbName: "zxczx",
              },
            },
          }
        ),
        {
          data: {
            action: null,
          },
          errors: [
            {
              locations: [
                {
                  column: 3,
                  line: 2,
                },
              ],
              message: "Forbidden Project!",
              path: ["action"],
            },
          ],
        }
      );
    });

    it("get actions not possible if not admin", async () => {
      const { query } = await ActionsTestClient();

      const { authUser } = await CreateUser({ role: "USER" });

      MockAuthUser.user = authUser;

      deepEqual(
        await query(
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
                first: 10,
              },
            },
          }
        ),
        {
          data: null,
          errors: [
            {
              locations: [
                {
                  column: 3,
                  line: 2,
                },
              ],
              message: "Forbidden",
              path: ["adminActions"],
            },
          ],
        }
      );
    });
  });
});
