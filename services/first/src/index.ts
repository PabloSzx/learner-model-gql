import Fastify from "fastify";
import { plugin } from "./app";

const app = Fastify({
  logger: true,
});

app.register(plugin);

app.listen(3001);
