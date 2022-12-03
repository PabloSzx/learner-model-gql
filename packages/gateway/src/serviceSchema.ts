import type { EZContext } from "@graphql-ez/fastify";
import type { SubschemaConfig } from "@graphql-tools/delegate";
import type { AsyncExecutor } from "@graphql-tools/utils";
import { observableToAsyncIterable } from "@graphql-tools/utils";
import { introspectSchema } from "@graphql-tools/wrap";
import { IS_TEST, logger, ServiceName, IS_DEVELOPMENT } from "api-base";
import { readFile } from "fs/promises";
import { buildSchema, DocumentNode } from "graphql";
import { OperationTypeNode, print } from "graphql";
import { Client as WsClient, createClient as createWsClient } from "graphql-ws";
import type { IncomingHttpHeaders } from "http";
import { resolve } from "path";
import { Client } from "undici";
import ws from "ws";
import { servicesSubschemaConfig } from "./stitchConfig";

export type ServicesSubSchemasConfig = {
  [k in ServiceName]?: Partial<SubschemaConfig>;
};

export type ServiceSchemaConfig = {
  name: ServiceName;
  href?: string;
  port: number;
  config?: ServicesSubSchemasConfig;
};

const DocumentPrintCache = new WeakMap<DocumentNode, string>();

export const ServicesClients: Record<string, Client> = {};
export const WSServicesClients: Record<string, WsClient> = {};

if (typeof after !== "undefined") {
  after(() => {
    Promise.allSettled(Object.values(ServicesClients).map((v) => v.close()));
    Promise.allSettled(
      Object.values(WSServicesClients).map((v) => v.dispose())
    );
  });
}

export function getWsExecutor(
  serviceUrl: URL
): AsyncExecutor<Partial<EZContext>> {
  const wsServiceUrl = new URL(serviceUrl);
  wsServiceUrl.protocol = wsServiceUrl.protocol.replace("http", "ws");

  const subscriptionClient = (WSServicesClients[wsServiceUrl.href] ||=
    createWsClient({
      url: wsServiceUrl.href,
      webSocketImpl: ws,
    }));

  return async ({ document, variables, operationName }) =>
    observableToAsyncIterable({
      subscribe: (observer) => {
        let query = DocumentPrintCache.get(document);

        if (query == null) {
          query = print(document);
          DocumentPrintCache.set(document, query);
        }

        return {
          unsubscribe: subscriptionClient.subscribe(
            {
              query,
              variables: variables as Record<string, any>,
              operationName,
            },
            {
              next: (data) => {
                observer.next && observer.next(data as Record<string, any>);
              },
              error: (err) => {
                if (!observer.error) return;
                if (err instanceof Error) {
                  observer.error(err);
                } else if (Array.isArray(err)) {
                  // GraphQLError[]
                  observer.error(
                    new Error(err.map(({ message }) => message).join(", "))
                  );
                } else {
                  logger.error(err);
                }
              },
              complete: () => observer.complete && observer.complete(),
            }
          ),
        };
      },
    });
}

export async function getServiceSchema({
  name,
  href,
  port,
  config = servicesSubschemaConfig,
}: ServiceSchemaConfig) {
  const serviceUrl = new URL(href || `http://127.0.0.1:${port}/graphql`);

  const pathname = serviceUrl.pathname;

  const client = (ServicesClients[serviceUrl.origin] ||= new Client(
    serviceUrl.origin,
    {
      pipelining: 10,
    }
  ));

  const wsExecutor = getWsExecutor(serviceUrl);

  const remoteExecutor: AsyncExecutor<Partial<EZContext>> =
    async function remoteExecutor(args) {
      const { document, variables, context, operationName, operationType } =
        args;

      if (operationType === OperationTypeNode.SUBSCRIPTION)
        return wsExecutor(args);

      let query = DocumentPrintCache.get(document);

      if (query == null) {
        query = print(document);
        DocumentPrintCache.set(document, query);
      }

      const authorization = context?.request?.headers.authorization;

      const headers: IncomingHttpHeaders = {
        "Content-Type": "application/json",
        authorization,
      };

      if (IS_TEST) {
        const { "auth-email": authEmail, "auth-uid": authUid } =
          context?.request?.headers || {};
        Object.assign(headers, {
          "auth-email": authEmail,
          "auth-uid": authUid,
        });
      }

      const { body } = await client.request({
        path: pathname,
        body: JSON.stringify({ query, variables, operationName }),
        method: "POST",
        headers,
      });

      try {
        return await body.json();
      } catch (err) {
        throw Error(await body.text().catch((err) => err.message));
      }
    };

  const schemaGraphqlFile =
    IS_DEVELOPMENT &&
    (await readFile(
      resolve(__dirname, "../../services/", name, "schema.gql"),
      "utf-8"
    ).catch((err) => {
      console.error(err);
      return null;
    }));

  const schema =
    IS_DEVELOPMENT && schemaGraphqlFile
      ? buildSchema(schemaGraphqlFile)
      : await introspectSchema(remoteExecutor);

  const serviceSubschema: SubschemaConfig = {
    schema,
    executor: remoteExecutor,
    batch: true,
    ...config[name],
  };

  return serviceSubschema;
}
