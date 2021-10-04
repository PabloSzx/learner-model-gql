/* eslint-disable */
import * as graphql from "./graphql";
import { rqGQL } from "rq-gql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    enabled\n    updatedAt\n    locked\n  }\n":
    graphql.UserInfoFragmentDoc,
  "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n":
    graphql.AdminUsersDocument,
  "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateUserDocument,
};

export function gql(
  source: "\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    enabled\n    updatedAt\n    locked\n  }\n"
): typeof documents["\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    enabled\n    updatedAt\n    locked\n  }\n"];
export function gql(
  source: "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"
): typeof documents["\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];

export function gql(source: string): DocumentNode | string;
export function gql(source: string) {
  return (documents as any)[source] || source;
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

export const {
  useGQLQuery,
  useGQLMutation,
  useGQLInfiniteQuery,
  headers,
  useHeadersSnapshot,
  fetchGQL,
  configureRQ,
  getKey,
} = rqGQL();

export * from "./graphql";
