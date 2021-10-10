import { expectDeepEqual, GetTestClient, gql } from "testing";

import {
  groupsModule,
  projectsModule,
  usersModule,
} from "../src/modules/index";
import { CheckGroups, CheckUsers } from "./test";

const UsersClient = () => {
  return GetTestClient({
    prepare({ registerModule }) {
      registerModule(groupsModule);
      registerModule(usersModule);
      registerModule(projectsModule);
    },
  });
};

describe("Users service", () => {
  it("hello world", async () => {
    const { query } = await UsersClient();

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

  it("users creation & retrieval", async () => {
    const testClient = await UsersClient();

    await CheckUsers(testClient);
  });

  it("groups", async () => {
    const testClient = await UsersClient();

    await CheckGroups(testClient);
  });
});
