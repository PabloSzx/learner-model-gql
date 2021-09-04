import { deepEqual, GetTestClient } from "testing";
import { actionModule } from "../src/modules";

describe("Actions service", () => {
  it("Hello World", async () => {
    const { query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(actionModule);
      },
    });

    deepEqual(await query("{hello}"), {
      data: {
        hello: "Hello World!",
      },
    });
  });
});
