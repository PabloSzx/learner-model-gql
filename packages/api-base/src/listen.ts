import type { FastifyInstance } from "fastify";
import { DB_PREPARED } from "db";
import waitOn from "wait-on";

export async function smartListen(app: FastifyInstance, port: number) {
  const listenPort = process.env.PORT ? parseInt(process.env.PORT) : port;

  await Promise.all([
    waitOn({
      reverse: true,
      resources: ["tcp:" + listenPort],
      timeout: 5000,
    }),
    DB_PREPARED,
  ]);

  await app.listen(listenPort, "0.0.0.0");
}
