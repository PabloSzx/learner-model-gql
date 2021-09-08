import { MockAuthUser } from "api-base";
import { generate } from "randomstring";
import {
  AllActionsDocument,
  CreateActionDocument,
  deepEqual,
  expectDeepEqual,
  GetTestClient,
  HelloDocument,
  prisma,
} from "testing";
import type {
  QueryFunctionPost,
  QueryFunctionPostGet,
} from "@graphql-ez/client";
import { actionModule } from "../src/modules";

beforeEach(() => {
  MockAuthUser.user = null;
});

export async function CheckActionsCreationRetrieval({
  query,
  mutation,
}: {
  query: QueryFunctionPostGet;
  mutation: QueryFunctionPost;
}) {
  await prisma.$queryRaw`TRUNCATE "Action" CASCADE;`;

  const project = await prisma.project.create({
    data: {
      code: generate(),
      label: generate(),
    },
  });

  const userUid = generate();

  const email = `${generate()}@gmail.com`;

  const user = await prisma.user.create({
    data: {
      email,
      uids: {
        create: {
          uid: userUid,
        },
      },
      role: "ADMIN",
      projects: {
        connect: {
          id: project.id,
        },
      },
    },
    include: {
      uids: true,
    },
  });

  const verbName = generate();

  MockAuthUser.user = {
    sub: userUid,
    email,
  };

  {
    const data = await mutation(CreateActionDocument, {
      variables: {
        data: {
          activity: {},
          projectId: project.id.toString(),
          timestamp: Date.now(),
          verbName,
        },
      },
    });

    expectDeepEqual(data, {
      data: {
        action: null,
      },
    });
  }

  const actions = await query(AllActionsDocument, {
    variables: {
      pagination: {
        first: 20,
      },
    },
  });

  expectDeepEqual(actions, {
    data: {
      adminActions: {
        allActions: {
          nodes: [
            {
              verb: {
                name: verbName,
              },
              user: {
                id: user.id.toString(),
              },
              result: null,
            },
          ],
          pageInfo: {
            hasNextPage: false,
          },
        },
      },
    },
  });
}

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

  it("actions creation and retrieval", async () => {
    const { mutation, query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(actionModule);
      },
    });

    await CheckActionsCreationRetrieval({
      mutation,
      query,
    });
  });

  describe("authorization", async () => {
    it("create actions without user", async () => {
      const { mutation } = await GetTestClient({
        prepare({ registerModule }) {
          registerModule(actionModule);
        },
      });

      deepEqual(
        await mutation(CreateActionDocument, {
          variables: {
            data: {
              activity: {},
              projectId: "55",
              timestamp: Date.now(),
              verbName: "zxczx",
            },
          },
        }),
        {
          data: {
            action: null,
          },
          errors: [
            {
              locations: [
                {
                  column: 3,
                  line: 2,
                },
              ],
              message: "Forbidden!",
              path: ["action"],
            },
          ],
        }
      );
    });

    it("create actions on not assigned project", async () => {
      const { mutation } = await GetTestClient({
        prepare({ registerModule }) {
          registerModule(actionModule);
        },
      });

      const userUid = generate();

      const email = `${generate()}@gmail.com`;

      await prisma.user.create({
        data: {
          email,
          uids: {
            create: {
              uid: userUid,
            },
          },
          role: "ADMIN",
        },
        include: {
          uids: true,
        },
      });

      MockAuthUser.user = {
        sub: userUid,
        email,
      };

      deepEqual(
        await mutation(CreateActionDocument, {
          variables: {
            data: {
              activity: {},
              projectId: "55",
              timestamp: Date.now(),
              verbName: "zxczx",
            },
          },
        }),
        {
          data: {
            action: null,
          },
          errors: [
            {
              locations: [
                {
                  column: 3,
                  line: 2,
                },
              ],
              message: "Forbidden Project!",
              path: ["action"],
            },
          ],
        }
      );
    });

    it("get actions not possible if not admin", async () => {
      const { query } = await GetTestClient({
        prepare({ registerModule }) {
          registerModule(actionModule);
        },
      });

      const userUid = generate();

      const email = `${generate()}@gmail.com`;

      await prisma.user.create({
        data: {
          email,
          uids: {
            create: {
              uid: userUid,
            },
          },
          role: "USER",
        },
        include: {
          uids: true,
        },
      });

      MockAuthUser.user = {
        sub: userUid,
        email,
      };

      deepEqual(
        await query(AllActionsDocument, {
          variables: {
            pagination: {
              first: 10,
            },
          },
        }),
        {
          data: null,
          errors: [
            {
              locations: [
                {
                  column: 3,
                  line: 2,
                },
              ],
              message: "Forbidden",
              path: ["adminActions"],
            },
          ],
        }
      );
    });
  });
});
