import { getStitchedSchema } from "../packages/gateway/src/stitch";
import { CheckActionsCreationRetrieval } from "../packages/services/actions/test/test";
import { CheckContentCreationRetrieval } from "../packages/services/content/test/test";
import {
  CheckDomainCreationRetrieval,
  CheckDomainOfContent,
  CheckDomainsOfProjects,
  CheckTopicsCreationRetrieval,
} from "../packages/services/domain/test/test";
import {
  CheckProjectCreationRetrieval,
  CheckProjectFromContent,
} from "../packages/services/projects/test/test";
import {
  expectDeepEqual,
  GetTestClient,
  HelloDocument,
} from "../packages/testing/src/index";

export const TestStitchedSchema = async () => {
  const ActionService = GetTestClient({
    async prepare({ registerModule }) {
      const { actionModule } = await import(
        "../packages/services/actions/src/modules"
      );
      registerModule(actionModule);
    },
  });

  const ContentService = GetTestClient({
    async prepare({ registerModule }) {
      const { contentModule, domainModule } = await import(
        "../packages/services/content/src/modules"
      );
      registerModule(contentModule);
      registerModule(domainModule);
    },
  });

  const DomainService = GetTestClient({
    async prepare({ registerModule }) {
      const { contentModule, domainModule, projectModule } = await import(
        "../packages/services/domain/src/modules"
      );

      registerModule(contentModule);
      registerModule(domainModule);
      registerModule(projectModule);
    },
  });

  const ProjectsService = GetTestClient({
    async prepare({ registerModule }) {
      const { contentModule, domainModule, projectsModule, usersModule } =
        await import("../packages/services/projects/src/modules");

      registerModule(contentModule);
      registerModule(domainModule);
      registerModule(projectsModule);
      registerModule(usersModule);
    },
  });

  const stitchedSchema = await getStitchedSchema([
    {
      name: "actions",
      href: (await ActionService).origin,
    },
    {
      name: "content",
      href: (await ContentService).origin,
    },
    {
      name: "domain",
      href: (await DomainService).origin,
    },
    {
      name: "projects",
      href: (await ProjectsService).origin,
    },
  ]);

  const GatewayClient = await GetTestClient({
    schema: stitchedSchema,
  });

  return {
    GatewayClient,
  };
};

describe("gateway", () => {
  it("Gateway Hello World", async () => {
    const { GatewayClient } = await TestStitchedSchema();

    expectDeepEqual(await GatewayClient.query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });

  it("actions", async () => {
    const { GatewayClient } = await TestStitchedSchema();

    await CheckActionsCreationRetrieval(GatewayClient);
  });

  it("content", async () => {
    const { GatewayClient } = await TestStitchedSchema();

    await CheckContentCreationRetrieval(GatewayClient);
  });

  describe("domain gateway", async () => {
    it("domain", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckDomainCreationRetrieval(GatewayClient);
    });
    it("topics", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckTopicsCreationRetrieval(GatewayClient);
    });
    it("content", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckDomainOfContent(GatewayClient);
    });

    it("projects", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckDomainsOfProjects(GatewayClient);
    });
  });

  describe("projects gateway", async () => {
    it("projects", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckProjectCreationRetrieval(GatewayClient);
    });

    it("content", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckProjectFromContent(GatewayClient);
    });
  });
});
