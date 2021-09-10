import { expectDeepEqual, GetTestClient, HelloDocument } from "testing";
import { contentModule, domainModule, projectModule } from "../src/modules";
import {
  CheckDomainCreationRetrieval,
  CheckDomainOfContent,
  CheckDomainsOfProjects,
  CheckTopicsCreationRetrieval,
} from "./test";
describe("Domain service", () => {
  it("hello world", async () => {
    const { query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(projectModule);
      },
    });

    expectDeepEqual(await query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });

  it("domain creation & retrieval", async () => {
    const testClient = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(projectModule);
      },
    });

    await CheckDomainCreationRetrieval(testClient);
  });

  it("topic creation & retrieval", async () => {
    const testClient = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(projectModule);
      },
    });

    await CheckTopicsCreationRetrieval(testClient);
  });

  it("domain of content", async () => {
    const testClient = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(projectModule);
      },
    });

    await CheckDomainOfContent(testClient);
  });

  it("domain of project", async () => {
    const testClient = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
        registerModule(projectModule);
      },
    });

    await CheckDomainsOfProjects(testClient);
  });
});
