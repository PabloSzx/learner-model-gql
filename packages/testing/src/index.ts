import type { FastifyAppOptions } from "@graphql-ez/fastify";
import { CreateTestClient, GlobalTeardown } from "@graphql-ez/fastify-testing";
import { ezServicePreset } from "api-base";
import { deepEqual, equal, strict as assert } from "assert/strict";
import { inspect } from "util";

inspect.defaultOptions.depth = null;

if (typeof after !== "undefined") {
  after(() => {
    GlobalTeardown();
  });
}

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

export { CreateApp } from "@graphql-ez/fastify";
export * from "@graphql-ez/fastify-testing";
export type {
  EZContext,
  EZResolvers,
  PromiseOrValue,
  PromiseType,
  DeepPartial,
  GetEnvelopedFn,
} from "graphql-ez";
export * from "graphql-ez/utils";
export * from "./generated/graphql";
export { assert, equal, deepEqual };
export { prisma } from "api-base";

export function expectDeepEqual<T>(
  actual: T,
  expected: T
): asserts actual is T {
  deepEqual(actual, expected);
}
