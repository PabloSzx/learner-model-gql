import type { GraphQLModules } from "@graphql-ez/plugin-modules";
import { stitchSchemas } from "@graphql-tools/stitch";
import { EZApp, ezServicePreset, ServiceName } from "api-base";
import { GraphQLSchema, lexicographicSortSchema } from "graphql";
import { servicesSubschemaConfig } from "../../gateway/src/stitchConfig";

(ezServicePreset.ezPlugins ||= []).forEach((v, index) => {
  if (v && v.name === "GraphQL Codegen") {
    (ezServicePreset.ezPlugins ||= [])[index] = false;
  }
});

async function GetSchema(
  appPromise: Promise<{
    ezApp: EZApp;
    modulesApplication: Promise<GraphQLModules.Application>;
  }>
): Promise<GraphQLSchema> {
  const {
    ezApp: { ready },
    modulesApplication,
  } = await appPromise;

  await ready;

  return (await modulesApplication).createSchemaForApollo();
}

export const subSchemas: Array<[ServiceName, Promise<GraphQLSchema>]> = [
  ["actions", GetSchema(import("../../services/actions/src/app"))],
  ["content", GetSchema(import("../../services/content/src/app"))],
  ["domain", GetSchema(import("../../services/domain/src/app"))],
  ["projects", GetSchema(import("../../services/projects/src/app"))],
  ["state", GetSchema(import("../../services/state/src/app"))],
  ["users", GetSchema(import("../../services/users/src/app"))],
];

export const schema = lexicographicSortSchema(
  stitchSchemas({
    subschemas: await Promise.all(
      subSchemas.map(async ([serviceName, schemaPromise]) => {
        return {
          schema: await schemaPromise,
          ...servicesSubschemaConfig[serviceName],
        };
      })
    ),
  })
);
