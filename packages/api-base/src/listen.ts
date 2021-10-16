import type { FastifyInstance } from "fastify";
import { DB_PREPARED } from "db";
import waitOn from "wait-on";

export async function smartListen(app: FastifyInstance, port: number) {
  await Promise.all([
    waitOn({
      reverse: true,
      resources: ["tcp:" + port],
      timeout: 5000,
    }),
    DB_PREPARED,
  ]);

  await app.listen(port, "0.0.0.0");
}
