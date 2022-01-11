import { CreateApp } from "@graphql-ez/fastify";

import { ezServicePreset } from "api-base";

// This created the new GraphQL EZ instance, re-using a service preset with tools like GraphQL Codegen, GraphQL Altair and GraphQL Voyager
export const { buildApp, gql, registerModule } = CreateApp({
  ez: {
    preset: ezServicePreset,
  },
});

export * from "api-base";
