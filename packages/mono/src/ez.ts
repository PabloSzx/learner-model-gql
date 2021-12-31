import { ezAltairIDE } from "@graphql-ez/plugin-altair";
import { ezVoyager } from "@graphql-ez/plugin-voyager";
import { ezWebSockets } from "@graphql-ez/plugin-websockets";
import {
  AltairIDEOptions,
  Auth0Verify,
  buildContext,
  CreateApp,
  voyagerOptions,
} from "api-base";
import { schema } from "./schema";

export const ezApp = CreateApp({
  schema,
  buildContext,
  ez: {
    plugins: [
      ezVoyager(voyagerOptions),
      ezAltairIDE(AltairIDEOptions),
      ezWebSockets("adaptive"),
      {
        name: "Learner Model GQL",
        compatibilityList: {
          fastify: true,
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
  cors: true,
  cache: true,
}).buildApp();
