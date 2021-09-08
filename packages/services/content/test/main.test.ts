import { MockAuthUser } from "api-base";
import {
  AllContentDocument,
  assert,
  ContentFromDomainDocument,
  ContentFromTopicDocument,
  CreateContentDocument,
  CreateDomain,
  CreateProject,
  CreateUser,
  equal,
  expectDeepEqual,
  GetTestClient,
  HelloDocument,
  prisma,
  TestClient,
} from "testing";
import { contentModule, domainModule } from "../src/modules";

export async function CheckContentCreationRetrieval({
  mutation,
  query,
}: Pick<TestClient, "mutation" | "query">) {
  await prisma.$queryRaw`TRUNCATE "Content" CASCADE;`;
  await prisma.$queryRaw`TRUNCATE "User" CASCADE;`;

  const { project, projectId } = await CreateProject();

  const { authUser } = await CreateUser({ project });

  MockAuthUser.user = authUser;

  const domain = await CreateDomain({
    project,
  });

  const topicId = domain.topics[0]?.id.toString();

  assert(topicId);

  const binaryContent = Buffer.from("hello world in base64", "utf-8");

  const contentResult = await mutation(CreateContentDocument, {
    variables: {
      data: {
        projectId,
        description: "Hello World",
        domainId: domain.id.toString(),
        binaryBase64: binaryContent.toString("base64"),
        json: {
          hello: {
            world: "json",
          },
        },
        topicId,
      },
    },
  });

  const contentId = contentResult.data?.adminContent.createContent.id;

  assert(contentId);

  expectDeepEqual(contentResult, {
    data: {
      adminContent: {
        createContent: {
          id: contentId,
          description: "Hello World",
          binaryBase64: binaryContent.toString("base64"),
          json: {
            hello: {
              world: "json",
            },
          },
        },
      },
    },
  });

  {
    const result = await query(AllContentDocument, {
      variables: {
        pagination: {
          first: 10,
        },
      },
    });

    equal(result.data?.adminContent.allContent.nodes.length, 1);

    expectDeepEqual(result.data.adminContent.allContent, {
      nodes: [
        {
          id: contentId,
          description: "Hello World",
          binaryBase64: binaryContent.toString("base64"),
          json: {
            hello: {
              world: "json",
            },
          },
        },
      ],
      pageInfo: {
        hasNextPage: false,
      },
    });

    assert(result.data.adminContent.allContent.nodes[0]?.binaryBase64);

    equal(
      Buffer.from(
        result.data.adminContent.allContent.nodes[0]?.binaryBase64,
        "base64"
      ).toString("utf-8"),
      "hello world in base64"
    );
  }

  {
    const result = await query(ContentFromDomainDocument, {
      variables: {
        ids: [domain.id.toString()],
        pagination: {
          first: 10,
        },
      },
    });

    equal(result.errors, undefined);

    assert(result.data?.domains.length);

    expectDeepEqual(result, {
      data: {
        domains: [
          {
            id: domain.id.toString(),
            content: {
              nodes: [
                {
                  id: contentId,
                  description: "Hello World",
                  binaryBase64: binaryContent.toString("base64"),
                  json: {
                    hello: {
                      world: "json",
                    },
                  },
                },
              ],
              pageInfo: {
                hasNextPage: false,
              },
            },
          },
        ],
      },
    });
  }

  {
    const result = await query(ContentFromTopicDocument, {
      variables: {
        ids: [topicId],
        pagination: {
          first: 10,
        },
      },
    });

    equal(result.errors, undefined);

    assert(result.data?.topics.length);

    expectDeepEqual(result, {
      data: {
        topics: [
          {
            id: topicId,
            content: {
              nodes: [
                {
                  id: contentId,
                  description: "Hello World",
                  binaryBase64: binaryContent.toString("base64"),
                  json: {
                    hello: {
                      world: "json",
                    },
                  },
                },
              ],
              pageInfo: {
                hasNextPage: false,
              },
            },
          },
        ],
      },
    });
  }
}

describe("Content service", () => {
  it("Hello World", async () => {
    const { query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
      },
    });

    expectDeepEqual(await query(HelloDocument), {
      data: {
        hello: "Hello World!",
      },
    });
  });

  it("create & retrieve content", async () => {
    const testClient = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
      },
    });

    await CheckContentCreationRetrieval(testClient);
  });

  it("admin authorization", async () => {
    const { query, mutation } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
      },
    });

    {
      const result = await query(AllContentDocument, {
        variables: {
          pagination: {
            first: 10,
          },
        },
      });

      expectDeepEqual(result.errors?.[0]?.message, "Forbidden!");
    }

    {
      const result = await mutation(CreateContentDocument, {
        variables: {
          data: {
            description: "asd",
            domainId: "123",
            projectId: "123",
          },
        },
      });

      expectDeepEqual(result.errors?.[0]?.message, "Forbidden!");
    }
  });

  it("user authorization", async () => {
    const { query } = await GetTestClient({
      prepare({ registerModule }) {
        registerModule(contentModule);
        registerModule(domainModule);
      },
    });

    withoutUser: {
      const result = await query(ContentFromDomainDocument, {
        variables: {
          ids: [],
          pagination: {
            first: 10,
          },
        },
      });

      expectDeepEqual(result.errors?.[0]?.message, "Forbidden!");
    }

    withoutUser: {
      const result = await query(ContentFromTopicDocument, {
        variables: {
          ids: [],
          pagination: {
            first: 10,
          },
        },
      });

      expectDeepEqual(result.errors?.[0]?.message, "Forbidden!");
    }

    const { project } = await CreateProject();
    const domain = await CreateDomain({
      project,
    });

    const { authUser, user } = await CreateUser({
      role: "USER",
      project,
    });

    MockAuthUser.user = authUser;

    withUserAllowedProject: {
      const result = await query(ContentFromDomainDocument, {
        variables: {
          ids: [domain.id.toString()],
          pagination: {
            first: 10,
          },
        },
      });

      expectDeepEqual(result, {
        data: {
          domains: [
            {
              id: domain.id.toString(),
              content: {
                nodes: [],
                pageInfo: {
                  hasNextPage: false,
                },
              },
            },
          ],
        },
      });
    }

    withUserAllowedProject: {
      const result = await query(ContentFromTopicDocument, {
        variables: {
          ids: domain.topics.map((v) => v.id.toString()),
          pagination: {
            first: 10,
          },
        },
      });

      expectDeepEqual(result, {
        data: {
          topics: [
            {
              id: domain.topics[0]?.id.toString()!,
              content: {
                nodes: [],
                pageInfo: {
                  hasNextPage: false,
                },
              },
            },
          ],
        },
      });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        projects: {
          set: [],
        },
      },
      select: null,
    });

    withUserWithoutAllowedProject: {
      const result = await query(ContentFromDomainDocument, {
        variables: {
          ids: [domain.id.toString()],
          pagination: {
            first: 10,
          },
        },
      });

      expectDeepEqual(result, {
        data: {
          domains: [],
        },
      });
    }

    withUserWithoutAllowedProject: {
      const result = await query(ContentFromTopicDocument, {
        variables: {
          ids: domain.topics.map((v) => v.id.toString()),
          pagination: {
            first: 10,
          },
        },
      });

      expectDeepEqual(result, {
        data: {
          topics: [],
        },
      });
    }
  });
});
