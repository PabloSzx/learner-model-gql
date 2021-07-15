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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** ID that parses as non-negative integer, serializes to string, and can be passed as string or number */
  IntID: string;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, unknown>;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: number;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** Represents NULL values */
  Void: void | undefined | null;
};

export type Action = {
  __typename?: "Action";
  id: Scalars["IntID"];
  verb: ActionVerb;
  activity: ActionActivity;
  timestamp: Scalars["Timestamp"];
  result?: Maybe<Scalars["Float"]>;
  user?: Maybe<User>;
};

export type ActionActivity = {
  __typename?: "ActionActivity";
  id: Scalars["IntID"];
  content?: Maybe<Content>;
  topic?: Maybe<Topic>;
  stepID?: Maybe<Scalars["ID"]>;
  hintID?: Maybe<Scalars["ID"]>;
  amount?: Maybe<Scalars["Float"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
};

export type ActionActivityInput = {
  contentID?: Maybe<Scalars["IntID"]>;
  topicID?: Maybe<Scalars["IntID"]>;
  stepID?: Maybe<Scalars["ID"]>;
  hintID?: Maybe<Scalars["ID"]>;
  amount?: Maybe<Scalars["Float"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
};

export type ActionInput = {
  activity: ActionActivityInput;
  verbName: Scalars["String"];
  timestamp: Scalars["Timestamp"];
  projectId: Scalars["IntID"];
};

export type ActionVerb = {
  __typename?: "ActionVerb";
  id: Scalars["IntID"];
  name: Scalars["String"];
};

export type ActionsConnection = {
  __typename?: "ActionsConnection";
  nodes: Array<Action>;
  pageInfo: PageInfo;
};

export type AdminMutations = {
  __typename?: "AdminMutations";
  assignProjectsToUsers: Array<User>;
  unassignProjectsToUsers: Array<User>;
  createContent: Content;
  createDomain: Domain;
  createTopic: Topic;
  updateTopic: Topic;
  createProject: Project;
};

export type AdminMutationsAssignProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
};

export type AdminMutationsUnassignProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
};

export type AdminMutationsCreateContentArgs = {
  data: CreateContent;
};

export type AdminMutationsCreateDomainArgs = {
  input: CreateDomain;
};

export type AdminMutationsCreateTopicArgs = {
  input: CreateTopic;
};

export type AdminMutationsUpdateTopicArgs = {
  input: UpdateTopic;
};

export type AdminMutationsCreateProjectArgs = {
  data: CreateProject;
};

export type AdminQueries = {
  __typename?: "AdminQueries";
  allUsers: UsersConnection;
  allActions: ActionsConnection;
  allTopics: TopicsConnection;
  allDomains: DomainsConnection;
  allProjects: Array<Project>;
};

export type AdminQueriesAllUsersArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminQueriesAllActionsArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminQueriesAllTopicsArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminQueriesAllDomainsArgs = {
  pagination: CursorConnectionArgs;
};

export type Connection = {
  pageInfo?: Maybe<PageInfo>;
};

export type Content = {
  __typename?: "Content";
  id: Scalars["IntID"];
  description: Scalars["String"];
  binaryBase64?: Maybe<Scalars["String"]>;
  json?: Maybe<Scalars["JSONObject"]>;
  url?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  domain: Domain;
  project: Project;
};

export type CreateContent = {
  description: Scalars["String"];
  projectId: Scalars["IntID"];
  domainId: Scalars["IntID"];
  topicId?: Maybe<Scalars["IntID"]>;
  binaryBase64?: Maybe<Scalars["String"]>;
  json?: Maybe<Scalars["JSONObject"]>;
  url?: Maybe<Scalars["String"]>;
};

export type CreateDomain = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectId: Scalars["IntID"];
};

export type CreateProject = {
  code: Scalars["String"];
  label: Scalars["String"];
};

export type CreateTopic = {
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  domainId: Scalars["IntID"];
  projectId: Scalars["IntID"];
};

export type CursorConnectionArgs = {
  first?: Maybe<Scalars["NonNegativeInt"]>;
  after?: Maybe<Scalars["IntID"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
  before?: Maybe<Scalars["IntID"]>;
};

export type Domain = {
  __typename?: "Domain";
  id: Scalars["IntID"];
  content: Array<Content>;
  topics: Array<Topic>;
  project: Project;
};

export type DomainsConnection = Connection & {
  __typename?: "DomainsConnection";
  nodes: Array<Domain>;
  pageInfo?: Maybe<PageInfo>;
};

export type Group = {
  __typename?: "Group";
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  users: Array<User>;
  projects: Array<Project>;
};

export type Mutation = {
  __typename?: "Mutation";
  admin: AdminMutations;
  action: Scalars["Void"];
};

export type MutationActionArgs = {
  data: ActionInput;
};

export type Node = {
  id: Scalars["IntID"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
};

export type Project = {
  __typename?: "Project";
  id: Scalars["IntID"];
  domains: Array<Domain>;
  code: Scalars["String"];
  label: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<User>;
  hello: Scalars["String"];
  admin: AdminQueries;
  domains: Array<Domain>;
  topics: Array<Topic>;
  content: Array<Content>;
  projects: Array<Project>;
};

export type QueryDomainsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryTopicsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryContentArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryProjectsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Topic = {
  __typename?: "Topic";
  id: Scalars["IntID"];
  content: Array<Content>;
  domain: Domain;
  parent?: Maybe<Topic>;
  childrens: Array<Topic>;
  project: Project;
};

export type TopicsConnection = Connection & {
  __typename?: "TopicsConnection";
  nodes: Array<Topic>;
  pageInfo?: Maybe<PageInfo>;
};

export type UpdateTopic = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  domainId: Scalars["IntID"];
  projectId: Scalars["IntID"];
};

export type User = {
  __typename?: "User";
  id: Scalars["IntID"];
  enabled: Scalars["Boolean"];
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  locked: Scalars["Boolean"];
  active: Scalars["Boolean"];
  lastOnline?: Maybe<Scalars["DateTime"]>;
  role: UserRole;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  groups: Array<Group>;
  projects: Array<Project>;
};

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export type UsersConnection = {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser?: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "email" | "name" | "role">
  >;
};

export const CurrentUserDocument = `
    query currentUser {
  currentUser {
    id
    email
    name
    role
  }
}
    `;
export const useCurrentUserQuery = <TData = CurrentUserQuery, TError = unknown>(
  variables?: CurrentUserQueryVariables,
  options?: UseQueryOptions<CurrentUserQuery, TError, TData>
) =>
  useQuery<CurrentUserQuery, TError, TData>(
    ["currentUser", variables],
    fetcher<CurrentUserQuery, CurrentUserQueryVariables>(
      CurrentUserDocument,
      variables
    ),
    options
  );
useCurrentUserQuery.document = CurrentUserDocument;

useCurrentUserQuery.getKey = (variables?: CurrentUserQueryVariables) => [
  "currentUser",
  variables,
];
