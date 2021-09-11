import { baseServicesList, ServiceName } from "api-base";
import type { ServiceSchemaConfig } from "./serviceSchema";
import { servicesSubschemaConfig } from "./stitchConfig";

export const getServicesConfigFromEnv = () => {
  const services = Object.entries(baseServicesList) as Array<
    [ServiceName, number]
  >;

  const servicesConfig: ServiceSchemaConfig[] = services.map(([name, port]) => {
    const href = process.env[`${name.toString()}_URL`];

    return {
      config: servicesSubschemaConfig,
      name,
      port,
      href,
    };
  });

  return servicesConfig;
};
