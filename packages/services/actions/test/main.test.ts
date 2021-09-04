import { expectDeepEqual, GetTestClient, HelloDocument } from "testing";
import { actionModule } from "../src/modules";

describe("Actions service", () => {
  it("Hello World", async () => {
    const { query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(actionModule);
      },
    });

    expectDeepEqual(await query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });
});
