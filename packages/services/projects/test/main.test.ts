import { expectDeepEqual, GetTestClient, gql } from "testing";

import {
  contentModule,
  domainModule,
  projectsModule,
  usersModule,
} from "../src/modules";
import {
  CheckProjectCreationRetrieval,
  CheckProjectFromContent,
  CheckProjectFromDomainAndTopic,
  CheckProjectFromUser,
} from "./test";

const ProjectsClient = () =>
  GetTestClient({
    prepare({ registerModule }) {
      registerModule(projectsModule);
      registerModule(contentModule);
      registerModule(domainModule);
      registerModule(usersModule);
    },
  });

describe("Projects service", () => {
  it("hello world", async () => {
    const { query } = await ProjectsClient();

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
    const testClient = await ProjectsClient();

    await CheckProjectCreationRetrieval(testClient);
  });

  it("project from content", async () => {
    const testClient = await ProjectsClient();

    await CheckProjectFromContent(testClient);
  });

  it("project from domain & topic", async () => {
    const testClient = await ProjectsClient();

    await CheckProjectFromDomainAndTopic(testClient);
  });

  it("project from users", async () => {
    const testClient = await ProjectsClient();

    await CheckProjectFromUser(testClient);
  });
});
