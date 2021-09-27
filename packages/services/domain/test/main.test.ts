import { expectDeepEqual, HelloDocument } from "testing";
import {
  CheckDomainCreationRetrieval,
  CheckDomainOfContent,
  CheckDomainsOfProjects,
  CheckTopicsCreationRetrieval,
  DomainClient,
} from "./test";

describe("Domain service", () => {
  it("hello world", async () => {
    const { query } = await DomainClient();

    expectDeepEqual(await query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });

  it("domain creation & retrieval", async () => {
    const testClient = await DomainClient();

    await CheckDomainCreationRetrieval(testClient);
  });

  it("topic creation & retrieval", async () => {
    const testClient = await DomainClient();

    await CheckTopicsCreationRetrieval(testClient);
  });

  it("domain of content", async () => {
    const testClient = await DomainClient();

    await CheckDomainOfContent(testClient);
  });

  it("domain of project", async () => {
    const testClient = await DomainClient();

    await CheckDomainsOfProjects(testClient);
  });
});
