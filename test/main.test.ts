import { getStitchedSchema } from "../packages/gateway/src/stitch";
import { actionModule } from "../packages/services/actions/src/modules";
import { CheckActionsCreationRetrieval } from "../packages/services/actions/test/test";
import {
  contentModule,
  domainModule,
} from "../packages/services/content/src/modules";
import { CheckContentCreationRetrieval } from "../packages/services/content/test/test";
import {
  expectDeepEqual,
  GetTestClient,
  HelloDocument,
} from "../packages/testing/src/index";

export const TestStitchedSchema = async () => {
  const ActionService = await GetTestClient({
    prepare({ registerModule }) {
      registerModule(actionModule);
    },
  });

  const ContentService = await GetTestClient({
    prepare({ registerModule }) {
      registerModule(contentModule);
      registerModule(domainModule);
    },
  });

  const stitchedSchema = await getStitchedSchema([
    {
      name: "actions",
      href: ActionService.origin,
    },
    {
      name: "content",
      href: ContentService.origin,
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
});
