import Fastify from "fastify";

import { buildApp } from "./ez";

import { servicesListPorts } from "api-base";

const app = Fastify({
  logger: true,
});

const ezApp = buildApp({
  async prepare() {
    await import("./modules");
  },
});

app.register(ezApp.fastifyPlugin);

app.ready((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  app.listen(servicesListPorts.users);
});
