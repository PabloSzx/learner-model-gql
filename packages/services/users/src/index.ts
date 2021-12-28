import { baseServicesList, logger, pubSub, smartListen } from "api-base";
import Fastify from "fastify";
import { ezApp } from "./app";

const app = Fastify({
  logger,
  pluginTimeout: 30000,
});

app.register(ezApp.fastifyPlugin);

app.ready(async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  await smartListen(app, baseServicesList.users);

  pubSub.publish("updateGateway", "users");
});
