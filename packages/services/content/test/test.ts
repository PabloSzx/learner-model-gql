import { MockAuthUser } from "api-base";
import { generate } from "randomstring";
import {
  assert,
  CreateProject,
  CreateTopic,
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

  const topic = await CreateTopic({
    project,
  });

  const topicId = topic.id.toString();

  assert(topicId);

  const binaryContent = Buffer.from("hello world in base64", "utf-8");

  const contentCode = generate();
  const contentLabel = generate();

  const contentResult = await mutation(
    gql(/* GraphQL */ `
      mutation CreateContent($data: CreateContent!) {
        adminContent {
          createContent(data: $data) {
            id
            description
            binaryBase64
            json
            code
            label
          }
        }
      }
    `),
    {
      variables: {
        data: {
          projectId,
          description: "Hello World",
          binaryBase64: binaryContent.toString("base64"),
          json: {
            hello: {
              world: "json",
            },
          },
          topics: [topicId],
          code: contentCode,
          label: contentLabel,
          tags: [],
          kcs: [],
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
          code: contentCode,
          label: contentLabel,
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
        query ContentFromTopic($ids: [IntID!]!) {
          topics(ids: $ids) {
            id
            content {
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
          ids: [topicId],
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
            content: [
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
          },
        ],
      },
    });
  }
}
