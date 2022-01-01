import { DB_PREPARED, logger, smartListen } from "api-base";
import Fastify from "fastify";
import { ezApp } from "./ez";

const app = Fastify({
  logger,
  pluginTimeout: 10000,
});

app.get("/", (_req, reply) => {
  reply.redirect("/voyager");
});

await Promise.all([DB_PREPARED, app.register(ezApp.fastifyPlugin)]);

await smartListen(app, 8080);
