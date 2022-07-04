import type { FastifyInstance } from "fastify";
import { DB_PREPARED } from "db";

export async function smartListen(app: FastifyInstance, port: number) {
  const listenPort = process.env.PORT ? parseInt(process.env.PORT) : port;

  await Promise.all([DB_PREPARED]);

  await app.listen({
    port: listenPort,
    host: "0.0.0.0",
  });
}
