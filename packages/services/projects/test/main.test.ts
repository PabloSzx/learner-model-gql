import { expectDeepEqual, gql } from "testing";
import {
  CheckProjectCreationRetrieval,
  CheckProjectFromContent,
  CheckProjectFromDomainAndTopic,
  CheckProjectFromUser,
  TestProjectsClient,
} from "./test";

describe("Projects service", () => {
  it("hello world", async () => {
    const { query } = await TestProjectsClient();

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

  it("project creation & retrieval", async () => {
    const testClient = await TestProjectsClient();

    await CheckProjectCreationRetrieval(testClient);
  });

  it("project from content", async () => {
    const testClient = await TestProjectsClient();

    await CheckProjectFromContent(testClient);
  });

  it("project from domain & topic", async () => {
    const testClient = await TestProjectsClient();

    await CheckProjectFromDomainAndTopic(testClient);
  });

  it("project from users", async () => {
    const testClient = await TestProjectsClient();

    await CheckProjectFromUser(testClient);
  });
});
