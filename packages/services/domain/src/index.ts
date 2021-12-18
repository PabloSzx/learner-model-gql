import { baseServicesList, logger, pubSub, smartListen } from "api-base";
import Fastify from "fastify";
import { buildApp } from "./ez";

const app = Fastify({
  logger,
  pluginTimeout: 30000,
});

const ezApp = buildApp({
  async prepare() {
    await import("./modules/index");
  },
});

app.register(ezApp.fastifyPlugin);

app.ready(async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  await smartListen(app, baseServicesList.domain);

  pubSub.publish("updateGateway", "content");
});
