import { MockAuthUser } from "api-base";
import {
  CreateProject,
  CreateTopic,
  CreateUser,
  expectDeepEqual,
  gql,
  prisma,
} from "testing";
import { CheckContentCreationRetrieval, ContentTestClient } from "./test";

describe("Content service", () => {
  it("Hello World", async () => {
    const { query } = await ContentTestClient();

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

  it("create & retrieve content", async () => {
    const testClient = await ContentTestClient();

    await CheckContentCreationRetrieval(testClient);
  });

  it("admin authorization", async () => {
    const { query, mutation } = await ContentTestClient();

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

      expectDeepEqual(result.errors?.[0]?.message, "Forbidden!");
    }

    {
      const result = await mutation(
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
              description: "asd",
              projectId: "123",
              code: "asd",
              label: "asd",
              topics: [],
              tags: [],
              kcs: [],
            },
          },
        }
      );

      expectDeepEqual(result.errors?.[0]?.message, "Forbidden!");
    }
  });

  it("user authorization", async () => {
    const { query } = await ContentTestClient();

    withoutUser: {
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
            ids: [],
          },
        }
      );

      expectDeepEqual(result.errors?.[0]?.message, "Forbidden!");
    }

    const { project } = await CreateProject();

    const topic = await CreateTopic({
      project,
    });

    const { authUser, user } = await CreateUser({
      role: "USER",
      project,
    });

    MockAuthUser.user = authUser;

    withUserAllowedProject: {
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
            ids: [topic.id.toString()],
          },
        }
      );

      expectDeepEqual(result, {
        data: {
          topics: [
            {
              id: topic.id.toString(),
              content: [],
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
            ids: [topic.id.toString()],
          },
        }
      );

      expectDeepEqual(result.errors?.[0]?.message, topic.id + " not found!");
    }
  });
});
