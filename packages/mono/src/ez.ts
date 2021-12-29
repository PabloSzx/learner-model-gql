import { ezAltairIDE } from "@graphql-ez/plugin-altair";
import { ezVoyager } from "@graphql-ez/plugin-voyager";
import { ezWebSockets } from "@graphql-ez/plugin-websockets";
import {
  AltairIDEOptions,
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
    ],
  },
  cors: true,
  cache: true,
}).buildApp();
