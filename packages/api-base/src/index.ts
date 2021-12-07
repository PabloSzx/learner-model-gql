import {
  BuildContextArgs,
  CreateApp,
  gql,
  InferContext,
} from "@graphql-ez/fastify";
import { ezAltairIDE } from "@graphql-ez/plugin-altair/static";
import { CodegenOptions, ezCodegen } from "@graphql-ez/plugin-codegen";
import { ezGraphQLModules } from "@graphql-ez/plugin-modules";
import { ezScalars } from "@graphql-ez/plugin-scalars";
import { ezSchema } from "@graphql-ez/plugin-schema";
import { ezVoyager } from "@graphql-ez/plugin-voyager";
import { ezWebSockets } from "@graphql-ez/plugin-websockets";
import { makeExecutableSchema } from "@graphql-tools/schema";
import assert from "assert/strict";
import { GetDBUser, prisma, pubSub } from "db";
import { lexicographicSortSchema } from "graphql";
import { default as isNumeric } from "validator/lib/isNumeric.js";
import { AltairIDEOptions } from "./altair";
import { Auth0Verify, Authorization, GetAuth0User } from "./auth";
import { ConnectionTypes, ResolveCursorConnection } from "./connection";
import { IntID } from "./customScalars";
import { getIdsIntersection, getNodeIdList } from "./utils";

export * from "@graphql-ez/fastify";
export * from "common-api";
export * from "db";
export { default as isInt } from "validator/lib/isInt.js";
export * from "../../services/list";
export * from "./altair";
export * from "./auth";
export * from "./casters";
export * from "./connection";
export * from "./listen";
export * from "./utils";

async function buildContext({ fastify }: BuildContextArgs) {
  const { Auth0UserPromise } = GetAuth0User(fastify?.request);

  const { UserPromise } = GetDBUser(Auth0UserPromise);

  const authorization = Authorization(UserPromise);

  return {
    UserPromise,
    Auth0UserPromise,
    prisma,
    authorization,
    pubSub,
    ResolveCursorConnection,
    getNodeIdList,
    getIdsIntersection,
    assertNotNumericCode,
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
      Timestamp: "Date",
      Void: "unknown",
      URL: "string",
      EmailAddress: "string",
      JSON: "unknown",
    },
    deepPartialResolvers: true,
    enumsAsTypes: true,
  },
};

export const ezServicePreset = CreateApp({
  cors: true,
  ez: {
    plugins: [
      ezAltairIDE(AltairIDEOptions),
      ezWebSockets("new"),
      ezSchema(),
      ezCodegen(codegenOptions),
      ezGraphQLModules({
        schemaBuilder({ typeDefs, resolvers }) {
          return lexicographicSortSchema(
            makeExecutableSchema({
              typeDefs,
              resolvers,
            })
          );
        },
      }),
      ezScalars(
        {
          DateTime: 1,
          Timestamp: 1,
          JSONObject: 1,
          NonNegativeInt: 1,
          Void: 1,
          URL: 1,
          EmailAddress: 1,
          JSON: 1,
        },
        {
          IntID,
        }
      ),
      ezVoyager({
        displayOptions: {
          hideRoot: false,
          showLeafFields: true,
          skipRelay: false,
          skipDeprecated: true,
          sortByAlphabet: true,
        },
      }),
      {
        name: "LearnerModelGQL",
        compatibilityList: {
          fastify: true,
        },
        onPreBuild(ctx) {
          ctx.appBuilder.registerModule(
            [
              ConnectionTypes,
              gql`
                type Query {
                  "Returns 'Hello World!'"
                  hello: String!
                }

                type Mutation {
                  "Returns 'Hello World!'"
                  hello: String!
                }

                type Subscription {
                  "Emits 'Hello World1', 'Hello World2', 'Hello World3', 'Hello World4' and 'Hello World5'"
                  hello: String!
                }

                "Order ascendingly or descendingly"
                enum ORDER_BY {
                  ASC
                  DESC
                }
              `,
            ],
            {
              id: "Base",
              dirname: import.meta.url,
              resolvers: {
                Query: {
                  hello() {
                    return "Hello World!";
                  },
                },
                Mutation: {
                  hello() {
                    return "Hello World!";
                  },
                },
                Subscription: {
                  hello: {
                    subscribe(_root, _args, { pubSub }) {
                      for (let i = 1; i <= 5; ++i) {
                        setTimeout(() => {
                          pubSub.publish("hello", {
                            hello: "Hello World" + i,
                          });
                        }, 500 * i);
                      }
                      return pubSub.subscribe("hello");
                    },
                  },
                },
              },
            }
          );
        },
        onIntegrationRegister() {
          return {
            fastify({ integration }) {
              integration.register(Auth0Verify);
            },
          };
        },
      },
    ],
  },
  buildContext,
}).asPreset;

export function assertNotNumericCode(value: string | number) {
  if (typeof value !== "string") return;

  assert(!isNumeric(value), `Code "${value}" can't be numeric.`);
}
