import type { GraphQLModules } from "@graphql-ez/plugin-modules";
import { stitchSchemas } from "@graphql-tools/stitch";
import type { Executor } from "@graphql-tools/utils";
import { EZApp, EZContext, ezServicePreset, PromiseOrValue } from "api-base";
import {
  ExecutionResult,
  lexicographicSortSchema,
  OperationTypeNode,
} from "graphql";
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
) {
  const {
    ezApp: { ready },
    modulesApplication,
  } = await appPromise;

  await ready;

  return modulesApplication;
}

export const subSchemas = [
  ["actions", GetSchema(import("../../services/actions/src/app"))],
  ["content", GetSchema(import("../../services/content/src/app"))],
  ["domain", GetSchema(import("../../services/domain/src/app"))],
  ["projects", GetSchema(import("../../services/projects/src/app"))],
  ["state", GetSchema(import("../../services/state/src/app"))],
  ["users", GetSchema(import("../../services/users/src/app"))],
] as const;

export const schema = lexicographicSortSchema(
  stitchSchemas({
    subschemas: await Promise.all(
      subSchemas.map(async ([serviceName, appPromise]) => {
        const { createExecution, createSubscription, schema } =
          await appPromise;

        const execute = createExecution();
        const subscribe = createSubscription();

        const executor: Executor<Partial<EZContext>> = ({
          operationType,
          document,
          context: contextValue,
          rootValue,
          variables,
          operationName,
        }) => {
          if (operationType === OperationTypeNode.SUBSCRIPTION) {
            return subscribe({
              document,
              schema,
              contextValue,
              rootValue,
              variableValues: variables as Record<string, any>,
              operationName,
            }) as Promise<
              | ExecutionResult<any>
              | AsyncGenerator<ExecutionResult<any, any>, void, void>
            >;
          }
          return execute({
            document,
            schema,
            contextValue,
            rootValue,
            operationName,
            variableValues: variables as Record<string, any>,
          }) as PromiseOrValue<ExecutionResult<any, any>>;
        };

        return {
          schema,
          executor,
          batch: true,
          ...servicesSubschemaConfig[serviceName],
        };
      })
    ),
    mergeTypes: true,
  })
);
