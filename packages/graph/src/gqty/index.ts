import { createLogger } from "@gqty/logger";
import { createReactClient } from "@gqty/react";
import { API_URL } from "common";
import { createClient, QueryFetcher, ResolveOptions } from "gqty";
import { headers } from "../headers";
import {
  generatedSchema,
  GeneratedSchema,
  scalarsEnumsHash,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";

const queryFetcher: QueryFetcher = async function (query, variables) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  });

  const json = await response.json();

  return json;
};

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
  defaults: {
    resolved: {
      refetch: true,
    },
  },
});

export const getGqtyClient = (queryFetcher: QueryFetcher) => {
  const { resolved, ...client } = createClient<
    GeneratedSchema,
    SchemaObjectTypesNames,
    SchemaObjectTypes
  >({
    schema: generatedSchema,
    scalarsEnumsHash,
    queryFetcher,
    defaults: {
      resolved: {
        refetch: true,
        noCache: false,
        retry: false,
      },
    },
    retry: false,
  });

  return {
    ...client,
    resolved<TData>(
      cb: (data: typeof client) => TData,
      opts?: ResolveOptions<TData>
    ) {
      return resolved<TData>(() => cb(client), opts);
    },
  };
};

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  const logger = createLogger(client);

  logger.start();
}

export const {
  query,
  mutation,
  mutate,
  subscription,
  resolved,
  refetch,
  track,
} = client;

export const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: false,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
});

export * from "./schema.generated";

export * from "../headers";
