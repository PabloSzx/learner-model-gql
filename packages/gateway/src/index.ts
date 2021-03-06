import { DB_PREPARED, IS_DEVELOPMENT, logger, smartListen } from "api-base";
import Fastify from "fastify";
import { setTimeout } from "timers/promises";
import { getGatewayPlugin } from "./app";
import type { Subscription } from "./ez.generated";

async function main() {
  const app = Fastify({
    logger,
    pluginTimeout: 30000,
  });

  app.get("/", (_req, reply) => {
    reply.redirect("/voyager");
  });

  await Promise.all([DB_PREPARED, app.register(await getGatewayPlugin())]);

  await smartListen(app, 8080);
}

type PubSubData = { [k in keyof Subscription]: Pick<Subscription, k> };

declare module "pg-gql-pubsub" {
  interface Channels extends PubSubData {}
}

if (IS_DEVELOPMENT) {
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
