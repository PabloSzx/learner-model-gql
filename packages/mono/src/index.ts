import { DB_PREPARED, logger, smartListen } from "api-base";
import Fastify from "fastify";
import { ezApp } from "./ez";

if (process.env.CLUSTER_MODE) {
  const { default: cluster } = await import("cluster");

  if (cluster.isPrimary) {
    const { cpus } = await import("os");

    const numCpus = cpus().length;
    const numWorkers = numCpus - 1;
    for (let i = 0; i < numWorkers; ++i) {
      cluster.fork();
    }

    cluster.on("exit", (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    await main();
  }
} else {
  await main();
}

async function main() {
  const app = Fastify({
    logger,
    pluginTimeout: 10000,
  });

  app.get("/", (_req, reply) => {
    reply.redirect("/voyager");
  });

  await Promise.all([DB_PREPARED, app.register(ezApp.fastifyPlugin)]);

  await smartListen(app, 8080);
}
