/* eslint-disable */
import * as graphql from "./graphql";
import { rqGQL } from "rq-gql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    enabled\n    updatedAt\n    locked\n  }\n":
    graphql.UserInfoFragmentDoc,
  "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateUserDocument,
  "\n  query AdminUsersCards($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n":
    graphql.AdminUsersCardsDocument,
  "\n  fragment Pagination on Connection {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n":
    graphql.PaginationFragmentDoc,
  "\n        query AllProjectsBase($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      ":
    graphql.AllProjectsBaseDocument,
  "\n      mutation CreateDomain($data: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateDomainDocument,
  "\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n":
    graphql.DomainInfoFragmentDoc,
  "\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllDomainsDocument,
  "\n  fragment ProjectInfo on Project {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n":
    graphql.ProjectInfoFragmentDoc,
  "\n  query AllProjects($pagination: CursorConnectionArgs!) {\n    adminProjects {\n      allProjects(pagination: $pagination) {\n        nodes {\n          ...ProjectInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllProjectsDocument,
  "\n      mutation CreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateProjectDocument,
  "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AdminUsersDocument,
};

export function gql(
  source: "\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    enabled\n    updatedAt\n    locked\n  }\n"
): typeof documents["\n  fragment UserInfo on User {\n    __typename\n    id\n    email\n    name\n    active\n    lastOnline\n    createdAt\n    role\n    enabled\n    updatedAt\n    locked\n  }\n"];
export function gql(
  source: "\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateUser($data: UpdateUserInput!) {\n        adminUsers {\n          updateUser(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  query AdminUsersCards($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"
): typeof documents["\n  query AdminUsersCards($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  fragment Pagination on Connection {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n"
): typeof documents["\n  fragment Pagination on Connection {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n"];
export function gql(
  source: "\n        query AllProjectsBase($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllProjectsBase($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "];
export function gql(
  source: "\n      mutation CreateDomain($data: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateDomain($data: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n"
): typeof documents["\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n"];
export function gql(
  source: "\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  fragment ProjectInfo on Project {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n"
): typeof documents["\n  fragment ProjectInfo on Project {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n"];
export function gql(
  source: "\n  query AllProjects($pagination: CursorConnectionArgs!) {\n    adminProjects {\n      allProjects(pagination: $pagination) {\n        nodes {\n          ...ProjectInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllProjects($pagination: CursorConnectionArgs!) {\n    adminProjects {\n      allProjects(pagination: $pagination) {\n        nodes {\n          ...ProjectInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation CreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];

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
