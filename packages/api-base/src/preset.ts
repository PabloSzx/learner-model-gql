import { CreateApp, gql } from "@graphql-ez/fastify";
import { ezAltairIDE } from "@graphql-ez/plugin-altair/static";
import type { CodegenOptions } from "@graphql-ez/plugin-codegen";
import { ezGraphQLModules } from "@graphql-ez/plugin-modules";
import { ezScalars } from "@graphql-ez/plugin-scalars";
import { ezSchema } from "@graphql-ez/plugin-schema";
import { ezVoyager, VoyagerPluginOptions } from "@graphql-ez/plugin-voyager";
import { ezWebSockets } from "@graphql-ez/plugin-websockets";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { IS_DEVELOPMENT } from "common-api";
import { lexicographicSortSchema } from "graphql";
import { AltairIDEOptions } from "./altair";
import { Auth0Verify } from "./auth";
import { ConnectionTypes } from "./connection";
import { buildContext } from "./context";
import { IntID } from "./customScalars";

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
    enumsAsConst: true,
    namingConvention: "keep",
  },
  outputSchema: true,
};

export const voyagerOptions: VoyagerPluginOptions = {
  displayOptions: {
    hideRoot: false,
    showLeafFields: true,
    skipRelay: false,
    skipDeprecated: true,
    sortByAlphabet: true,
  },
};

export const ezServicePreset = CreateApp({
  cors: true,
  ez: {
    plugins: [
      ezAltairIDE(AltairIDEOptions),
      ezWebSockets("new"),
      ezSchema(),
      IS_DEVELOPMENT &&
        (await import("@graphql-ez/plugin-codegen")).ezCodegen(codegenOptions),
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
      ezVoyager(voyagerOptions),
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
              integration.get("/", (_req, reply) => {
                reply.redirect("/voyager");
              });
            },
          };
        },
      },
    ],
  },
  buildContext,
}).asPreset;
