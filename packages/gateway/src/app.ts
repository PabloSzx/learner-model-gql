import { CreateApp } from "@graphql-ez/fastify";
import { ezAltairIDE } from "@graphql-ez/plugin-altair";
import { ezVoyager } from "@graphql-ez/plugin-voyager";
import { ezWebSockets } from "@graphql-ez/plugin-websockets";
import {
  AltairIDEOptions,
  codegenOptions,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  logger,
  pubSub,
  voyagerOptions,
} from "api-base";
import debounce from "lodash/debounce.js";
import ms from "ms";
import { resolve } from "path";
import { setTimeout } from "timers/promises";
import waitOn from "wait-on";
import { getServicesConfigFromEnv } from "./services";
import { getStitchedSchema } from "./stitch";

export const getGatewayPlugin = async () => {
  const servicesConfig = getServicesConfigFromEnv();

  if (!IS_DEVELOPMENT) {
    logger.info("Waiting for services!");

    await waitOn({
      resources: servicesConfig.map(({ port, href }) => href || `tcp:${port}`),
      timeout: ms("60 seconds"),
    });
  }

  const schema = getStitchedSchema(servicesConfig);

  const outputSchema = resolve(__dirname, "../../../schema.gql");

  const { buildApp } = CreateApp({
    schema,
    ez: {
      plugins: [
        ezVoyager(voyagerOptions),
        IS_DEVELOPMENT &&
          (await import("@graphql-ez/plugin-codegen")).ezCodegen({
            outputSchema,
            config: codegenOptions.config,
          }),
        ezAltairIDE(AltairIDEOptions),
        ezWebSockets("adaptive"),
      ],
    },
    envelop: {
      plugins: [
        IS_PRODUCTION && {
          onPluginInit({ setSchema }) {
            const debounceUpdateStitchedSchema = debounce(
              () => {
                logger.info(`Updating stitched schema!`);
                getStitchedSchema(servicesConfig)
                  .then(setSchema)
                  .catch(logger.error);
              },
              1000,
              {
                leading: false,
                trailing: true,
              }
            );

            keepTrying(async () => {
              for await (const data of pubSub.subscribe("updateGateway")) {
                logger.info(`Update service ${data}`);
                debounceUpdateStitchedSchema();
              }
            });
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

async function keepTrying(fn: () => Promise<void>) {
  while (true) {
    try {
      await fn();
      await setTimeout(1000);
    } catch (err) {
      logger.error(err);
    }
  }
}
