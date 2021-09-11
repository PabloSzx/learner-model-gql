import type { FastifyAppOptions, PromiseType } from "@graphql-ez/fastify";
import { CreateTestClient, GlobalTeardown } from "@graphql-ez/fastify-testing";
import { ezServicePreset, MockAuthUser, prisma } from "api-base";
import { deepEqual, equal, strict as assert } from "assert/strict";
import type { UserRole } from "db";
import { generate } from "randomstring";
import { inspect } from "util";

inspect.defaultOptions.depth = null;

after(() => {
  GlobalTeardown();
});

beforeEach(() => {
  MockAuthUser.user = null;
});

export { CreateApp } from "@graphql-ez/fastify";
export * from "@graphql-ez/fastify-testing";
export { prisma } from "api-base";
export type {
  DeepPartial,
  EZContext,
  EZResolvers,
  GetEnvelopedFn,
  PromiseOrValue,
  PromiseType,
} from "graphql-ez";
export * from "graphql-ez/utils";
export { generate } from "randomstring";
export * from "./generated/graphql";
export { MockAuthUser };
export { assert, equal, deepEqual };

export type TestClient = PromiseType<ReturnType<typeof GetTestClient>>;

export const GetTestClient = async ({ ez, ...rest }: FastifyAppOptions) => {
  const TestClient = await CreateTestClient({
    ez: {
      preset: ezServicePreset,
      ...ez,
    },
    ...rest,
  });

  return {
    ...TestClient,
    origin: new URL(TestClient.endpoint).origin,
  };
};

export function expectDeepEqual<T>(
  actual: T,
  expected: T
): asserts actual is T {
  try {
    deepEqual(actual, expected);
  } catch (err) {
    if (err instanceof Error) Error.captureStackTrace(err, expectDeepEqual);
    throw err;
  }
}

export const CreateProject = async () => {
  const project = await prisma.project.create({
    data: {
      code: generate(),
      label: generate(),
    },
  });

  return { project, projectId: project.id.toString() };
};

export const CreateUser = async ({
  project,
  role = "ADMIN",
}: {
  project?: { id: number };
  /**
   * @default "ADMIN"
   */
  role?: UserRole;
} = {}) => {
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
      role,
      projects: project
        ? {
            connect: {
              id: project.id,
            },
          }
        : undefined,
    },
    include: {
      uids: true,
    },
  });

  return {
    user,
    authUser: { sub: userUid, email },
    userId: user.id.toString(),
  };
};

export const CreateDomain = async ({
  project,
}: {
  project: { id: number };
}) => {
  const domain = await prisma.domain.create({
    data: {
      project: {
        connect: {
          id: project.id,
        },
      },
      code: generate(),
      label: generate(),
      topics: {
        create: {
          code: generate(),
          label: generate(),
          project: {
            connect: {
              id: project.id,
            },
          },
        },
      },
    },
    include: {
      topics: true,
      project: true,
    },
  });

  return { domain, domainId: domain.id.toString() };
};

export const CreateEmptyContent = async ({
  project,
  domain,
  topic,
}: {
  project: { id: number };
  domain: { id: number };
  topic?: { id: number };
}) => {
  const content = await prisma.content.create({
    data: {
      description: generate(),
      project: {
        connect: {
          id: project.id,
        },
      },
      domain: {
        connect: {
          id: domain.id,
        },
      },
      topic: topic
        ? {
            connect: {
              id: topic.id,
            },
          }
        : undefined,
    },
    include: {
      domain: true,
      project: true,
      topic: true,
    },
  });

  return { content, contentId: content.id.toString() };
};
