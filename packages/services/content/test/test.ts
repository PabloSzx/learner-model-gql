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
  assertedQuery,
}: Pick<TestClient, "assertedQuery">) {
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

  const contentResult = await assertedQuery(
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
          binaryFilename: "helloWorld.txt",
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

  const contentId = contentResult?.adminContent.createContent.id;

  assert(contentId);

  expectDeepEqual(contentResult, {
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
  });

  {
    const result = await assertedQuery(
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

    equal(result?.adminContent.allContent.nodes.length, 1);

    expectDeepEqual(result.adminContent.allContent, {
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

    assert(result.adminContent.allContent.nodes[0]?.binaryBase64);

    equal(
      Buffer.from(
        result.adminContent.allContent.nodes[0]?.binaryBase64,
        "base64"
      ).toString("utf-8"),
      "hello world in base64"
    );
  }

  {
    const result = await assertedQuery(
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

    assert(result?.topics.length);

    expectDeepEqual(result, {
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
    });
  }
}
