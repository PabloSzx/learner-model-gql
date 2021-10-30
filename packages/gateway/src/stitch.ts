import { stitchSchemas } from "@graphql-tools/stitch";
import { lexicographicSortSchema } from "graphql";
import { getServiceSchema, ServiceSchemaConfig } from "./serviceSchema";

export const getStitchedSchema = async (services: ServiceSchemaConfig[]) => {
  return lexicographicSortSchema(
    stitchSchemas({
      subschemas: await Promise.all(services.map(getServiceSchema)),
      mergeTypes: true,
    })
  );
};
