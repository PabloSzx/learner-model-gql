import { getServicesConfigFromEnv } from "./services";
import waitOn from "wait-on";
import { logger, codegenOptions, getDirname } from "api-base";
import ms from "ms";
import { getStitchedSchema } from "./stitch";
import { CreateApp } from "@graphql-ez/fastify";
import { ezCodegen } from "@graphql-ez/plugin-codegen";
import { ezAltairIDE } from "@graphql-ez/plugin-altair";
import { resolve } from "path";

const __dirname = getDirname(import.meta.url);

export const getGatewayPlugin = async () => {
  logger.info("Waiting for services!");

  const servicesConfig = getServicesConfigFromEnv();

  await waitOn({
    resources: servicesConfig.map(({ port, href }) => href || `tcp:${port}`),
    timeout: ms("30 seconds"),
  });

  const schema = getStitchedSchema(servicesConfig);

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
    cache: true,
  });

  const { fastifyPlugin } = buildApp();

  return fastifyPlugin;
};
