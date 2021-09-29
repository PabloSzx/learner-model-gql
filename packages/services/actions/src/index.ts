import { baseServicesList, logger, pubSub, smartListen } from "api-base";
import Fastify from "fastify";
import { buildApp } from "./ez";

const app = Fastify({
  logger,
});

const ezApp = buildApp({
  async prepare() {
    await import("./modules");
  },
});

app.register(ezApp.fastifyPlugin);

app.ready(async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  await smartListen(app, baseServicesList.actions);

  pubSub.publish("updateGateway", "actions");
});
