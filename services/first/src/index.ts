import Fastify from "fastify";

import { Auth0Verify } from "common";

import { plugin } from "./app";

const app = Fastify({
  logger: true,
});

(async () => {
  await app.register(Auth0Verify);

  await app.register(plugin);

  app.listen(3001);
})();
