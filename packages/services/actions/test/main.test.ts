import {
  AllActionsDocument,
  CreateActionDocument,
  CreateUser,
  deepEqual,
  expectDeepEqual,
  GetTestClient,
  HelloDocument,
  MockAuthUser,
} from "testing";
import { actionModule } from "../src/modules";
import { CheckActionsCreationRetrieval } from "./test";

describe("Actions service", () => {
  it("Hello World", async () => {
    const { query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(actionModule);
      },
    });

    expectDeepEqual(await query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });

  it("actions creation and retrieval", async () => {
    const { mutation, query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(actionModule);
      },
    });

    await CheckActionsCreationRetrieval({
      mutation,
      query,
    });
  });

  describe("authorization", async () => {
    it("create actions without user", async () => {
      const { mutation } = await GetTestClient({
        prepare({ registerModule }) {
          registerModule(actionModule);
        },
      });

      deepEqual(
        await mutation(CreateActionDocument, {
          variables: {
            data: {
              activity: {},
              projectId: "55",
              timestamp: Date.now(),
              verbName: "zxczx",
            },
          },
        }),
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
      const { mutation } = await GetTestClient({
        prepare({ registerModule }) {
          registerModule(actionModule);
        },
      });

      const { authUser } = await CreateUser();

      MockAuthUser.user = authUser;

      deepEqual(
        await mutation(CreateActionDocument, {
          variables: {
            data: {
              activity: {},
              projectId: "55",
              timestamp: Date.now(),
              verbName: "zxczx",
            },
          },
        }),
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
      const { query } = await GetTestClient({
        prepare({ registerModule }) {
          registerModule(actionModule);
        },
      });

      const { authUser } = await CreateUser({ role: "USER" });

      MockAuthUser.user = authUser;

      deepEqual(
        await query(AllActionsDocument, {
          variables: {
            pagination: {
              first: 10,
            },
          },
        }),
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
