import { expectDeepEqual, GetTestClient, HelloDocument } from "testing";
import {
  contentModule,
  domainModule,
  projectsModule,
  usersModule,
} from "../src/modules";
import { CheckProjectCreationRetrieval, CheckProjectFromContent } from "./test";

describe("Projects service", () => {
  it("hello world", async () => {
    const { query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(projectsModule);
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(usersModule);
      },
    });

    expectDeepEqual(await query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });

  it("project creation & retrieval", async () => {
    const testClient = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(projectsModule);
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(usersModule);
      },
    });

    await CheckProjectCreationRetrieval(testClient);
  });

  it("project from content", async () => {
    const testClient = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(projectsModule);
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(usersModule);
      },
    });

    await CheckProjectFromContent(testClient);
  });
});
