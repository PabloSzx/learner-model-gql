import { baseServicesList, logger, pubSub, smartListen } from "api-base";
import Fastify from "fastify";
import { buildApp } from "./ez";

// This creates the new web server
const app = Fastify({
  logger,
  pluginTimeout: 30000,
});

// This builds the GraphQL EZ API
const ezApp = buildApp({
  async prepare() {
    // This will add the new expected gql api modules
    await import("./modules/index");
  },
});

app.register(ezApp.fastifyPlugin);

app.ready(async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // This will listen on the expected port, considering development mode and environment variables.
  await smartListen(app, baseServicesList.contentSelection);

  // This will notify the gateway to re-introspect all the services, and detect possible changes
  pubSub.publish("updateGateway", "contentSelection");
});
