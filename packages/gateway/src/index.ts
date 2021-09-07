import { logger } from "api-base";
import Fastify from "fastify";
import { inspect } from "util";
import waitOn from "wait-on";
import { getGatewayPlugin } from "./app";
import type { Subscription } from "./ez.generated";

const app = Fastify({
  logger,
});
inspect.defaultOptions.depth = null;

async function main() {
  await app.register(await getGatewayPlugin());

  await waitOn({
    reverse: true,
    resources: ["tcp:8080"],
    timeout: 5000,
  });
  await app.listen(8080);
}

type PubSubData = { [k in keyof Subscription]: Pick<Subscription, k> };

declare module "pg-gql-pubsub" {
  interface Channels extends PubSubData {}
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
