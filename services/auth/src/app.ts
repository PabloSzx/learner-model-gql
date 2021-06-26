import { BuildContextArgs, CreateApp, InferFunctionReturn } from "@graphql-ez/fastify";
import { ezCodegen } from "@graphql-ez/plugin-codegen";
import { ezGraphQLModules } from "@graphql-ez/plugin-modules";
import { ezScalars } from "@graphql-ez/plugin-scalars";
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

export const { buildApp, gql, registerModule } = CreateApp({
  buildContext,
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
      }),
    ],
  },
});

declare module "@graphql-ez/fastify" {
  interface EZContext extends InferFunctionReturn<typeof buildContext> {}
}
