import { expectDeepEqual, gql } from "testing";
import { StateTestClient, CheckServiceState } from "./test";

describe("State service", () => {
  it("hello", async () => {
    const { assertedQuery } = await StateTestClient();

    expectDeepEqual(
      await assertedQuery(
        gql(/* GraphQL */ `
          query hello {
            hello
          }
        `)
      ),
      {
        hello: "Hello World!",
      }
    );
  });

  test("basic", async () => {
    await CheckServiceState(await StateTestClient());
  });
});
