import { GetDBUser, prisma } from "db";

import { BuildContextArgs, CreateApp, InferContext } from "@graphql-ez/fastify";
import { ezCodegen, CodegenOptions } from "@graphql-ez/plugin-codegen";
import { ezGraphQLModules } from "@graphql-ez/plugin-modules";
import { ezScalars } from "@graphql-ez/plugin-scalars";
import { ezSchema } from "@graphql-ez/plugin-schema";
import { ezVoyager } from "@graphql-ez/plugin-voyager";

import { Auth0Verify, Authorization, GetAuth0User } from "./auth";
import { IntID } from "./customScalars";
import { ConnectionTypes } from "./connection";

export * from "../../../services";
export * from "./auth";

async function buildContext({ fastify }: BuildContextArgs) {
  const { Auth0UserPromise } = GetAuth0User(fastify?.request);

  const { UserPromise } = GetDBUser(Auth0UserPromise);

  const authorization = Authorization(UserPromise);

  return {
    UserPromise,
    Auth0UserPromise,
    prisma,
    authorization,
  };
}

declare module "graphql-ez" {
  interface EZContext extends InferContext<typeof buildContext> {}
}

export const codegenOptions: CodegenOptions = {
  config: {
    scalars: {
      DateTime: "string | Date",
      ID: "string | number",
      IntID: "number",
      NonNegativeInt: "number",
      JSONObject: "Record<string | number,unknown>",
      Timestamp: "Date",
    },
    deepPartialResolvers: true,
    enumsAsTypes: true,
  },
};

export const ezServicePreset = CreateApp({
  cors: true,
  ez: {
    plugins: [
      ezSchema(),
      ezCodegen(codegenOptions),
      ezGraphQLModules(),
      ezScalars(
        {
          DateTime: 1,
          Timestamp: 1,
          JSONObject: 1,
          NonNegativeInt: 1,
        },
        {
          IntID,
        }
      ),
      ezVoyager(),
      {
        name: "LearnerModelGQL",
        compatibilityList: ["fastify"],
        onPreBuild(ctx) {
          ctx.appBuilder.registerModule(ConnectionTypes);
        },
        onIntegrationRegister(_ctx, integrationCtx) {
          integrationCtx.fastify!.register(Auth0Verify);
        },
      },
    ],
  },
  buildContext,
}).asPreset;

export * from "@graphql-ez/fastify";

export * from "./casters";
export * from "./connection";
