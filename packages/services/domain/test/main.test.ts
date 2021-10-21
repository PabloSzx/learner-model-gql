import { expectDeepEqual, gql } from "testing";

import {
  CheckDomainCreationRetrieval,
  CheckDomainsOfProjects,
  CheckKCs,
  CheckTopicsCreationRetrieval,
  DomainClient,
} from "./test";

describe("Domain service", () => {
  it("hello world", async () => {
    const { query } = await DomainClient();

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

  it("domain creation & retrieval", async () => {
    const testClient = await DomainClient();

    await CheckDomainCreationRetrieval(testClient);
  });

  it("topic creation & retrieval", async () => {
    const testClient = await DomainClient();

    await CheckTopicsCreationRetrieval(testClient);
  });

  it("domain of project", async () => {
    const testClient = await DomainClient();

    await CheckDomainsOfProjects(testClient);
  });

  it("kcs", async () => {
    const testClient = await DomainClient();

    await CheckKCs(testClient);
  });
});
