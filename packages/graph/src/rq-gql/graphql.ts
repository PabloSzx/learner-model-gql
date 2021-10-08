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
  activity: ActionActivity;
  id: Scalars["IntID"];
  result?: Maybe<Scalars["Float"]>;
  timestamp: Scalars["Timestamp"];
  user?: Maybe<User>;
  verb: ActionVerb;
};

export type ActionActivity = {
  __typename?: "ActionActivity";
  amount?: Maybe<Scalars["Float"]>;
  content?: Maybe<Content>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
  hintID?: Maybe<Scalars["ID"]>;
  id: Scalars["IntID"];
  stepID?: Maybe<Scalars["ID"]>;
  topic?: Maybe<Topic>;
};

export type ActionActivityInput = {
  amount?: Maybe<Scalars["Float"]>;
  contentID?: Maybe<Scalars["IntID"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
  hintID?: Maybe<Scalars["ID"]>;
  stepID?: Maybe<Scalars["ID"]>;
  topicID?: Maybe<Scalars["IntID"]>;
};

export type ActionInput = {
  activity: ActionActivityInput;
  projectId: Scalars["IntID"];
  timestamp: Scalars["Timestamp"];
  verbName: Scalars["String"];
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

export type AdminActionQueries = {
  __typename?: "AdminActionQueries";
  allActions: ActionsConnection;
};

export type AdminActionQueriesAllActionsArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminContentMutations = {
  __typename?: "AdminContentMutations";
  createContent: Content;
};

export type AdminContentMutationsCreateContentArgs = {
  data: CreateContent;
};

export type AdminContentQueries = {
  __typename?: "AdminContentQueries";
  allContent: ContentConnection;
};

export type AdminContentQueriesAllContentArgs = {
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
  pagination: CursorConnectionArgs;
};

export type AdminDomainQueriesAllKCsArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminDomainQueriesAllTopicsArgs = {
  pagination: CursorConnectionArgs;
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

export type AdminUserMutations = {
  __typename?: "AdminUserMutations";
  createGroup: Group;
  setProjectsToUsers: Array<User>;
  setUserGroups: Array<Group>;
  updateGroup: Group;
  updateUser: User;
  /** Upsert specified users with specified project */
  upsertUsersWithProject: Array<User>;
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

export type AdminUserMutationsUpsertUsersWithProjectArgs = {
  emails: Array<Scalars["EmailAddress"]>;
  projectId?: Maybe<Scalars["IntID"]>;
};

export type AdminUserQueries = {
  __typename?: "AdminUserQueries";
  allGroups: GroupsConnection;
  allUsers: UsersConnection;
};

export type AdminUserQueriesAllGroupsArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminUserQueriesAllUsersArgs = {
  pagination: CursorConnectionArgs;
};

export type Connection = {
  pageInfo: PageInfo;
};

export type Content = {
  __typename?: "Content";
  binaryBase64?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  domain: Domain;
  id: Scalars["IntID"];
  json?: Maybe<Scalars["JSONObject"]>;
  project: Project;
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
  description: Scalars["String"];
  domainId: Scalars["IntID"];
  json?: Maybe<Scalars["JSONObject"]>;
  projectId: Scalars["IntID"];
  topicId?: Maybe<Scalars["IntID"]>;
  url?: Maybe<Scalars["String"]>;
};

export type CreateDomain = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectId: Scalars["IntID"];
};

export type CreateGroupInput = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
};

export type CreateKcInput = {
  code: Scalars["String"];
  domainId: Scalars["IntID"];
  label: Scalars["String"];
};

export type CreateProject = {
  code: Scalars["String"];
  label: Scalars["String"];
};

export type CreateTopic = {
  code: Scalars["String"];
  domainId: Scalars["IntID"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  projectId: Scalars["IntID"];
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
  content: ContentConnection;
  createdAt: Scalars["DateTime"];
  id: Scalars["IntID"];
  kcs: Array<Kc>;
  label: Scalars["String"];
  project: Project;
  topics: Array<Topic>;
  updatedAt: Scalars["DateTime"];
};

export type DomainContentArgs = {
  pagination: CursorConnectionArgs;
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
  id: Scalars["IntID"];
  label: Scalars["String"];
  projects: Array<Project>;
  projectsIds: Array<Scalars["IntID"]>;
  updatedAt: Scalars["DateTime"];
  users: Array<User>;
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

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
};

export type Project = {
  __typename?: "Project";
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  domains: Array<Domain>;
  id: Scalars["IntID"];
  label: Scalars["String"];
  updatedAt: Scalars["DateTime"];
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
  content: ContentConnection;
  createdAt: Scalars["DateTime"];
  domain: Domain;
  id: Scalars["IntID"];
  kcs: Array<Kc>;
  label: Scalars["String"];
  parent?: Maybe<Topic>;
  project: Project;
  updatedAt: Scalars["DateTime"];
};

export type TopicContentArgs = {
  pagination: CursorConnectionArgs;
};

export type TopicsConnection = Connection & {
  __typename?: "TopicsConnection";
  nodes: Array<Topic>;
  pageInfo: PageInfo;
};

export type UpdateDomain = {
  code: Scalars["String"];
  id: Scalars["IntID"];
  label: Scalars["String"];
};

export type UpdateGroupInput = {
  code: Scalars["String"];
  id: Scalars["IntID"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
};

export type UpdateKcInput = {
  code: Scalars["String"];
  id: Scalars["IntID"];
  label: Scalars["String"];
};

export type UpdateProject = {
  code: Scalars["String"];
  id: Scalars["IntID"];
  label: Scalars["String"];
};

export type UpdateTopic = {
  code: Scalars["String"];
  domainId: Scalars["IntID"];
  id: Scalars["IntID"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  projectId: Scalars["IntID"];
};

export type UpdateUserInput = {
  id: Scalars["IntID"];
  locked: Scalars["Boolean"];
  projectIds: Array<Scalars["IntID"]>;
  role: UserRole;
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
  projects: Array<Project>;
  projectsIds: Array<Scalars["IntID"]>;
  role: UserRole;
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

export type UserInfoCardFragment = {
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

export type AdminUsersCardsQueryVariables = Exact<{
  pagination: CursorConnectionArgs;
}>;

export type AdminUsersCardsQuery = {
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
  project: { __typename?: "Project"; id: string; code: string; label: string };
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
        project: {
          __typename?: "Project";
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

export type ProjectInfoFragment = {
  __typename: "Project";
  id: string;
  code: string;
  label: string;
  updatedAt: string;
  createdAt: string;
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
  projectId?: Maybe<Scalars["IntID"]>;
}>;

export type UpsertUsersWithProjectsMutation = {
  __typename?: "Mutation";
  adminUsers: {
    __typename?: "AdminUserMutations";
    upsertUsersWithProject: Array<{
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
      projects: Array<{
        __typename?: "Project";
        id: string;
        code: string;
        label: string;
      }>;
    }>;
  };
};

export const UserInfoCardFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserInfoCard" },
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoCardFragment, unknown>;
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
export const AdminUsersCardsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminUsersCards" },
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
                        kind: "Field",
                        name: { kind: "Name", value: "pageInfo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "hasNextPage" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "hasPreviousPage" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "startCursor" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "endCursor" },
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
      },
    },
    ...UserInfoFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  AdminUsersCardsQuery,
  AdminUsersCardsQueryVariables
>;
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
            name: { kind: "Name", value: "projectId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "IntID" } },
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
                  name: { kind: "Name", value: "upsertUsersWithProject" },
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
                      name: { kind: "Name", value: "projectId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "projectId" },
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
