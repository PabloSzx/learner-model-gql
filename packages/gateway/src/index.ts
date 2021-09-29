import { logger, smartListen } from "api-base";
import Fastify from "fastify";
import { inspect } from "util";
import { getGatewayPlugin } from "./app";
import type { Subscription } from "./ez.generated";

const app = Fastify({
  logger,
});
inspect.defaultOptions.depth = null;

async function main() {
  await app.register(await getGatewayPlugin());

  await smartListen(app, 8080);
}

type PubSubData = { [k in keyof Subscription]: Pick<Subscription, k> };

declare module "pg-gql-pubsub" {
  interface Channels extends PubSubData {}
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
