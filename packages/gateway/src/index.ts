import { logger } from "api-base";
import Fastify from "fastify";
import { inspect } from "util";
import { getGatewayPlugin } from "./app";

const app = Fastify({
  logger,
});
inspect.defaultOptions.depth = null;

async function main() {
  await app.register(await getGatewayPlugin());

  await app.listen(8080);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
