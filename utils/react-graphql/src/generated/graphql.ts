import { useQuery, UseQueryOptions } from "react-query";
import { fetcher } from "../fetcher";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export const HelloDocument = `
    query hello {
  hello
}
    `;
export const useHelloQuery = <TData = HelloQuery, TError = unknown>(
  variables?: HelloQueryVariables,
  options?: UseQueryOptions<HelloQuery, TError, TData>
) =>
  useQuery<HelloQuery, TError, TData>(
    ["hello", variables],
    fetcher<HelloQuery, HelloQueryVariables>(HelloDocument, variables),
    options
  );
useHelloQuery.document = HelloDocument;

useHelloQuery.getKey = (variables?: HelloQueryVariables) => [
  "hello",
  variables,
];
