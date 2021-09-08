import { CreateApp } from "@graphql-ez/fastify";
import { ezAltairIDE } from "@graphql-ez/plugin-altair";
import { ezCodegen } from "@graphql-ez/plugin-codegen";
import { codegenOptions, getDirname, logger, pubSub } from "api-base";
import ms from "ms";
import { resolve } from "path";
import waitOn from "wait-on";
import { getServicesConfigFromEnv } from "./services";
import { getStitchedSchema } from "./stitch";

const __dirname = getDirname(import.meta.url);

export const getGatewayPlugin = async () => {
  logger.info("Waiting for services!");

  const servicesConfig = getServicesConfigFromEnv();

  await waitOn({
    resources: servicesConfig.map(({ port, href }) => href || `tcp:${port}`),
    timeout: ms("30 seconds"),
  });

  const schema = getStitchedSchema(servicesConfig);

  const outputSchema = resolve(__dirname, "../../../schema.gql");

  const { buildApp } = CreateApp({
    schema,
    ez: {
      plugins: [
        ezCodegen({
          outputSchema,
          config: codegenOptions.config,
        }),
        ezAltairIDE({}),
      ],
    },
    envelop: {
      plugins: [
        {
          async onPluginInit({ setSchema }) {
            for await (const data of await pubSub.subscribe("updateGateway")) {
              logger.info(`Update service ${data}`);
              getStitchedSchema(servicesConfig)
                .then((schema) => {
                  setSchema(schema);
                })
                .catch(console.error);
            }
          },
        },
      ],
    },
    cors: true,
    cache: true,
  });

  const { fastifyPlugin } = buildApp();

  return fastifyPlugin;
};
