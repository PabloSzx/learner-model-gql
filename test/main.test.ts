import { getStitchedSchema } from "../packages/gateway/src/stitch";
import { actionModule } from "../packages/services/actions/src/modules";
import {
  expectDeepEqual,
  GetTestClient,
  HelloDocument,
} from "../packages/testing/src/index";

describe("gateway", () => {
  it("Gateway Hello World", async () => {
    const ActionService = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(actionModule);
      },
    });

    const stitchedSchema = await getStitchedSchema([
      {
        name: "actions",
        href: ActionService.origin,
      },
    ]);

    const GatewayClient = await GetTestClient({
      schema: stitchedSchema,
    });

    expectDeepEqual(await GatewayClient.query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });
});
