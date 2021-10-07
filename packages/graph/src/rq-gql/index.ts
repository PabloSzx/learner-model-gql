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
  "\n        query AllGroupsBase($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allGroups(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      ":
    graphql.AllGroupsBaseDocument,
  "\n  fragment Pagination on Connection {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n":
    graphql.PaginationFragmentDoc,
  "\n        query AllProjectsBase($pagination: CursorConnectionArgs!) {\n          adminProjects {\n            allProjects(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      ":
    graphql.AllProjectsBaseDocument,
  "\n      mutation CreateDomain($data: CreateDomain!) {\n        adminDomain {\n          createDomain(input: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateDomainDocument,
  "\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    project {\n      id\n      code\n      label\n    }\n  }\n":
    graphql.DomainInfoFragmentDoc,
  "\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllDomainsDocument,
  "\n      mutation UpdateDomain($data: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateDomainDocument,
  "\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    projects {\n      id\n      code\n      label\n    }\n    users {\n      id\n      email\n      name\n      role\n      active\n      lastOnline\n    }\n  }\n":
    graphql.GroupInfoFragmentDoc,
  "\n  query AllGroups($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allGroups(pagination: $pagination) {\n        nodes {\n          ...GroupInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllGroupsDocument,
  "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateGroupDocument,
  "\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.SetUserGroupsDocument,
  "\n      mutation UpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateGroupDocument,
  "\n  fragment ProjectInfo on Project {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n  }\n":
    graphql.ProjectInfoFragmentDoc,
  "\n  query AllProjects($pagination: CursorConnectionArgs!) {\n    adminProjects {\n      allProjects(pagination: $pagination) {\n        nodes {\n          ...ProjectInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AllProjectsDocument,
  "\n      mutation CreateProject($data: CreateProject!) {\n        adminProjects {\n          createProject(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    ":
    graphql.CreateProjectDocument,
  "\n      mutation UpdateProject($data: UpdateProject!) {\n        adminProjects {\n          updateProject(data: $data) {\n            __typename\n          }\n        }\n      }\n    ":
    graphql.UpdateProjectDocument,
  "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n":
    graphql.AdminUsersDocument,
  "\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectId: IntID!\n      ) {\n        adminUsers {\n          upsertUsersWithProject(emails: $emails, projectId: $projectId) {\n            ...UserInfo\n          }\n        }\n      }\n    ":
    graphql.UpsertUsersWithProjectsDocument,
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
  source: "\n        query AllGroupsBase($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allGroups(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "
): typeof documents["\n        query AllGroupsBase($pagination: CursorConnectionArgs!) {\n          adminUsers {\n            allGroups(pagination: $pagination) {\n              nodes {\n                id\n                code\n                label\n              }\n              ...Pagination\n            }\n          }\n        }\n      "];
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
  source: "\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    project {\n      id\n      code\n      label\n    }\n  }\n"
): typeof documents["\n  fragment DomainInfo on Domain {\n    __typename\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    project {\n      id\n      code\n      label\n    }\n  }\n"];
export function gql(
  source: "\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllDomains($pagination: CursorConnectionArgs!) {\n    adminDomain {\n      allDomains(pagination: $pagination) {\n        nodes {\n          ...DomainInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation UpdateDomain($data: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateDomain($data: UpdateDomain!) {\n        adminDomain {\n          updateDomain(input: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    projects {\n      id\n      code\n      label\n    }\n    users {\n      id\n      email\n      name\n      role\n      active\n      lastOnline\n    }\n  }\n"
): typeof documents["\n  fragment GroupInfo on Group {\n    id\n    code\n    label\n    updatedAt\n    createdAt\n    projects {\n      id\n      code\n      label\n    }\n    users {\n      id\n      email\n      name\n      role\n      active\n      lastOnline\n    }\n  }\n"];
export function gql(
  source: "\n  query AllGroups($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allGroups(pagination: $pagination) {\n        nodes {\n          ...GroupInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AllGroups($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allGroups(pagination: $pagination) {\n        nodes {\n          ...GroupInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation CreateGroup($data: CreateGroupInput!) {\n        adminUsers {\n          createGroup(data: $data) {\n            id\n            label\n            code\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation SetUserGroups(\n        $usersEmails: [EmailAddress!]!\n        $groupIds: [IntID!]!\n      ) {\n        adminUsers {\n          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n      mutation UpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateGroup($data: UpdateGroupInput!) {\n        adminUsers {\n          updateGroup(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];
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
  source: "\n      mutation UpdateProject($data: UpdateProject!) {\n        adminProjects {\n          updateProject(data: $data) {\n            __typename\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpdateProject($data: UpdateProject!) {\n        adminProjects {\n          updateProject(data: $data) {\n            __typename\n          }\n        }\n      }\n    "];
export function gql(
  source: "\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"
): typeof documents["\n  query AdminUsers($pagination: CursorConnectionArgs!) {\n    adminUsers {\n      allUsers(pagination: $pagination) {\n        nodes {\n          ...UserInfo\n        }\n        ...Pagination\n      }\n    }\n  }\n"];
export function gql(
  source: "\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectId: IntID!\n      ) {\n        adminUsers {\n          upsertUsersWithProject(emails: $emails, projectId: $projectId) {\n            ...UserInfo\n          }\n        }\n      }\n    "
): typeof documents["\n      mutation UpsertUsersWithProjects(\n        $emails: [EmailAddress!]!\n        $projectId: IntID!\n      ) {\n        adminUsers {\n          upsertUsersWithProject(emails: $emails, projectId: $projectId) {\n            ...UserInfo\n          }\n        }\n      }\n    "];

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
