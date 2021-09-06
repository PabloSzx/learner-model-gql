import { baseServicesList, logger, pubSub } from "api-base";
import Fastify from "fastify";
import waitOn from "wait-on";
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

  await waitOn({
    reverse: true,
    resources: ["tcp:" + baseServicesList.users],
    timeout: 5000,
  });

  await app.listen(baseServicesList.users);

  pubSub.publish("users", "updateGateway");
});
