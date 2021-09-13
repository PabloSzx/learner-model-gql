import { expectDeepEqual, GetTestClient, HelloDocument } from "testing";
import { groupsModule, usersModule } from "../src/modules";
import { CheckUsers } from "./test";

const UsersClient = () => {
  return GetTestClient({
    prepare({ registerModule }) {
      registerModule(groupsModule);
      registerModule(usersModule);
    },
  });
};

describe("Users service", () => {
  it("hello world", async () => {
    const { query } = await UsersClient();

    expectDeepEqual(await query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });

  it("users creation & retrieval", async () => {
    const testClient = await UsersClient();

    await CheckUsers(testClient);
  });
});
