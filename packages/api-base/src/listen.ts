import type { FastifyInstance } from "fastify";
import { DB_PREPARED } from "db";
import waitOn from "wait-on";
import { IS_DEVELOPMENT } from "common-api";

export async function smartListen(app: FastifyInstance, port: number) {
  const listenPort = process.env.PORT ? parseInt(process.env.PORT) : port;

  await Promise.all([DB_PREPARED]);

  if (IS_DEVELOPMENT) {
    await waitOn({
      resources: ["tcp:" + listenPort],
      reverse: true,
      timeout: 5000,
    });
  }

  await app.listen({
    port: listenPort,
    host: "0.0.0.0",
  });
}
