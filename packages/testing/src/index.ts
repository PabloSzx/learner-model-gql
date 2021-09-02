import type { FastifyAppOptions } from "@graphql-ez/fastify";
import { CreateTestClient, GlobalTeardown } from "@graphql-ez/fastify-testing";
import { ezServicePreset } from "api-base";
import {
  deepStrictEqual as deepEqual,
  strict as assert,
  strictEqual as equal,
} from "assert";

if (typeof after !== "undefined") {
  after(GlobalTeardown);
}

export const GetTestClient = ({ ez, ...rest }: FastifyAppOptions) => {
  return CreateTestClient({
    ez: {
      preset: ezServicePreset,
      ...ez,
    },
    ...rest,
  });
};

export * from "@graphql-ez/fastify";
export * from "@graphql-ez/fastify-testing";
export { assert, equal, deepEqual };
