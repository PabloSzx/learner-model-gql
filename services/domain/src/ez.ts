import { CreateApp } from "@graphql-ez/fastify";
import { ezServicePreset } from "api-base";

export const { buildApp, gql, registerModule } = CreateApp({
  ez: {
    preset: ezServicePreset,
  },
});
