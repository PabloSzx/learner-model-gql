import Fastify from "fastify";

import { Auth0Verify } from "common";

import { buildApp } from "./app";

const app = Fastify({
  logger: true,
});

(async () => {
  await app.register(Auth0Verify);

  const EnvelopApp = buildApp({
    async prepare() {
      await import("./modules");
    },
  });

  await app.register(EnvelopApp.fastifyPlugin);

  app.listen(3001);
})();
