import { MockAuthUser } from "api-base";
import {
  assert,
  CreateDomain,
  CreateProject,
  CreateUser,
  equal,
  expectDeepEqual,
  gql,
  prisma,
  TestClient,
} from "testing";

export async function CheckContentCreationRetrieval({
  mutation,
  query,
}: Pick<TestClient, "mutation" | "query">) {
  await prisma.$queryRaw`TRUNCATE "Content","User" CASCADE;`;

  const { project, projectId } = await CreateProject();

  const { authUser } = await CreateUser({ project });

  MockAuthUser.user = authUser;

  const { domain, domainId } = await CreateDomain({
    project,
  });

  const topicId = domain.topics[0]?.id.toString();

  assert(topicId);

  const binaryContent = Buffer.from("hello world in base64", "utf-8");

  const contentResult = await mutation(
    gql(/* GraphQL */ `
      mutation CreateContent($data: CreateContent!) {
        adminContent {
          createContent(data: $data) {
            id
            description
            binaryBase64
            json
          }
        }
      }
    `),
    {
      variables: {
        data: {
          projectId,
          description: "Hello World",
          domainId,
          binaryBase64: binaryContent.toString("base64"),
          json: {
            hello: {
              world: "json",
            },
          },
          topicId,
        },
      },
    }
  );

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
    const result = await query(
      gql(/* GraphQL */ `
        query AllContent($pagination: CursorConnectionArgs!) {
          adminContent {
            allContent(pagination: $pagination) {
              nodes {
                id
                description
                binaryBase64
                json
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      `),
      {
        variables: {
          pagination: {
            first: 10,
          },
        },
      }
    );

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
    const result = await query(
      gql(/* GraphQL */ `
        query ContentFromDomain(
          $ids: [IntID!]!
          $pagination: CursorConnectionArgs!
        ) {
          domains(ids: $ids) {
            id
            content(pagination: $pagination) {
              nodes {
                id
                description
                binaryBase64
                json
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      `),
      {
        variables: {
          ids: [domain.id.toString()],
          pagination: {
            first: 10,
          },
        },
      }
    );

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
    const result = await query(
      gql(/* GraphQL */ `
        query ContentFromTopic(
          $ids: [IntID!]!
          $pagination: CursorConnectionArgs!
        ) {
          topics(ids: $ids) {
            id
            content(pagination: $pagination) {
              nodes {
                id
                description
                binaryBase64
                json
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      `),
      {
        variables: {
          ids: [topicId],
          pagination: {
            first: 10,
          },
        },
      }
    );

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
