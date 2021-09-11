import { getStitchedSchema } from "../packages/gateway/src/stitch";
import { CheckActionsCreationRetrieval } from "../packages/services/actions/test/test";
import { CheckContentCreationRetrieval } from "../packages/services/content/test/test";
import {
  CheckDomainCreationRetrieval,
  CheckDomainOfContent,
  CheckDomainsOfProjects,
  CheckTopicsCreationRetrieval,
  CheckKCs,
} from "../packages/services/domain/test/test";
import {
  CheckProjectCreationRetrieval,
  CheckProjectFromContent,
  CheckProjectFromDomainAndTopic,
  CheckProjectFromUser,
} from "../packages/services/projects/test/test";
import { CheckGroups, CheckUsers } from "../packages/services/users/test/test";
import {
  expectDeepEqual,
  GetTestClient,
  gql,
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
      const { contentModule, domainModule, projectModule, kcModule } =
        await import("../packages/services/domain/src/modules");

      registerModule(contentModule);
      registerModule(domainModule);
      registerModule(projectModule);
      registerModule(kcModule);
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

  const UsersService = GetTestClient({
    async prepare({ registerModule }) {
      const { usersModule, groupsModule, projectsModule } = await import(
        "../packages/services/users/src/modules"
      );

      registerModule(groupsModule);
      registerModule(usersModule);
      registerModule(projectsModule);
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
    {
      name: "users",
      href: (await UsersService).origin,
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

    expectDeepEqual(
      await GatewayClient.query(
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

    expectDeepEqual(
      await GatewayClient.gqty.resolved(({ query }) => query.hello),
      "Hello World!"
    );
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

    it.skip("kcs", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckKCs(GatewayClient);
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
    it("domain", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckProjectFromDomainAndTopic(GatewayClient);
    });
    it("user", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckProjectFromUser(GatewayClient);
    });
  });

  describe("users gateway", async () => {
    it("users", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckUsers(GatewayClient);
    });

    it("groups", async () => {
      const { GatewayClient } = await TestStitchedSchema();

      await CheckGroups(GatewayClient);
    });
  });
});
