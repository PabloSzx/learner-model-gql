import { codegenOptions, servicesListPorts } from "api-base";
import { parse } from "content-type";
import Fastify from "fastify";
import { print } from "graphql";
import ms from "ms";
import { resolve } from "path";
import { request } from "undici";
import waitOn from "wait-on";

import { CreateApp, EZContext } from "@graphql-ez/fastify";
import { ezAltairIDE } from "@graphql-ez/plugin-altair";
import { ezCodegen } from "@graphql-ez/plugin-codegen";
import { stitchSchemas } from "@graphql-tools/stitch";
import { introspectSchema } from "@graphql-tools/wrap";

import type { AsyncExecutor, SubschemaConfig } from "@graphql-tools/delegate";

function getStreamJSON<T>(stream: import("stream").Readable, encoding: BufferEncoding) {
  return new Promise<T>((resolve, reject) => {
    const chunks: Uint8Array[] = [];

    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    stream.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString(encoding || "utf-8")));
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function getServiceSchema([, port]: [name: string, port: number]) {
  const remoteExecutor: AsyncExecutor<Partial<EZContext>> = async function remoteExecutor({
    document,
    variables,
    context,
  }) {
    const query = print(document);

    const authorization = context?.request?.headers.authorization;

    const { body, headers } = await request(`http://localhost:${port}/graphql`, {
      body: JSON.stringify({ query, variables }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
    });

    if (!headers["content-type"]) throw Error("No content-type specified!");

    const { type, parameters } = parse(headers["content-type"]);

    if (type === "application/json")
      return getStreamJSON(body, (parameters["charset"] as BufferEncoding) || "utf-8");

    throw Error("Unexpected content-type, expected 'application/json', received: " + type);
  };

  const serviceSubschema: SubschemaConfig = {
    schema: await introspectSchema(remoteExecutor),
    executor: remoteExecutor,
    // subscriber: remoteSubscriber
  };

  return serviceSubschema;
}

const app = Fastify({
  logger: true,
});

async function main() {
  app.log.info("Waiting for services!");

  const services = Object.entries(servicesListPorts);

  await waitOn({
    resources: services.map(([, port]) => `tcp:${port}`),
    timeout: ms("30 seconds"),
  });

  const schema = stitchSchemas({
    subschemas: await Promise.all(services.map(getServiceSchema)),
  });

  const { buildApp } = CreateApp({
    schema,
    ez: {
      plugins: [
        ezCodegen({
          outputSchema: resolve(__dirname, "../../schema.gql"),
          config: codegenOptions.config,
        }),
        ezAltairIDE({}),
      ],
    },
    cors: true,
  });

  const { fastifyPlugin } = buildApp();

  await app.register(fastifyPlugin);

  await app.listen(8080);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
