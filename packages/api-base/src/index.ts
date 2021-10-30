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
import { GetDBUser, prisma, pubSub } from "db";
import { lexicographicSortSchema } from "graphql";
import { AltairIDEOptions } from "./altair";
import { Auth0Verify, Authorization, GetAuth0User } from "./auth";
import { ConnectionTypes } from "./connection";
import { IntID } from "./customScalars";

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
export * from "./logger";
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
        },
        {
          IntID,
        }
      ),
      ezVoyager(),
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
                  hello: String!
                }

                type Mutation {
                  hello: String!
                }

                type Subscription {
                  hello: String!
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
