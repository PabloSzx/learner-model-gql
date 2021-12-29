import { CreateApp } from "@graphql-ez/fastify";

import { ezServicePreset } from "api-base";

export const { buildApp, gql, registerModule, modulesApplication } = CreateApp({
  ez: {
    preset: ezServicePreset,
  },
});
