import { parse } from "content-type";
import Fastify from "fastify";
import { print } from "graphql";
import ms from "ms";
import { resolve } from "path";
import { request } from "undici";
import waitOn from "wait-on";

import { AsyncExecutor, SubschemaConfig } from "@graphql-tools/delegate";
import { stitchSchemas } from "@graphql-tools/stitch";
import { introspectSchema } from "@graphql-tools/wrap";
import { CreateApp, EnvelopContext } from "@graphql-ez/fastify";

function getStreamJSON<T>(
  stream: import("stream").Readable,
  encoding: BufferEncoding
) {
  return new Promise<T>((resolve, reject) => {
    const chunks: Uint8Array[] = [];

    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    stream.on("end", () => {
      try {
        resolve(
          JSON.parse(Buffer.concat(chunks).toString(encoding || "utf-8"))
        );
      } catch (err) {
        reject(err);
      }
    });
  });
}

const remoteExecutor: AsyncExecutor<Partial<EnvelopContext>> =
  async function remoteExecutor({ document, variables, context }) {
    const query = print(document);

    const authorization = context?.request?.headers.authorization;

    const { body, headers } = await request("http://localhost:3001/graphql", {
      body: JSON.stringify({ query, variables }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
      path: null as any,
    });

    if (!headers["content-type"]) throw Error("No content-type specified!");

    const { type, parameters } = parse(headers["content-type"]);

    if (type === "application/json")
      return getStreamJSON(
        body,
        (parameters["charset"] as BufferEncoding) || "utf-8"
      );

    throw Error(
      "Unexpected content-type, expected 'application/json', received: " + type
    );
  };

const app = Fastify({
  logger: true,
});

async function main() {
  await waitOn({
    resources: ["tcp:3001"],
    timeout: ms("30 seconds"),
  });

  const service1Subschema: SubschemaConfig = {
    schema: await introspectSchema(remoteExecutor),
    executor: remoteExecutor,
    // subscriber: remoteSubscriber
  };

  const schema = stitchSchemas({
    subschemas: [service1Subschema],
  });

  const { buildApp } = CreateApp({
    schema,
    outputSchema: resolve(__dirname, "../../schema.gql"),
    cors: true,
    codegen: {
      onError(err) {
        console.log(8787, err);
      },
    },
  });

  const { plugin } = buildApp();

  await app.register(plugin);

  await app.listen(8080);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
