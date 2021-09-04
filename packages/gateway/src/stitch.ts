import { stitchSchemas } from "@graphql-tools/stitch";
import { getServiceSchema, ServiceSchemaConfig } from "./serviceSchema";

export const getStitchedSchema = async (services: ServiceSchemaConfig[]) => {
  return stitchSchemas({
    subschemas: await Promise.all(services.map(getServiceSchema)),
    mergeTypes: true,
  });
};
