import { ENV, logger, smartListen } from "api-base";
import Fastify from "fastify";
import { setTimeout } from "timers/promises";
import { inspect } from "util";
import { getGatewayPlugin } from "./app";
import type { Subscription } from "./ez.generated";

inspect.defaultOptions.depth = null;

async function main() {
  const app = Fastify({
    logger,
  });

  await app.register(await getGatewayPlugin());

  await smartListen(app, 8080);
}

type PubSubData = { [k in keyof Subscription]: Pick<Subscription, k> };

declare module "pg-gql-pubsub" {
  interface Channels extends PubSubData {}
}

if (ENV.IS_DEVELOPMENT) {
  while (true) {
    try {
      await main();
      break;
    } catch (err) {
      console.error(err);

      await setTimeout(500);
    }
  }
} else {
  await main();
}
