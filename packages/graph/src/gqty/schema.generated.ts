/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { SchemaUnionsKey } from "gqty";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Represents NULL values */
  Void: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** ID that parses as non-negative integer, serializes to string, and can be passed as string or number */
  IntID: any;
}

export interface CreateGroupInput {
  code: Scalars["String"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
}

export interface UpdateGroupInput {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UpsertUserInput {
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
}

export interface UpdateUserInput {
  id: Scalars["IntID"];
  role: UserRole;
  locked: Scalars["Boolean"];
}

export interface CursorConnectionArgs {
  first?: Maybe<Scalars["NonNegativeInt"]>;
  after?: Maybe<Scalars["IntID"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
  before?: Maybe<Scalars["IntID"]>;
}

export interface ActionActivityInput {
  contentID?: Maybe<Scalars["IntID"]>;
  topicID?: Maybe<Scalars["IntID"]>;
  stepID?: Maybe<Scalars["ID"]>;
  hintID?: Maybe<Scalars["ID"]>;
  amount?: Maybe<Scalars["Float"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
}

export interface ActionInput {
  activity: ActionActivityInput;
  verbName: Scalars["String"];
  timestamp: Scalars["Timestamp"];
  projectId: Scalars["IntID"];
}

export interface CreateContent {
  description: Scalars["String"];
  projectId: Scalars["IntID"];
  domainId: Scalars["IntID"];
  topicId?: Maybe<Scalars["IntID"]>;
  binaryBase64?: Maybe<Scalars["String"]>;
  json?: Maybe<Scalars["JSONObject"]>;
  url?: Maybe<Scalars["String"]>;
}

export interface CreateDomain {
  code: Scalars["String"];
  label: Scalars["String"];
  projectId: Scalars["IntID"];
}

export interface UpdateDomain {
  id: Scalars["IntID"];
  label: Scalars["String"];
}

export interface CreateTopic {
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  domainId: Scalars["IntID"];
  projectId: Scalars["IntID"];
}

export interface UpdateTopic {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  domainId: Scalars["IntID"];
  projectId: Scalars["IntID"];
}

export interface CreateKCInput {
  code: Scalars["String"];
  label: Scalars["String"];
  domainId: Scalars["IntID"];
}

export interface UpdateKCInput {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
}

export interface CreateProject {
  code: Scalars["String"];
  label: Scalars["String"];
}

export interface UpdateProject {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
}

export const scalarsEnumsHash: import("gqty").ScalarsEnumsHash = {
  String: true,
  DateTime: true,
  Timestamp: true,
  JSONObject: true,
  NonNegativeInt: true,
  Void: true,
  URL: true,
  EmailAddress: true,
  IntID: true,
  UserRole: true,
  Boolean: true,
  ID: true,
  Float: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    hello: { __type: "String!" },
    groups: { __type: "[Group!]!", __args: { ids: "[IntID!]!" } },
    adminUsers: { __type: "AdminUserQueries!" },
    currentUser: { __type: "User" },
    users: { __type: "[User!]!", __args: { ids: "[IntID!]!" } },
    adminActions: { __type: "AdminActionQueries!" },
    adminContent: { __type: "AdminContentQueries!" },
    domains: { __type: "[Domain!]!", __args: { ids: "[IntID!]!" } },
    topics: { __type: "[Topic!]!", __args: { ids: "[IntID!]!" } },
    content: { __type: "[Content!]!", __args: { ids: "[IntID!]!" } },
    adminDomain: { __type: "AdminDomainQueries!" },
    projects: { __type: "[Project!]!", __args: { ids: "[IntID!]!" } },
    adminProjects: { __type: "AdminProjectsQueries!" },
    hello2: { __type: "String!" },
  },
  mutation: {
    __typename: { __type: "String!" },
    hello: { __type: "String!" },
    adminUsers: { __type: "AdminUserMutations!" },
    action: { __type: "Void", __args: { data: "ActionInput!" } },
    adminContent: { __type: "AdminContentMutations!" },
    adminDomain: { __type: "AdminDomainMutations!" },
    adminProjects: { __type: "AdminProjectsMutations!" },
  },
  subscription: {
    __typename: { __type: "String!" },
    hello: { __type: "String!" },
  },
  Group: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    code: { __type: "String!" },
    label: { __type: "String!" },
    users: { __type: "[User!]!" },
    projectsIds: { __type: "[IntID!]!" },
    projects: { __type: "[Project!]!" },
  },
  CreateGroupInput: {
    code: { __type: "String!" },
    label: { __type: "String!" },
    projectIds: { __type: "[IntID!]!" },
  },
  UpdateGroupInput: {
    id: { __type: "IntID!" },
    code: { __type: "String!" },
    label: { __type: "String!" },
    projectIds: { __type: "[IntID!]!" },
  },
  GroupsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Group!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  User: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    enabled: { __type: "Boolean!" },
    email: { __type: "String!" },
    name: { __type: "String" },
    locked: { __type: "Boolean!" },
    active: { __type: "Boolean!" },
    lastOnline: { __type: "DateTime" },
    role: { __type: "UserRole!" },
    createdAt: { __type: "DateTime!" },
    updatedAt: { __type: "DateTime!" },
    groups: { __type: "[Group!]!" },
    projectsIds: { __type: "[IntID!]!" },
    projects: { __type: "[Project!]!" },
  },
  UsersConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[User!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  AdminUserQueries: {
    __typename: { __type: "String!" },
    allUsers: {
      __type: "UsersConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
    allGroups: {
      __type: "GroupsConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
  },
  UpsertUserInput: { email: { __type: "String!" }, name: { __type: "String" } },
  UpdateUserInput: {
    id: { __type: "IntID!" },
    role: { __type: "UserRole!" },
    locked: { __type: "Boolean!" },
  },
  AdminUserMutations: {
    __typename: { __type: "String!" },
    upsertUsersWithProject: {
      __type: "[User!]!",
      __args: { emails: "[EmailAddress!]!", projectId: "IntID!" },
    },
    updateUser: { __type: "User!", __args: { data: "UpdateUserInput!" } },
    setUserGroups: {
      __type: "[User!]!",
      __args: { userIds: "[IntID!]!", groupIds: "[IntID!]!" },
    },
    createGroup: { __type: "Group!", __args: { data: "CreateGroupInput!" } },
    updateGroup: { __type: "Group!", __args: { data: "UpdateGroupInput!" } },
    setProjectsToUsers: {
      __type: "[User!]!",
      __args: { projectIds: "[IntID!]!", userIds: "[IntID!]!" },
    },
  },
  PageInfo: {
    __typename: { __type: "String!" },
    startCursor: { __type: "String" },
    endCursor: { __type: "String" },
    hasNextPage: { __type: "Boolean!" },
    hasPreviousPage: { __type: "Boolean!" },
  },
  Node: { __typename: { __type: "String!" }, id: { __type: "IntID!" } },
  Connection: {
    __typename: { __type: "String!" },
    pageInfo: { __type: "PageInfo!" },
    $on: { __type: "$Connection!" },
  },
  CursorConnectionArgs: {
    first: { __type: "NonNegativeInt" },
    after: { __type: "IntID" },
    last: { __type: "NonNegativeInt" },
    before: { __type: "IntID" },
  },
  ActionVerb: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    name: { __type: "String!" },
  },
  Content: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    description: { __type: "String!" },
    binaryBase64: { __type: "String" },
    json: { __type: "JSONObject" },
    url: { __type: "String" },
    createdAt: { __type: "DateTime!" },
    updatedAt: { __type: "DateTime!" },
    domain: { __type: "Domain!" },
    project: { __type: "Project!" },
  },
  Domain: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    content: {
      __type: "ContentConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
    code: { __type: "String!" },
    label: { __type: "String!" },
    topics: { __type: "[Topic!]!" },
    createdAt: { __type: "DateTime!" },
    updatedAt: { __type: "DateTime!" },
    kcs: { __type: "[KC!]!" },
    project: { __type: "Project!" },
  },
  Topic: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    content: {
      __type: "ContentConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
    code: { __type: "String!" },
    label: { __type: "String!" },
    domain: { __type: "Domain!" },
    parent: { __type: "Topic" },
    childrens: { __type: "[Topic!]!" },
    createdAt: { __type: "DateTime!" },
    updatedAt: { __type: "DateTime!" },
    kcs: { __type: "[KC!]!" },
    project: { __type: "Project!" },
  },
  ActionActivity: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    content: { __type: "Content" },
    topic: { __type: "Topic" },
    stepID: { __type: "ID" },
    hintID: { __type: "ID" },
    amount: { __type: "Float" },
    detail: { __type: "String" },
    extra: { __type: "JSONObject" },
  },
  ActionActivityInput: {
    contentID: { __type: "IntID" },
    topicID: { __type: "IntID" },
    stepID: { __type: "ID" },
    hintID: { __type: "ID" },
    amount: { __type: "Float" },
    detail: { __type: "String" },
    extra: { __type: "JSONObject" },
  },
  ActionInput: {
    activity: { __type: "ActionActivityInput!" },
    verbName: { __type: "String!" },
    timestamp: { __type: "Timestamp!" },
    projectId: { __type: "IntID!" },
  },
  Action: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    verb: { __type: "ActionVerb!" },
    activity: { __type: "ActionActivity!" },
    timestamp: { __type: "Timestamp!" },
    result: { __type: "Float" },
    user: { __type: "User" },
  },
  ActionsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Action!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  AdminActionQueries: {
    __typename: { __type: "String!" },
    allActions: {
      __type: "ActionsConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
  },
  CreateContent: {
    description: { __type: "String!" },
    projectId: { __type: "IntID!" },
    domainId: { __type: "IntID!" },
    topicId: { __type: "IntID" },
    binaryBase64: { __type: "String" },
    json: { __type: "JSONObject" },
    url: { __type: "String" },
  },
  ContentConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Content!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  AdminContentMutations: {
    __typename: { __type: "String!" },
    createContent: { __type: "Content!", __args: { data: "CreateContent!" } },
  },
  AdminContentQueries: {
    __typename: { __type: "String!" },
    allContent: {
      __type: "ContentConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
  },
  TopicsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Topic!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  DomainsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Domain!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  AdminDomainQueries: {
    __typename: { __type: "String!" },
    allTopics: {
      __type: "TopicsConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
    allDomains: {
      __type: "DomainsConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
    allKCs: {
      __type: "KCsConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
  },
  CreateDomain: {
    code: { __type: "String!" },
    label: { __type: "String!" },
    projectId: { __type: "IntID!" },
  },
  UpdateDomain: { id: { __type: "IntID!" }, label: { __type: "String!" } },
  CreateTopic: {
    code: { __type: "String!" },
    label: { __type: "String!" },
    parentTopicId: { __type: "IntID" },
    domainId: { __type: "IntID!" },
    projectId: { __type: "IntID!" },
  },
  UpdateTopic: {
    id: { __type: "IntID!" },
    code: { __type: "String!" },
    label: { __type: "String!" },
    parentTopicId: { __type: "IntID" },
    domainId: { __type: "IntID!" },
    projectId: { __type: "IntID!" },
  },
  AdminDomainMutations: {
    __typename: { __type: "String!" },
    createDomain: { __type: "Domain!", __args: { input: "CreateDomain!" } },
    updateDomain: { __type: "Domain!", __args: { input: "UpdateDomain!" } },
    createTopic: { __type: "Topic!", __args: { input: "CreateTopic!" } },
    updateTopic: { __type: "Topic!", __args: { input: "UpdateTopic!" } },
    createKC: { __type: "KC!", __args: { data: "CreateKCInput!" } },
    updateKC: { __type: "KC!", __args: { data: "UpdateKCInput!" } },
  },
  KC: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    code: { __type: "String!" },
    label: { __type: "String!" },
    createdAt: { __type: "DateTime!" },
    updatedAt: { __type: "DateTime!" },
    domain: { __type: "Domain!" },
    topics: { __type: "[Topic!]!" },
  },
  KCsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[KC!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  CreateKCInput: {
    code: { __type: "String!" },
    label: { __type: "String!" },
    domainId: { __type: "IntID!" },
  },
  UpdateKCInput: {
    id: { __type: "IntID!" },
    code: { __type: "String!" },
    label: { __type: "String!" },
  },
  Project: {
    __typename: { __type: "String!" },
    id: { __type: "IntID!" },
    domains: { __type: "[Domain!]!" },
    code: { __type: "String!" },
    label: { __type: "String!" },
    createdAt: { __type: "DateTime!" },
    updatedAt: { __type: "DateTime!" },
  },
  ProjectsConnection: {
    __typename: { __type: "String!" },
    nodes: { __type: "[Project!]!" },
    pageInfo: { __type: "PageInfo!" },
  },
  AdminProjectsQueries: {
    __typename: { __type: "String!" },
    allProjects: {
      __type: "ProjectsConnection!",
      __args: { pagination: "CursorConnectionArgs!" },
    },
  },
  CreateProject: { code: { __type: "String!" }, label: { __type: "String!" } },
  UpdateProject: {
    id: { __type: "IntID!" },
    code: { __type: "String!" },
    label: { __type: "String!" },
  },
  AdminProjectsMutations: {
    __typename: { __type: "String!" },
    createProject: { __type: "Project!", __args: { data: "CreateProject!" } },
    updateProject: { __type: "Project!", __args: { data: "UpdateProject!" } },
  },
  [SchemaUnionsKey]: {
    Connection: [
      "GroupsConnection",
      "UsersConnection",
      "ContentConnection",
      "TopicsConnection",
      "DomainsConnection",
      "KCsConnection",
      "ProjectsConnection",
    ],
  },
} as const;

export interface Query {
  __typename?: "Query";
  hello: ScalarsEnums["String"];
  groups: (args: { ids: Array<Scalars["IntID"]> }) => Array<Group>;
  adminUsers: AdminUserQueries;
  currentUser?: Maybe<User>;
  users: (args: { ids: Array<Scalars["IntID"]> }) => Array<User>;
  adminActions: AdminActionQueries;
  adminContent: AdminContentQueries;
  domains: (args: { ids: Array<Scalars["IntID"]> }) => Array<Domain>;
  topics: (args: { ids: Array<Scalars["IntID"]> }) => Array<Topic>;
  content: (args: { ids: Array<Scalars["IntID"]> }) => Array<Content>;
  adminDomain: AdminDomainQueries;
  projects: (args: { ids: Array<Scalars["IntID"]> }) => Array<Project>;
  adminProjects: AdminProjectsQueries;
  hello2: ScalarsEnums["String"];
}

export interface Mutation {
  __typename?: "Mutation";
  hello: ScalarsEnums["String"];
  adminUsers: AdminUserMutations;
  action: (args: { data: ActionInput }) => Maybe<ScalarsEnums["Void"]>;
  adminContent: AdminContentMutations;
  adminDomain: AdminDomainMutations;
  adminProjects: AdminProjectsMutations;
}

export interface Subscription {
  __typename?: "Subscription";
  hello: ScalarsEnums["String"];
}

export interface Group {
  __typename?: "Group";
  id: ScalarsEnums["IntID"];
  code: ScalarsEnums["String"];
  label: ScalarsEnums["String"];
  users: Array<User>;
  projectsIds: Array<ScalarsEnums["IntID"]>;
  projects: Array<Project>;
}

export interface GroupsConnection {
  __typename?: "GroupsConnection";
  nodes: Array<Group>;
  pageInfo: PageInfo;
}

export interface User {
  __typename?: "User";
  id: ScalarsEnums["IntID"];
  enabled: ScalarsEnums["Boolean"];
  email: ScalarsEnums["String"];
  name?: Maybe<ScalarsEnums["String"]>;
  locked: ScalarsEnums["Boolean"];
  active: ScalarsEnums["Boolean"];
  lastOnline?: Maybe<ScalarsEnums["DateTime"]>;
  role: ScalarsEnums["UserRole"];
  createdAt: ScalarsEnums["DateTime"];
  updatedAt: ScalarsEnums["DateTime"];
  groups: Array<Group>;
  projectsIds: Array<ScalarsEnums["IntID"]>;
  projects: Array<Project>;
}

export interface UsersConnection {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
}

export interface AdminUserQueries {
  __typename?: "AdminUserQueries";
  allUsers: (args: { pagination: CursorConnectionArgs }) => UsersConnection;
  allGroups: (args: { pagination: CursorConnectionArgs }) => GroupsConnection;
}

export interface AdminUserMutations {
  __typename?: "AdminUserMutations";
  /**
   * Upsert specified users with specified project
   */
  upsertUsersWithProject: (args: {
    emails: Array<Scalars["EmailAddress"]>;
    projectId: Scalars["IntID"];
  }) => Array<User>;
  updateUser: (args: { data: UpdateUserInput }) => User;
  setUserGroups: (args: {
    userIds: Array<Scalars["IntID"]>;
    groupIds: Array<Scalars["IntID"]>;
  }) => Array<User>;
  createGroup: (args: { data: CreateGroupInput }) => Group;
  updateGroup: (args: { data: UpdateGroupInput }) => Group;
  setProjectsToUsers: (args: {
    projectIds: Array<Scalars["IntID"]>;
    userIds: Array<Scalars["IntID"]>;
  }) => Array<User>;
}

export interface PageInfo {
  __typename?: "PageInfo";
  startCursor?: Maybe<ScalarsEnums["String"]>;
  endCursor?: Maybe<ScalarsEnums["String"]>;
  hasNextPage: ScalarsEnums["Boolean"];
  hasPreviousPage: ScalarsEnums["Boolean"];
}

export interface Node {
  __typename?: "Node";
  id: ScalarsEnums["IntID"];
}

export interface Connection {
  __typename?:
    | "GroupsConnection"
    | "UsersConnection"
    | "ContentConnection"
    | "TopicsConnection"
    | "DomainsConnection"
    | "KCsConnection"
    | "ProjectsConnection";
  pageInfo: PageInfo;
  $on: $Connection;
}

export interface ActionVerb {
  __typename?: "ActionVerb";
  id: ScalarsEnums["IntID"];
  name: ScalarsEnums["String"];
}

export interface Content {
  __typename?: "Content";
  id: ScalarsEnums["IntID"];
  description: ScalarsEnums["String"];
  binaryBase64?: Maybe<ScalarsEnums["String"]>;
  json?: Maybe<ScalarsEnums["JSONObject"]>;
  url?: Maybe<ScalarsEnums["String"]>;
  createdAt: ScalarsEnums["DateTime"];
  updatedAt: ScalarsEnums["DateTime"];
  domain: Domain;
  project: Project;
}

export interface Domain {
  __typename?: "Domain";
  id: ScalarsEnums["IntID"];
  content: (args: { pagination: CursorConnectionArgs }) => ContentConnection;
  code: ScalarsEnums["String"];
  label: ScalarsEnums["String"];
  topics: Array<Topic>;
  createdAt: ScalarsEnums["DateTime"];
  updatedAt: ScalarsEnums["DateTime"];
  kcs: Array<KC>;
  project: Project;
}

export interface Topic {
  __typename?: "Topic";
  id: ScalarsEnums["IntID"];
  content: (args: { pagination: CursorConnectionArgs }) => ContentConnection;
  code: ScalarsEnums["String"];
  label: ScalarsEnums["String"];
  domain: Domain;
  parent?: Maybe<Topic>;
  childrens: Array<Topic>;
  createdAt: ScalarsEnums["DateTime"];
  updatedAt: ScalarsEnums["DateTime"];
  kcs: Array<KC>;
  project: Project;
}

export interface ActionActivity {
  __typename?: "ActionActivity";
  id: ScalarsEnums["IntID"];
  content?: Maybe<Content>;
  topic?: Maybe<Topic>;
  stepID?: Maybe<ScalarsEnums["ID"]>;
  hintID?: Maybe<ScalarsEnums["ID"]>;
  amount?: Maybe<ScalarsEnums["Float"]>;
  detail?: Maybe<ScalarsEnums["String"]>;
  extra?: Maybe<ScalarsEnums["JSONObject"]>;
}

export interface Action {
  __typename?: "Action";
  id: ScalarsEnums["IntID"];
  verb: ActionVerb;
  activity: ActionActivity;
  timestamp: ScalarsEnums["Timestamp"];
  result?: Maybe<ScalarsEnums["Float"]>;
  user?: Maybe<User>;
}

export interface ActionsConnection {
  __typename?: "ActionsConnection";
  nodes: Array<Action>;
  pageInfo: PageInfo;
}

export interface AdminActionQueries {
  __typename?: "AdminActionQueries";
  allActions: (args: { pagination: CursorConnectionArgs }) => ActionsConnection;
}

export interface ContentConnection {
  __typename?: "ContentConnection";
  nodes: Array<Content>;
  pageInfo: PageInfo;
}

export interface AdminContentMutations {
  __typename?: "AdminContentMutations";
  createContent: (args: { data: CreateContent }) => Content;
}

export interface AdminContentQueries {
  __typename?: "AdminContentQueries";
  allContent: (args: { pagination: CursorConnectionArgs }) => ContentConnection;
}

export interface TopicsConnection {
  __typename?: "TopicsConnection";
  nodes: Array<Topic>;
  pageInfo: PageInfo;
}

export interface DomainsConnection {
  __typename?: "DomainsConnection";
  nodes: Array<Domain>;
  pageInfo: PageInfo;
}

export interface AdminDomainQueries {
  __typename?: "AdminDomainQueries";
  allTopics: (args: { pagination: CursorConnectionArgs }) => TopicsConnection;
  allDomains: (args: { pagination: CursorConnectionArgs }) => DomainsConnection;
  allKCs: (args: { pagination: CursorConnectionArgs }) => KCsConnection;
}

export interface AdminDomainMutations {
  __typename?: "AdminDomainMutations";
  createDomain: (args: { input: CreateDomain }) => Domain;
  updateDomain: (args: { input: UpdateDomain }) => Domain;
  createTopic: (args: { input: CreateTopic }) => Topic;
  updateTopic: (args: { input: UpdateTopic }) => Topic;
  createKC: (args: { data: CreateKCInput }) => KC;
  updateKC: (args: { data: UpdateKCInput }) => KC;
}

export interface KC {
  __typename?: "KC";
  id: ScalarsEnums["IntID"];
  code: ScalarsEnums["String"];
  label: ScalarsEnums["String"];
  createdAt: ScalarsEnums["DateTime"];
  updatedAt: ScalarsEnums["DateTime"];
  domain: Domain;
  topics: Array<Topic>;
}

export interface KCsConnection {
  __typename?: "KCsConnection";
  nodes: Array<KC>;
  pageInfo: PageInfo;
}

export interface Project {
  __typename?: "Project";
  id: ScalarsEnums["IntID"];
  domains: Array<Domain>;
  code: ScalarsEnums["String"];
  label: ScalarsEnums["String"];
  createdAt: ScalarsEnums["DateTime"];
  updatedAt: ScalarsEnums["DateTime"];
}

export interface ProjectsConnection {
  __typename?: "ProjectsConnection";
  nodes: Array<Project>;
  pageInfo: PageInfo;
}

export interface AdminProjectsQueries {
  __typename?: "AdminProjectsQueries";
  allProjects: (args: {
    pagination: CursorConnectionArgs;
  }) => ProjectsConnection;
}

export interface AdminProjectsMutations {
  __typename?: "AdminProjectsMutations";
  createProject: (args: { data: CreateProject }) => Project;
  updateProject: (args: { data: UpdateProject }) => Project;
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  Group: Group;
  GroupsConnection: GroupsConnection;
  User: User;
  UsersConnection: UsersConnection;
  AdminUserQueries: AdminUserQueries;
  AdminUserMutations: AdminUserMutations;
  PageInfo: PageInfo;
  Node: Node;
  ActionVerb: ActionVerb;
  Content: Content;
  Domain: Domain;
  Topic: Topic;
  ActionActivity: ActionActivity;
  Action: Action;
  ActionsConnection: ActionsConnection;
  AdminActionQueries: AdminActionQueries;
  ContentConnection: ContentConnection;
  AdminContentMutations: AdminContentMutations;
  AdminContentQueries: AdminContentQueries;
  TopicsConnection: TopicsConnection;
  DomainsConnection: DomainsConnection;
  AdminDomainQueries: AdminDomainQueries;
  AdminDomainMutations: AdminDomainMutations;
  KC: KC;
  KCsConnection: KCsConnection;
  Project: Project;
  ProjectsConnection: ProjectsConnection;
  AdminProjectsQueries: AdminProjectsQueries;
  AdminProjectsMutations: AdminProjectsMutations;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "Group"
  | "GroupsConnection"
  | "User"
  | "UsersConnection"
  | "AdminUserQueries"
  | "AdminUserMutations"
  | "PageInfo"
  | "Node"
  | "ActionVerb"
  | "Content"
  | "Domain"
  | "Topic"
  | "ActionActivity"
  | "Action"
  | "ActionsConnection"
  | "AdminActionQueries"
  | "ContentConnection"
  | "AdminContentMutations"
  | "AdminContentQueries"
  | "TopicsConnection"
  | "DomainsConnection"
  | "AdminDomainQueries"
  | "AdminDomainMutations"
  | "KC"
  | "KCsConnection"
  | "Project"
  | "ProjectsConnection"
  | "AdminProjectsQueries"
  | "AdminProjectsMutations";

export interface $Connection {
  GroupsConnection?: GroupsConnection;
  UsersConnection?: UsersConnection;
  ContentConnection?: ContentConnection;
  TopicsConnection?: TopicsConnection;
  DomainsConnection?: DomainsConnection;
  KCsConnection?: KCsConnection;
  ProjectsConnection?: ProjectsConnection;
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  UserRole: UserRole | undefined;
}
