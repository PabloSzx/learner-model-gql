import type { FastifyInstance } from "fastify";
import waitOn from "wait-on";

export async function smartListen(app: FastifyInstance, port: number) {
  await waitOn({
    reverse: true,
    resources: ["tcp:" + port],
    timeout: 5000,
  });

  await app.listen(port, "0.0.0.0");
}
