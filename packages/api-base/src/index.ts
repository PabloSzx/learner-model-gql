import { CreateApp, BuildContextArgs, InferContext } from "@graphql-ez/fastify";
import { ezCodegen } from "@graphql-ez/plugin-codegen";
import { ezGraphQLModules } from "@graphql-ez/plugin-modules";
import { ezScalars } from "@graphql-ez/plugin-scalars";
import { ezVoyager } from "@graphql-ez/plugin-voyager";
import { GetDBUser } from "db";
import { GetAuth0User } from "common";

async function buildContext({ fastify }: BuildContextArgs) {
  const { Auth0UserPromise } = GetAuth0User(fastify?.request);

  const { UserPromise } = GetDBUser(Auth0UserPromise);

  return {
    UserPromise,
    Auth0UserPromise,
  };
}

declare module "graphql-ez" {
  interface EZContext extends InferContext<typeof buildContext> {}
}

export const ezServicePreset = CreateApp({
  cors: true,
  ez: {
    plugins: [
      ezCodegen({
        config: {
          scalars: {
            DateTime: "string | Date",
            ID: "string | number",
          },
          deepPartialResolvers: true,
          enumsAsTypes: true,
          onError(err) {
            console.log(3030, err);
          },
        },
      }),
      ezGraphQLModules(),
      ezScalars({
        DateTime: 1,
        Timestamp: 1,
        JSONObject: 1,
      }),
      ezVoyager(),
    ],
  },
  buildContext,
}).asPreset;

export * from "@graphql-ez/fastify";
