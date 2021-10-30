/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
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
  amount?: Maybe<Scalars["Float"]>;
  content?: Maybe<Content>;
  createdAt: Scalars["DateTime"];
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
  hintID?: Maybe<Scalars["ID"]>;
  id: Scalars["IntID"];
  kcs: Array<Kc>;
  result?: Maybe<Scalars["Float"]>;
  stepID?: Maybe<Scalars["ID"]>;
  timestamp: Scalars["Timestamp"];
  topic?: Maybe<Topic>;
  user?: Maybe<User>;
  verb: ActionVerb;
};

export type ActionInput = {
  amount?: Maybe<Scalars["Float"]>;
  contentID?: Maybe<Scalars["ID"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
  hintID?: Maybe<Scalars["ID"]>;
  kcsIDs?: Maybe<Array<Scalars["ID"]>>;
  projectId: Scalars["IntID"];
  result?: Maybe<Scalars["Float"]>;
  stepID?: Maybe<Scalars["ID"]>;
  timestamp: Scalars["Timestamp"];
  topicID?: Maybe<Scalars["ID"]>;
  verbName: Scalars["String"];
};

export type ActionVerb = {
  __typename?: "ActionVerb";
  id: Scalars["IntID"];
  name: Scalars["String"];
};

export type ActionsConnection = Connection & {
  __typename?: "ActionsConnection";
  nodes: Array<Action>;
  pageInfo: PageInfo;
};

export type ActionsVerbsConnection = Connection & {
  __typename?: "ActionsVerbsConnection";
  nodes: Array<ActionVerb>;
  pageInfo: PageInfo;
};

export type AdminActionQueries = {
  __typename?: "AdminActionQueries";
  allActions: ActionsConnection;
  allActionsVerbs: ActionsVerbsConnection;
};

export type AdminActionQueriesAllActionsArgs = {
  filters?: Maybe<AdminActionsFilter>;
  orderBy?: Maybe<AdminActionsOrderBy>;
  pagination: CursorConnectionArgs;
};

export type AdminActionQueriesAllActionsVerbsArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminActionsFilter = {
  content?: Maybe<Array<Scalars["IntID"]>>;
  endDate?: Maybe<Scalars["DateTime"]>;
  kcs?: Maybe<Array<Scalars["IntID"]>>;
  projects?: Maybe<Array<Scalars["IntID"]>>;
  startDate?: Maybe<Scalars["DateTime"]>;
  topics?: Maybe<Array<Scalars["IntID"]>>;
  users?: Maybe<Array<Scalars["IntID"]>>;
  verbNames?: Maybe<Array<Scalars["String"]>>;
};

export type AdminActionsOrderBy = {
  id?: Maybe<Order_By>;
};

export type AdminContentFilter = {
  projects?: Maybe<Array<Scalars["IntID"]>>;
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type AdminContentMutations = {
  __typename?: "AdminContentMutations";
  createContent: Content;
  updateContent: Content;
};

export type AdminContentMutationsCreateContentArgs = {
  data: CreateContent;
};

export type AdminContentMutationsUpdateContentArgs = {
  data: UpdateContent;
};

export type AdminContentQueries = {
  __typename?: "AdminContentQueries";
  allContent: ContentConnection;
};

export type AdminContentQueriesAllContentArgs = {
  filters?: Maybe<AdminContentFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminDomainMutations = {
  __typename?: "AdminDomainMutations";
  createDomain: Domain;
  createKC: Kc;
  createTopic: Topic;
  updateDomain: Domain;
  updateKC: Kc;
  updateTopic: Topic;
};

export type AdminDomainMutationsCreateDomainArgs = {
  input: CreateDomain;
};

export type AdminDomainMutationsCreateKcArgs = {
  data: CreateKcInput;
};

export type AdminDomainMutationsCreateTopicArgs = {
  input: CreateTopic;
};

export type AdminDomainMutationsUpdateDomainArgs = {
  input: UpdateDomain;
};

export type AdminDomainMutationsUpdateKcArgs = {
  data: UpdateKcInput;
};

export type AdminDomainMutationsUpdateTopicArgs = {
  input: UpdateTopic;
};

export type AdminDomainQueries = {
  __typename?: "AdminDomainQueries";
  allDomains: DomainsConnection;
  allKCs: KCsConnection;
  allTopics: TopicsConnection;
};

export type AdminDomainQueriesAllDomainsArgs = {
  filters?: Maybe<AdminDomainsFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminDomainQueriesAllKCsArgs = {
  filters?: Maybe<AdminKCsFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminDomainQueriesAllTopicsArgs = {
  filters?: Maybe<AdminTopicsFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminDomainsFilter = {
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type AdminGroupsFilter = {
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type AdminKCsFilter = {
  domains?: Maybe<Array<Scalars["IntID"]>>;
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type AdminProjectsMutations = {
  __typename?: "AdminProjectsMutations";
  createProject: Project;
  updateProject: Project;
};

export type AdminProjectsMutationsCreateProjectArgs = {
  data: CreateProject;
};

export type AdminProjectsMutationsUpdateProjectArgs = {
  data: UpdateProject;
};

export type AdminProjectsQueries = {
  __typename?: "AdminProjectsQueries";
  allProjects: ProjectsConnection;
};

export type AdminProjectsQueriesAllProjectsArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminTopicsFilter = {
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type AdminUserMutations = {
  __typename?: "AdminUserMutations";
  createGroup: Group;
  setProjectsToUsers: Array<User>;
  setUserGroups: Array<Group>;
  updateGroup: Group;
  updateUser: User;
  /** Upsert specified users with specified project */
  upsertUsersWithProjects: Array<User>;
};

export type AdminUserMutationsCreateGroupArgs = {
  data: CreateGroupInput;
};

export type AdminUserMutationsSetProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
};

export type AdminUserMutationsSetUserGroupsArgs = {
  groupIds: Array<Scalars["IntID"]>;
  usersEmails: Array<Scalars["EmailAddress"]>;
};

export type AdminUserMutationsUpdateGroupArgs = {
  data: UpdateGroupInput;
};

export type AdminUserMutationsUpdateUserArgs = {
  data: UpdateUserInput;
};

export type AdminUserMutationsUpsertUsersWithProjectsArgs = {
  emails: Array<Scalars["EmailAddress"]>;
  projectsIds: Array<Scalars["IntID"]>;
};

export type AdminUserQueries = {
  __typename?: "AdminUserQueries";
  allGroups: GroupsConnection;
  allUsers: UsersConnection;
};

export type AdminUserQueriesAllGroupsArgs = {
  filters?: Maybe<AdminGroupsFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminUserQueriesAllUsersArgs = {
  filters?: Maybe<AdminUsersFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminUsersFilter = {
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type Connection = {
  pageInfo: PageInfo;
};

export type Content = {
  __typename?: "Content";
  binaryBase64?: Maybe<Scalars["String"]>;
  binaryFilename?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  id: Scalars["IntID"];
  json?: Maybe<Scalars["JSONObject"]>;
  kcs: Array<Kc>;
  label: Scalars["String"];
  project: Project;
  sortIndex?: Maybe<Scalars["Int"]>;
  tags: Array<Scalars["String"]>;
  topics: Array<Topic>;
  updatedAt: Scalars["DateTime"];
  url?: Maybe<Scalars["String"]>;
};

export type ContentConnection = Connection & {
  __typename?: "ContentConnection";
  nodes: Array<Content>;
  pageInfo: PageInfo;
};

export type CreateContent = {
  binaryBase64?: Maybe<Scalars["String"]>;
  binaryFilename?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
  description: Scalars["String"];
  json?: Maybe<Scalars["JSONObject"]>;
  kcs: Array<Scalars["IntID"]>;
  label: Scalars["String"];
  projectId: Scalars["IntID"];
  tags: Array<Scalars["String"]>;
  topics: Array<Scalars["IntID"]>;
  url?: Maybe<Scalars["URL"]>;
};

export type CreateDomain = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectsIds: Array<Scalars["IntID"]>;
};

export type CreateGroupInput = {
  code: Scalars["String"];
  flags?: Maybe<GroupFlagsInput>;
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
};

export type CreateKcInput = {
  code: Scalars["String"];
  domainId: Scalars["IntID"];
  label: Scalars["String"];
};

export type CreateProject = {
  code: Scalars["String"];
  domains: Array<Scalars["IntID"]>;
  label: Scalars["String"];
};

export type CreateTopic = {
  code: Scalars["String"];
  contentIds: Array<Scalars["IntID"]>;
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  projectId: Scalars["IntID"];
  sortIndex?: Maybe<Scalars["Int"]>;
};

export type CursorConnectionArgs = {
  after?: Maybe<Scalars["IntID"]>;
  before?: Maybe<Scalars["IntID"]>;
  first?: Maybe<Scalars["NonNegativeInt"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
};

export type Domain = {
  __typename?: "Domain";
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["IntID"];
  kcs: Array<Kc>;
  label: Scalars["String"];
  projects: Array<Project>;
  topics: Array<Topic>;
  updatedAt: Scalars["DateTime"];
};

export type DomainsConnection = Connection & {
  __typename?: "DomainsConnection";
  nodes: Array<Domain>;
  pageInfo: PageInfo;
};

export type Group = {
  __typename?: "Group";
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  flags: GroupFlags;
  id: Scalars["IntID"];
  label: Scalars["String"];
  projects: Array<Project>;
  projectsIds: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  users: Array<User>;
};

export type GroupFlags = {
  __typename?: "GroupFlags";
  createdAt: Scalars["DateTime"];
  id: Scalars["IntID"];
  readProjectActions: Scalars["Boolean"];
  updatedAt: Scalars["DateTime"];
};

export type GroupFlagsInput = {
  readProjectActions: Scalars["Boolean"];
};

export type GroupsConnection = Connection & {
  __typename?: "GroupsConnection";
  nodes: Array<Group>;
  pageInfo: PageInfo;
};

export type Kc = {
  __typename?: "KC";
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  domain: Domain;
  id: Scalars["IntID"];
  label: Scalars["String"];
  topics: Array<Topic>;
  updatedAt: Scalars["DateTime"];
};

export type KCsConnection = Connection & {
  __typename?: "KCsConnection";
  nodes: Array<Kc>;
  pageInfo: PageInfo;
};

export type Mutation = {
  __typename?: "Mutation";
  action?: Maybe<Scalars["Void"]>;
  adminContent: AdminContentMutations;
  adminDomain: AdminDomainMutations;
  adminProjects: AdminProjectsMutations;
  adminUsers: AdminUserMutations;
  hello: Scalars["String"];
};

export type MutationActionArgs = {
  data: ActionInput;
};

export type Node = {
  id: Scalars["IntID"];
};

export const Order_By = {
  Asc: "ASC",
  Desc: "DESC",
} as const;

export type Order_By = typeof Order_By[keyof typeof Order_By];
export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
};

export type Project = {
  __typename?: "Project";
  actions: ActionsConnection;
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  domains: Array<Domain>;
  id: Scalars["IntID"];
  label: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type ProjectActionsArgs = {
  filters?: Maybe<ProjectActionsFilter>;
  pagination: CursorConnectionArgs;
};

export type ProjectActionsFilter = {
  content?: Maybe<Array<Scalars["IntID"]>>;
  endDate?: Maybe<Scalars["DateTime"]>;
  kcs?: Maybe<Array<Scalars["IntID"]>>;
  startDate?: Maybe<Scalars["DateTime"]>;
  topics?: Maybe<Array<Scalars["IntID"]>>;
  users?: Maybe<Array<Scalars["IntID"]>>;
  verbNames?: Maybe<Array<Scalars["String"]>>;
};

export type ProjectsConnection = Connection & {
  __typename?: "ProjectsConnection";
  nodes: Array<Project>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: "Query";
  adminActions: AdminActionQueries;
  adminContent: AdminContentQueries;
  adminDomain: AdminDomainQueries;
  adminProjects: AdminProjectsQueries;
  adminUsers: AdminUserQueries;
  content: Array<Content>;
  currentUser?: Maybe<User>;
  domains: Array<Domain>;
  groups: Array<Group>;
  hello: Scalars["String"];
  hello2: Scalars["String"];
  kcs: Array<Kc>;
  projects: Array<Project>;
  topics: Array<Topic>;
  users: Array<User>;
};

export type QueryContentArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryDomainsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryGroupsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryKcsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryProjectsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryTopicsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryUsersArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  hello: Scalars["String"];
};

export type Topic = {
  __typename?: "Topic";
  childrens: Array<Topic>;
  code: Scalars["String"];
  content: Array<Content>;
  createdAt: Scalars["DateTime"];
  id: Scalars["IntID"];
  kcs: Array<Kc>;
  label: Scalars["String"];
  parent?: Maybe<Topic>;
  project: Project;
  sortIndex?: Maybe<Scalars["Int"]>;
  updatedAt: Scalars["DateTime"];
};

export type TopicsConnection = Connection & {
  __typename?: "TopicsConnection";
  nodes: Array<Topic>;
  pageInfo: PageInfo;
};

export type UpdateContent = {
  binaryBase64?: Maybe<Scalars["String"]>;
  binaryFilename?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["IntID"];
  json?: Maybe<Scalars["JSONObject"]>;
  kcs: Array<Scalars["IntID"]>;
  label: Scalars["String"];
  projectId: Scalars["IntID"];
  tags: Array<Scalars["String"]>;
  topics: Array<Scalars["IntID"]>;
  url?: Maybe<Scalars["URL"]>;
};

export type UpdateDomain = {
  code: Scalars["String"];
  id: Scalars["IntID"];
  label: Scalars["String"];
};

export type UpdateGroupInput = {
  code: Scalars["String"];
  flags?: Maybe<GroupFlagsInput>;
  id: Scalars["IntID"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
};

export type UpdateKcInput = {
  code: Scalars["String"];
  id: Scalars["IntID"];
  label: Scalars["String"];
};

export type UpdateProject = {
  code: Scalars["String"];
  domains: Array<Scalars["IntID"]>;
  id: Scalars["IntID"];
  label: Scalars["String"];
};

export type UpdateTopic = {
  code: Scalars["String"];
  contentIds: Array<Scalars["IntID"]>;
  id: Scalars["IntID"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  sortIndex?: Maybe<Scalars["Int"]>;
};

export type UpdateUserInput = {
  id: Scalars["IntID"];
  locked: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  projectIds: Array<Scalars["IntID"]>;
  role: UserRole;
  tags: Array<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  active: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  enabled: Scalars["Boolean"];
  groups: Array<Group>;
  id: Scalars["IntID"];
  lastOnline?: Maybe<Scalars["DateTime"]>;
  locked: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  projects: Array<Project>;
  projectsIds: Array<Scalars["IntID"]>;
  role: UserRole;
  tags: Array<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export const UserRole = {
  Admin: "ADMIN",
  User: "USER",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];
export type UsersConnection = Connection & {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  currentUser?:
    | {
        __typename?: "User";
        id: string;
        email: string;
        name?: string | null | undefined;
        role: UserRole;
        picture?: string | null | undefined;
      }
    | null
    | undefined;
};

export type AllContentBaseQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminContentFilter>;
}>;

export type AllContentBaseQuery = {
  __typename?: "Query";
  adminContent: {
    __typename?: "AdminContentQueries";
    allContent: {
      __typename?: "ContentConnection";
      nodes: Array<{
        __typename?: "Content";
        id: string;
        code: string;
        label: string;
        tags: Array<string>;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type AllDomainsBaseQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminDomainsFilter>;
}>;

export type AllDomainsBaseQuery = {
  __typename?: "Query";
  adminDomain: {
    __typename?: "AdminDomainQueries";
    allDomains: {
      __typename?: "DomainsConnection";
      nodes: Array<{
        __typename?: "Domain";
        id: string;
        code: string;
        label: string;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type AllGroupsBaseQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
}>;

export type AllGroupsBaseQuery = {
  __typename?: "Query";
  adminUsers: {
    __typename?: "AdminUserQueries";
    allGroups: {
      __typename?: "GroupsConnection";
      nodes: Array<{
        __typename?: "Group";
        id: string;
        code: string;
        label: string;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type AllKCsBaseQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminKCsFilter>;
}>;

export type AllKCsBaseQuery = {
  __typename?: "Query";
  adminDomain: {
    __typename?: "AdminDomainQueries";
    allKCs: {
      __typename?: "KCsConnection";
      nodes: Array<{
        __typename?: "KC";
        id: string;
        code: string;
        label: string;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

type Pagination_ActionsConnection_Fragment = {
  __typename?: "ActionsConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_ActionsVerbsConnection_Fragment = {
  __typename?: "ActionsVerbsConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_ContentConnection_Fragment = {
  __typename?: "ContentConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_DomainsConnection_Fragment = {
  __typename?: "DomainsConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_GroupsConnection_Fragment = {
  __typename?: "GroupsConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_KCsConnection_Fragment = {
  __typename?: "KCsConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_ProjectsConnection_Fragment = {
  __typename?: "ProjectsConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_TopicsConnection_Fragment = {
  __typename?: "TopicsConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

type Pagination_UsersConnection_Fragment = {
  __typename?: "UsersConnection";
  pageInfo: {
    __typename?: "PageInfo";
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
  };
};

export type PaginationFragment =
  | Pagination_ActionsConnection_Fragment
  | Pagination_ActionsVerbsConnection_Fragment
  | Pagination_ContentConnection_Fragment
  | Pagination_DomainsConnection_Fragment
  | Pagination_GroupsConnection_Fragment
  | Pagination_KCsConnection_Fragment
  | Pagination_ProjectsConnection_Fragment
  | Pagination_TopicsConnection_Fragment
  | Pagination_UsersConnection_Fragment;

export type AllProjectsBaseQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
}>;

export type AllProjectsBaseQuery = {
  __typename?: "Query";
  adminProjects: {
    __typename?: "AdminProjectsQueries";
    allProjects: {
      __typename?: "ProjectsConnection";
      nodes: Array<{
        __typename?: "Project";
        id: string;
        code: string;
        label: string;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type AllTopicsBaseQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminTopicsFilter>;
}>;

export type AllTopicsBaseQuery = {
  __typename?: "Query";
  adminDomain: {
    __typename?: "AdminDomainQueries";
    allTopics: {
      __typename?: "TopicsConnection";
      nodes: Array<{
        __typename?: "Topic";
        id: string;
        code: string;
        label: string;
        sortIndex?: number | null | undefined;
        updatedAt: string;
        createdAt: string;
        parent?:
          | { __typename?: "Topic"; id: string; code: string; label: string }
          | null
          | undefined;
        project: {
          __typename?: "Project";
          id: string;
          code: string;
          label: string;
        };
        content: Array<{
          __typename?: "Content";
          id: string;
          code: string;
          label: string;
          tags: Array<string>;
        }>;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type ActionsInfoFragment = {
  __typename?: "Action";
  id: string;
  timestamp: number;
  result?: number | null | undefined;
  stepID?: string | null | undefined;
  hintID?: string | null | undefined;
  amount?: number | null | undefined;
  detail?: string | null | undefined;
  extra?: Record<string, unknown> | null | undefined;
  createdAt: string;
  verb: { __typename?: "ActionVerb"; name: string };
  user?:
    | {
        __typename?: "User";
        id: string;
        name?: string | null | undefined;
        email: string;
      }
    | null
    | undefined;
  content?:
    | {
        __typename?: "Content";
        id: string;
        code: string;
        label: string;
        tags: Array<string>;
      }
    | null
    | undefined;
  topic?:
    | { __typename?: "Topic"; id: string; code: string; label: string }
    | null
    | undefined;
  kcs: Array<{ __typename?: "KC"; id: string; code: string; label: string }>;
};

export type AllActionsQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminActionsFilter>;
}>;

export type AllActionsQuery = {
  __typename?: "Query";
  adminActions: {
    __typename?: "AdminActionQueries";
    allActions: {
      __typename?: "ActionsConnection";
      nodes: Array<{
        __typename?: "Action";
        id: string;
        timestamp: number;
        result?: number | null | undefined;
        stepID?: string | null | undefined;
        hintID?: string | null | undefined;
        amount?: number | null | undefined;
        detail?: string | null | undefined;
        extra?: Record<string, unknown> | null | undefined;
        createdAt: string;
        verb: { __typename?: "ActionVerb"; name: string };
        user?:
          | {
              __typename?: "User";
              id: string;
              name?: string | null | undefined;
              email: string;
            }
          | null
          | undefined;
        content?:
          | {
              __typename?: "Content";
              id: string;
              code: string;
              label: string;
              tags: Array<string>;
            }
          | null
          | undefined;
        topic?:
          | { __typename?: "Topic"; id: string; code: string; label: string }
          | null
          | undefined;
        kcs: Array<{
          __typename?: "KC";
          id: string;
          code: string;
          label: string;
        }>;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type ContentInfoFragment = {
  __typename?: "Content";
  id: string;
  code: string;
  label: string;
  description: string;
  tags: Array<string>;
  binaryBase64?: string | null | undefined;
  binaryFilename?: string | null | undefined;
  json?: Record<string, unknown> | null | undefined;
  url?: string | null | undefined;
  updatedAt: string;
  createdAt: string;
  project: { __typename?: "Project"; id: string; code: string; label: string };
  kcs: Array<{ __typename?: "KC"; id: string; code: string; label: string }>;
  topics: Array<{ __typename?: "Topic"; id: string }>;
};

export type CreateContentMutationVariables = Exact<{
  data: CreateContent;
}>;

export type CreateContentMutation = {
  __typename?: "Mutation";
  adminContent: {
    __typename?: "AdminContentMutations";
    createContent: {
      __typename?: "Content";
      id: string;
      label: string;
      code: string;
    };
  };
};

export type UpdateContentMutationVariables = Exact<{
  data: UpdateContent;
}>;

export type UpdateContentMutation = {
  __typename?: "Mutation";
  adminContent: {
    __typename?: "AdminContentMutations";
    updateContent: { __typename: "Content" };
  };
};

export type AllContentQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminContentFilter>;
}>;

export type AllContentQuery = {
  __typename?: "Query";
  adminContent: {
    __typename?: "AdminContentQueries";
    allContent: {
      __typename?: "ContentConnection";
      nodes: Array<{
        __typename?: "Content";
        id: string;
        code: string;
        label: string;
        description: string;
        tags: Array<string>;
        binaryBase64?: string | null | undefined;
        binaryFilename?: string | null | undefined;
        json?: Record<string, unknown> | null | undefined;
        url?: string | null | undefined;
        updatedAt: string;
        createdAt: string;
        project: {
          __typename?: "Project";
          id: string;
          code: string;
          label: string;
        };
        kcs: Array<{
          __typename?: "KC";
          id: string;
          code: string;
          label: string;
        }>;
        topics: Array<{ __typename?: "Topic"; id: string }>;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type CreateDomainMutationVariables = Exact<{
  data: CreateDomain;
}>;

export type CreateDomainMutation = {
  __typename?: "Mutation";
  adminDomain: {
    __typename?: "AdminDomainMutations";
    createDomain: {
      __typename?: "Domain";
      id: string;
      label: string;
      code: string;
    };
  };
};

export type DomainInfoFragment = {
  __typename: "Domain";
  id: string;
  code: string;
  label: string;
  updatedAt: string;
  createdAt: string;
};

export type AllDomainsQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
}>;

export type AllDomainsQuery = {
  __typename?: "Query";
  adminDomain: {
    __typename?: "AdminDomainQueries";
    allDomains: {
      __typename?: "DomainsConnection";
      nodes: Array<{
        __typename: "Domain";
        id: string;
        code: string;
        label: string;
        updatedAt: string;
        createdAt: string;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type UpdateDomainMutationVariables = Exact<{
  data: UpdateDomain;
}>;

export type UpdateDomainMutation = {
  __typename?: "Mutation";
  adminDomain: {
    __typename?: "AdminDomainMutations";
    updateDomain: { __typename: "Domain" };
  };
};

export type GroupInfoFragment = {
  __typename?: "Group";
  id: string;
  code: string;
  label: string;
  updatedAt: string;
  createdAt: string;
  tags: Array<string>;
  flags: { __typename?: "GroupFlags"; id: string; readProjectActions: boolean };
  projects: Array<{
    __typename?: "Project";
    id: string;
    code: string;
    label: string;
  }>;
  users: Array<{
    __typename?: "User";
    id: string;
    email: string;
    name?: string | null | undefined;
    role: UserRole;
    active: boolean;
    lastOnline?: string | null | undefined;
  }>;
};

export type AllGroupsQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
}>;

export type AllGroupsQuery = {
  __typename?: "Query";
  adminUsers: {
    __typename?: "AdminUserQueries";
    allGroups: {
      __typename?: "GroupsConnection";
      nodes: Array<{
        __typename?: "Group";
        id: string;
        code: string;
        label: string;
        updatedAt: string;
        createdAt: string;
        tags: Array<string>;
        flags: {
          __typename?: "GroupFlags";
          id: string;
          readProjectActions: boolean;
        };
        projects: Array<{
          __typename?: "Project";
          id: string;
          code: string;
          label: string;
        }>;
        users: Array<{
          __typename?: "User";
          id: string;
          email: string;
          name?: string | null | undefined;
          role: UserRole;
          active: boolean;
          lastOnline?: string | null | undefined;
        }>;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type CreateGroupMutationVariables = Exact<{
  data: CreateGroupInput;
}>;

export type CreateGroupMutation = {
  __typename?: "Mutation";
  adminUsers: {
    __typename?: "AdminUserMutations";
    createGroup: {
      __typename?: "Group";
      id: string;
      label: string;
      code: string;
    };
  };
};

export type SetUserGroupsMutationVariables = Exact<{
  usersEmails: Array<Scalars["EmailAddress"]> | Scalars["EmailAddress"];
  groupIds: Array<Scalars["IntID"]> | Scalars["IntID"];
}>;

export type SetUserGroupsMutation = {
  __typename?: "Mutation";
  adminUsers: {
    __typename?: "AdminUserMutations";
    setUserGroups: Array<{ __typename: "Group" }>;
  };
};

export type UpdateGroupMutationVariables = Exact<{
  data: UpdateGroupInput;
}>;

export type UpdateGroupMutation = {
  __typename?: "Mutation";
  adminUsers: {
    __typename?: "AdminUserMutations";
    updateGroup: { __typename: "Group" };
  };
};

export type KcInfoFragment = {
  __typename?: "KC";
  id: string;
  code: string;
  label: string;
  updatedAt: string;
  createdAt: string;
  domain: { __typename?: "Domain"; id: string; code: string; label: string };
};

export type CreateKcMutationVariables = Exact<{
  data: CreateKcInput;
}>;

export type CreateKcMutation = {
  __typename?: "Mutation";
  adminDomain: {
    __typename?: "AdminDomainMutations";
    createKC: { __typename?: "KC"; id: string; label: string; code: string };
  };
};

export type AllKCsQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminKCsFilter>;
}>;

export type AllKCsQuery = {
  __typename?: "Query";
  adminDomain: {
    __typename?: "AdminDomainQueries";
    allKCs: {
      __typename?: "KCsConnection";
      nodes: Array<{
        __typename?: "KC";
        id: string;
        code: string;
        label: string;
        updatedAt: string;
        createdAt: string;
        domain: {
          __typename?: "Domain";
          id: string;
          code: string;
          label: string;
        };
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type UpdateKcMutationVariables = Exact<{
  data: UpdateKcInput;
}>;

export type UpdateKcMutation = {
  __typename?: "Mutation";
  adminDomain: {
    __typename?: "AdminDomainMutations";
    updateKC: { __typename: "KC" };
  };
};

export type ProjectInfoFragment = {
  __typename: "Project";
  id: string;
  code: string;
  label: string;
  updatedAt: string;
  createdAt: string;
  domains: Array<{
    __typename?: "Domain";
    id: string;
    code: string;
    label: string;
  }>;
};

export type AllProjectsQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
}>;

export type AllProjectsQuery = {
  __typename?: "Query";
  adminProjects: {
    __typename?: "AdminProjectsQueries";
    allProjects: {
      __typename?: "ProjectsConnection";
      nodes: Array<{
        __typename: "Project";
        id: string;
        code: string;
        label: string;
        updatedAt: string;
        createdAt: string;
        domains: Array<{
          __typename?: "Domain";
          id: string;
          code: string;
          label: string;
        }>;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type CreateProjectMutationVariables = Exact<{
  data: CreateProject;
}>;

export type CreateProjectMutation = {
  __typename?: "Mutation";
  adminProjects: {
    __typename?: "AdminProjectsMutations";
    createProject: {
      __typename?: "Project";
      id: string;
      label: string;
      code: string;
    };
  };
};

export type UpdateProjectMutationVariables = Exact<{
  data: UpdateProject;
}>;

export type UpdateProjectMutation = {
  __typename?: "Mutation";
  adminProjects: {
    __typename?: "AdminProjectsMutations";
    updateProject: { __typename: "Project" };
  };
};

export type CreateTopicMutationVariables = Exact<{
  data: CreateTopic;
}>;

export type CreateTopicMutation = {
  __typename?: "Mutation";
  adminDomain: {
    __typename?: "AdminDomainMutations";
    createTopic: {
      __typename?: "Topic";
      id: string;
      label: string;
      code: string;
    };
  };
};

export type UpdateTopicMutationVariables = Exact<{
  data: UpdateTopic;
}>;

export type UpdateTopicMutation = {
  __typename?: "Mutation";
  adminDomain: {
    __typename?: "AdminDomainMutations";
    updateTopic: {
      __typename?: "Topic";
      id: string;
      code: string;
      label: string;
    };
  };
};

export type UserInfoFragment = {
  __typename: "User";
  id: string;
  email: string;
  name?: string | null | undefined;
  active: boolean;
  lastOnline?: string | null | undefined;
  createdAt: string;
  role: UserRole;
  enabled: boolean;
  updatedAt: string;
  locked: boolean;
  tags: Array<string>;
  projects: Array<{
    __typename?: "Project";
    id: string;
    code: string;
    label: string;
  }>;
};

export type AdminUsersQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
}>;

export type AdminUsersQuery = {
  __typename?: "Query";
  adminUsers: {
    __typename?: "AdminUserQueries";
    allUsers: {
      __typename?: "UsersConnection";
      nodes: Array<{
        __typename: "User";
        id: string;
        email: string;
        name?: string | null | undefined;
        active: boolean;
        lastOnline?: string | null | undefined;
        createdAt: string;
        role: UserRole;
        enabled: boolean;
        updatedAt: string;
        locked: boolean;
        tags: Array<string>;
        projects: Array<{
          __typename?: "Project";
          id: string;
          code: string;
          label: string;
        }>;
      }>;
      pageInfo: {
        __typename?: "PageInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor?: string | null | undefined;
        endCursor?: string | null | undefined;
      };
    };
  };
};

export type UpsertUsersWithProjectsMutationVariables = Exact<{
  emails: Array<Scalars["EmailAddress"]> | Scalars["EmailAddress"];
  projectsIds: Array<Scalars["IntID"]> | Scalars["IntID"];
}>;

export type UpsertUsersWithProjectsMutation = {
  __typename?: "Mutation";
  adminUsers: {
    __typename?: "AdminUserMutations";
    upsertUsersWithProjects: Array<{
      __typename: "User";
      id: string;
      email: string;
      name?: string | null | undefined;
      active: boolean;
      lastOnline?: string | null | undefined;
      createdAt: string;
      role: UserRole;
      enabled: boolean;
      updatedAt: string;
      locked: boolean;
      tags: Array<string>;
      projects: Array<{
        __typename?: "Project";
        id: string;
        code: string;
        label: string;
      }>;
    }>;
  };
};

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  adminUsers: {
    __typename?: "AdminUserMutations";
    updateUser: { __typename: "User" };
  };
};

export const PaginationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "Pagination" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Connection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pageInfo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hasPreviousPage" },
                },
                { kind: "Field", name: { kind: "Name", value: "startCursor" } },
                { kind: "Field", name: { kind: "Name", value: "endCursor" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaginationFragment, unknown>;
export const ActionsInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ActionsInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Action" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "verb" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "timestamp" } },
          { kind: "Field", name: { kind: "Name", value: "result" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "content" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "tags" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "topic" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "kcs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "stepID" } },
          { kind: "Field", name: { kind: "Name", value: "hintID" } },
          { kind: "Field", name: { kind: "Name", value: "amount" } },
          { kind: "Field", name: { kind: "Name", value: "detail" } },
          { kind: "Field", name: { kind: "Name", value: "extra" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ActionsInfoFragment, unknown>;
export const ContentInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ContentInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Content" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "tags" } },
          { kind: "Field", name: { kind: "Name", value: "binaryBase64" } },
          { kind: "Field", name: { kind: "Name", value: "binaryFilename" } },
          { kind: "Field", name: { kind: "Name", value: "json" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "project" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "kcs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "topics" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContentInfoFragment, unknown>;
export const DomainInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DomainInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Domain" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DomainInfoFragment, unknown>;
export const GroupInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "GroupInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "tags" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "flags" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "readProjectActions" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "projects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "active" } },
                { kind: "Field", name: { kind: "Name", value: "lastOnline" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupInfoFragment, unknown>;
export const KcInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "KCInfo" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "KC" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "label" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "domain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<KcInfoFragment, unknown>;
export const ProjectInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ProjectInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Project" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "domains" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectInfoFragment, unknown>;
export const UserInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "lastOnline" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "role" } },
          { kind: "Field", name: { kind: "Name", value: "enabled" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "locked" } },
          { kind: "Field", name: { kind: "Name", value: "tags" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "projects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoFragment, unknown>;
export const CurrentUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "currentUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "picture" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const AllContentBaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllContentBase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AdminContentFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allContent" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tags" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllContentBaseQuery, AllContentBaseQueryVariables>;
export const AllDomainsBaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllDomainsBase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AdminDomainsFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allDomains" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllDomainsBaseQuery, AllDomainsBaseQueryVariables>;
export const AllGroupsBaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllGroupsBase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allGroups" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllGroupsBaseQuery, AllGroupsBaseQueryVariables>;
export const AllKCsBaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllKCsBase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AdminKCsFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allKCs" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllKCsBaseQuery, AllKCsBaseQueryVariables>;
export const AllProjectsBaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllProjectsBase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminProjects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allProjects" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AllProjectsBaseQuery,
  AllProjectsBaseQueryVariables
>;
export const AllTopicsBaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllTopicsBase" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AdminTopicsFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allTopics" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sortIndex" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "parent" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "code" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "project" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "code" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "content" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "code" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "tags" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "updatedAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllTopicsBaseQuery, AllTopicsBaseQueryVariables>;
export const AllActionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllActions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AdminActionsFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminActions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allActions" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ActionsInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ActionsInfoFragmentDoc.definitions,
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllActionsQuery, AllActionsQueryVariables>;
export const CreateContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateContent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateContent" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createContent" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateContentMutation,
  CreateContentMutationVariables
>;
export const UpdateContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateContent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateContent" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContent" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateContentMutation,
  UpdateContentMutationVariables
>;
export const AllContentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllContent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AdminContentFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminContent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allContent" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ContentInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ContentInfoFragmentDoc.definitions,
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllContentQuery, AllContentQueryVariables>;
export const CreateDomainDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDomain" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateDomain" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createDomain" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "input" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDomainMutation,
  CreateDomainMutationVariables
>;
export const AllDomainsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllDomains" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allDomains" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "DomainInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...DomainInfoFragmentDoc.definitions,
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllDomainsQuery, AllDomainsQueryVariables>;
export const UpdateDomainDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateDomain" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateDomain" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateDomain" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "input" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateDomainMutation,
  UpdateDomainMutationVariables
>;
export const AllGroupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllGroups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allGroups" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "GroupInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...GroupInfoFragmentDoc.definitions,
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllGroupsQuery, AllGroupsQueryVariables>;
export const CreateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateGroupInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createGroup" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const SetUserGroupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetUserGroups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "usersEmails" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "EmailAddress" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "groupIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "IntID" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "setUserGroups" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "usersEmails" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "usersEmails" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "groupIds" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "groupIds" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetUserGroupsMutation,
  SetUserGroupsMutationVariables
>;
export const UpdateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateGroupInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateGroup" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const CreateKcDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateKC" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateKCInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createKC" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateKcMutation, CreateKcMutationVariables>;
export const AllKCsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllKCs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filters" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AdminKCsFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allKCs" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filters" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "KCInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...KcInfoFragmentDoc.definitions,
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllKCsQuery, AllKCsQueryVariables>;
export const UpdateKcDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateKC" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateKCInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateKC" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateKcMutation, UpdateKcMutationVariables>;
export const AllProjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllProjects" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminProjects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allProjects" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ProjectInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ProjectInfoFragmentDoc.definitions,
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AllProjectsQuery, AllProjectsQueryVariables>;
export const CreateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateProject" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminProjects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createProject" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
export const UpdateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateProject" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminProjects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateProject" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>;
export const CreateTopicDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTopic" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTopic" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createTopic" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "input" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTopicMutation, CreateTopicMutationVariables>;
export const UpdateTopicDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTopic" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTopic" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateTopic" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "input" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTopicMutation, UpdateTopicMutationVariables>;
export const AdminUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminUsers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pagination" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CursorConnectionArgs" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "allUsers" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "pagination" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pagination" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nodes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "UserInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "Pagination" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserInfoFragmentDoc.definitions,
    ...PaginationFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<AdminUsersQuery, AdminUsersQueryVariables>;
export const UpsertUsersWithProjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpsertUsersWithProjects" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "emails" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "EmailAddress" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "projectsIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "IntID" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "upsertUsersWithProjects" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "emails" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "emails" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "projectsIds" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "projectsIds" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "UserInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserInfoFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  UpsertUsersWithProjectsMutation,
  UpsertUsersWithProjectsMutationVariables
>;
export const UpdateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateUser" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "data" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "data" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
