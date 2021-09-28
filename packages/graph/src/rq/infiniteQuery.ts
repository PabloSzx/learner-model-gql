import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
} from "react-query";

import { fetcher } from "./fetcher";

interface UseQueryFn<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
> {
  (variables: TVariables, options?: UseQueryOptions<TData>): unknown;
  document: string;
  getKey: (variables: TVariables) => unknown[];
}

export function useInfiniteGraphQLQuery<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
>(
  useQuery: UseQueryFn<TData, TVariables>,
  getVariables: ({ pageParam }: { pageParam?: string }) => TVariables,
  options?: UseInfiniteQueryOptions<TData, Error>
): UseInfiniteQueryResult<TData, Error> {
  return useInfiniteQuery<TData, Error, TData>(
    useQuery.getKey(getVariables({})),
    ({ pageParam }) =>
      fetcher<TData, TVariables>(
        useQuery.document,
        getVariables({ pageParam })
      )(),
    options
  );
}
