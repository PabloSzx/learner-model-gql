import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { EZContext } from "graphql-ez";
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
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import("graphql-ez").DeepPartial<TResult>>
  | import("graphql-ez").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string | number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string | Date;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: Date;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Represents NULL values */
  Void: unknown;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** ID that parses as non-negative integer, serializes to string, and can be passed as string or number */
  IntID: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  groups: Array<Group>;
  adminUsers: AdminUserQueries;
  currentUser?: Maybe<User>;
  users: Array<User>;
  adminActions: AdminActionQueries;
  adminContent: AdminContentQueries;
  content: Array<Content>;
  topics: Array<Topic>;
  domains: Array<Domain>;
  adminDomain: AdminDomainQueries;
  kcs: Array<Kc>;
  projects: Array<Project>;
  adminProjects: AdminProjectsQueries;
  hello2: Scalars["String"];
};

export type QueryGroupsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryUsersArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryContentArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryTopicsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryDomainsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryKcsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryProjectsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  hello: Scalars["String"];
  adminUsers: AdminUserMutations;
  action?: Maybe<Scalars["Void"]>;
  adminContent: AdminContentMutations;
  adminDomain: AdminDomainMutations;
  adminProjects: AdminProjectsMutations;
};

export type MutationActionArgs = {
  data: ActionInput;
};

export type Subscription = {
  __typename?: "Subscription";
  hello: Scalars["String"];
};

export type Group = {
  __typename?: "Group";
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  users: Array<User>;
  tags: Array<Scalars["String"]>;
  flags: GroupFlags;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  projectsIds: Array<Scalars["IntID"]>;
  projects: Array<Project>;
};

export type GroupFlags = {
  __typename?: "GroupFlags";
  id: Scalars["IntID"];
  readProjectActions: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type GroupFlagsInput = {
  readProjectActions: Scalars["Boolean"];
};

export type CreateGroupInput = {
  code: Scalars["String"];
  label: Scalars["String"];
  tags: Array<Scalars["String"]>;
  projectIds: Array<Scalars["IntID"]>;
  flags?: Maybe<GroupFlagsInput>;
};

export type UpdateGroupInput = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  tags: Array<Scalars["String"]>;
  projectIds: Array<Scalars["IntID"]>;
  flags?: Maybe<GroupFlagsInput>;
};

export type GroupsConnection = Connection & {
  __typename?: "GroupsConnection";
  nodes: Array<Group>;
  pageInfo: PageInfo;
};

export type UserRole = "ADMIN" | "USER";

export type User = {
  __typename?: "User";
  id: Scalars["IntID"];
  enabled: Scalars["Boolean"];
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  locked: Scalars["Boolean"];
  active: Scalars["Boolean"];
  lastOnline?: Maybe<Scalars["DateTime"]>;
  tags: Array<Scalars["String"]>;
  role: UserRole;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  groups: Array<Group>;
  projectsIds: Array<Scalars["IntID"]>;
  projects: Array<Project>;
};

export type UsersConnection = Connection & {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
};

export type AdminUsersFilter = {
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type AdminUserQueries = {
  __typename?: "AdminUserQueries";
  allUsers: UsersConnection;
  allGroups: GroupsConnection;
};

export type AdminUserQueriesAllUsersArgs = {
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminUsersFilter>;
};

export type AdminUserQueriesAllGroupsArgs = {
  pagination: CursorConnectionArgs;
};

export type UpdateUserInput = {
  id: Scalars["IntID"];
  name?: Maybe<Scalars["String"]>;
  role: UserRole;
  locked: Scalars["Boolean"];
  projectIds: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
};

export type AdminUserMutations = {
  __typename?: "AdminUserMutations";
  /** Upsert specified users with specified project */
  upsertUsersWithProjects: Array<User>;
  updateUser: User;
  setUserGroups: Array<Group>;
  createGroup: Group;
  updateGroup: Group;
  setProjectsToUsers: Array<User>;
};

export type AdminUserMutationsUpsertUsersWithProjectsArgs = {
  emails: Array<Scalars["EmailAddress"]>;
  projectsIds: Array<Scalars["IntID"]>;
};

export type AdminUserMutationsUpdateUserArgs = {
  data: UpdateUserInput;
};

export type AdminUserMutationsSetUserGroupsArgs = {
  usersEmails: Array<Scalars["EmailAddress"]>;
  groupIds: Array<Scalars["IntID"]>;
};

export type AdminUserMutationsCreateGroupArgs = {
  data: CreateGroupInput;
};

export type AdminUserMutationsUpdateGroupArgs = {
  data: UpdateGroupInput;
};

export type AdminUserMutationsSetProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
};

export type Node = {
  id: Scalars["IntID"];
};

export type Connection = {
  pageInfo: PageInfo;
};

export type CursorConnectionArgs = {
  first?: Maybe<Scalars["NonNegativeInt"]>;
  after?: Maybe<Scalars["IntID"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
  before?: Maybe<Scalars["IntID"]>;
};

export type ActionVerb = {
  __typename?: "ActionVerb";
  id: Scalars["IntID"];
  name: Scalars["String"];
};

export type Content = {
  __typename?: "Content";
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  description: Scalars["String"];
  binaryBase64?: Maybe<Scalars["String"]>;
  binaryFilename?: Maybe<Scalars["String"]>;
  json?: Maybe<Scalars["JSONObject"]>;
  url?: Maybe<Scalars["String"]>;
  sortIndex?: Maybe<Scalars["Int"]>;
  tags: Array<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  topics: Array<Topic>;
  kcs: Array<Kc>;
  project: Project;
};

export type Kc = {
  __typename?: "KC";
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  domain: Domain;
  topics: Array<Topic>;
};

export type Domain = {
  __typename?: "Domain";
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  topics: Array<Topic>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  kcs: Array<Kc>;
  projects: Array<Project>;
};

export type Topic = {
  __typename?: "Topic";
  id: Scalars["IntID"];
  content: Array<Content>;
  code: Scalars["String"];
  label: Scalars["String"];
  sortIndex?: Maybe<Scalars["Int"]>;
  parent?: Maybe<Topic>;
  childrens: Array<Topic>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  kcs: Array<Kc>;
  project: Project;
};

export type ActionInput = {
  contentID?: Maybe<Scalars["ID"]>;
  topicID?: Maybe<Scalars["ID"]>;
  kcsIDs?: Maybe<Array<Scalars["ID"]>>;
  stepID?: Maybe<Scalars["ID"]>;
  hintID?: Maybe<Scalars["ID"]>;
  amount?: Maybe<Scalars["Float"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
  verbName: Scalars["String"];
  timestamp: Scalars["Timestamp"];
  projectId: Scalars["IntID"];
  result?: Maybe<Scalars["Float"]>;
};

export type Action = {
  __typename?: "Action";
  id: Scalars["IntID"];
  verb: ActionVerb;
  timestamp: Scalars["Timestamp"];
  result?: Maybe<Scalars["Float"]>;
  user?: Maybe<User>;
  content?: Maybe<Content>;
  topic?: Maybe<Topic>;
  kcs: Array<Kc>;
  stepID?: Maybe<Scalars["ID"]>;
  hintID?: Maybe<Scalars["ID"]>;
  amount?: Maybe<Scalars["Float"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
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

export type CreateContent = {
  description: Scalars["String"];
  code: Scalars["String"];
  label: Scalars["String"];
  projectId: Scalars["IntID"];
  binaryBase64?: Maybe<Scalars["String"]>;
  binaryFilename?: Maybe<Scalars["String"]>;
  json?: Maybe<Scalars["JSONObject"]>;
  url?: Maybe<Scalars["URL"]>;
  topics: Array<Scalars["IntID"]>;
  kcs: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
};

export type UpdateContent = {
  id: Scalars["IntID"];
  description: Scalars["String"];
  code: Scalars["String"];
  label: Scalars["String"];
  projectId: Scalars["IntID"];
  binaryBase64?: Maybe<Scalars["String"]>;
  binaryFilename?: Maybe<Scalars["String"]>;
  json?: Maybe<Scalars["JSONObject"]>;
  url?: Maybe<Scalars["URL"]>;
  topics: Array<Scalars["IntID"]>;
  kcs: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
};

export type ContentConnection = Connection & {
  __typename?: "ContentConnection";
  nodes: Array<Content>;
  pageInfo: PageInfo;
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

export type AdminContentFilter = {
  tags?: Maybe<Array<Scalars["String"]>>;
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type AdminContentQueries = {
  __typename?: "AdminContentQueries";
  allContent: ContentConnection;
};

export type AdminContentQueriesAllContentArgs = {
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminContentFilter>;
};

export type TopicsConnection = Connection & {
  __typename?: "TopicsConnection";
  nodes: Array<Topic>;
  pageInfo: PageInfo;
};

export type DomainsConnection = Connection & {
  __typename?: "DomainsConnection";
  nodes: Array<Domain>;
  pageInfo: PageInfo;
};

export type AdminDomainsFilter = {
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type AdminTopicsFilter = {
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type AdminDomainQueries = {
  __typename?: "AdminDomainQueries";
  allTopics: TopicsConnection;
  allDomains: DomainsConnection;
  allKCs: KCsConnection;
};

export type AdminDomainQueriesAllTopicsArgs = {
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminTopicsFilter>;
};

export type AdminDomainQueriesAllDomainsArgs = {
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminDomainsFilter>;
};

export type AdminDomainQueriesAllKCsArgs = {
  pagination: CursorConnectionArgs;
  filters?: Maybe<AdminKCsFilter>;
};

export type CreateDomain = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectsIds: Array<Scalars["IntID"]>;
};

export type UpdateDomain = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
};

export type CreateTopic = {
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  projectId: Scalars["IntID"];
  contentIds: Array<Scalars["IntID"]>;
  sortIndex?: Maybe<Scalars["Int"]>;
};

export type UpdateTopic = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  contentIds: Array<Scalars["IntID"]>;
  sortIndex?: Maybe<Scalars["Int"]>;
};

export type AdminDomainMutations = {
  __typename?: "AdminDomainMutations";
  createDomain: Domain;
  updateDomain: Domain;
  createTopic: Topic;
  updateTopic: Topic;
  createKC: Kc;
  updateKC: Kc;
};

export type AdminDomainMutationsCreateDomainArgs = {
  input: CreateDomain;
};

export type AdminDomainMutationsUpdateDomainArgs = {
  input: UpdateDomain;
};

export type AdminDomainMutationsCreateTopicArgs = {
  input: CreateTopic;
};

export type AdminDomainMutationsUpdateTopicArgs = {
  input: UpdateTopic;
};

export type AdminDomainMutationsCreateKcArgs = {
  data: CreateKcInput;
};

export type AdminDomainMutationsUpdateKcArgs = {
  data: UpdateKcInput;
};

export type KCsConnection = Connection & {
  __typename?: "KCsConnection";
  nodes: Array<Kc>;
  pageInfo: PageInfo;
};

export type AdminKCsFilter = {
  domains?: Maybe<Array<Scalars["IntID"]>>;
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type CreateKcInput = {
  code: Scalars["String"];
  label: Scalars["String"];
  domainId: Scalars["IntID"];
};

export type UpdateKcInput = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
};

export type Project = {
  __typename?: "Project";
  id: Scalars["IntID"];
  domains: Array<Domain>;
  code: Scalars["String"];
  label: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type ProjectsConnection = Connection & {
  __typename?: "ProjectsConnection";
  nodes: Array<Project>;
  pageInfo: PageInfo;
};

export type AdminProjectsQueries = {
  __typename?: "AdminProjectsQueries";
  allProjects: ProjectsConnection;
};

export type AdminProjectsQueriesAllProjectsArgs = {
  pagination: CursorConnectionArgs;
};

export type CreateProject = {
  code: Scalars["String"];
  label: Scalars["String"];
  domains: Array<Scalars["IntID"]>;
};

export type UpdateProject = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  domains: Array<Scalars["IntID"]>;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  Group: ResolverTypeWrapper<Group>;
  GroupFlags: ResolverTypeWrapper<GroupFlags>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  GroupFlagsInput: GroupFlagsInput;
  CreateGroupInput: CreateGroupInput;
  UpdateGroupInput: UpdateGroupInput;
  GroupsConnection: ResolverTypeWrapper<GroupsConnection>;
  UserRole: UserRole;
  User: ResolverTypeWrapper<User>;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  AdminUsersFilter: AdminUsersFilter;
  AdminUserQueries: ResolverTypeWrapper<AdminUserQueries>;
  UpdateUserInput: UpdateUserInput;
  AdminUserMutations: ResolverTypeWrapper<AdminUserMutations>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Node: never;
  Connection:
    | ResolversTypes["GroupsConnection"]
    | ResolversTypes["UsersConnection"]
    | ResolversTypes["ContentConnection"]
    | ResolversTypes["TopicsConnection"]
    | ResolversTypes["DomainsConnection"]
    | ResolversTypes["KCsConnection"]
    | ResolversTypes["ProjectsConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  ActionVerb: ResolverTypeWrapper<ActionVerb>;
  Content: ResolverTypeWrapper<Content>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  KC: ResolverTypeWrapper<Kc>;
  Domain: ResolverTypeWrapper<Domain>;
  Topic: ResolverTypeWrapper<Topic>;
  ActionInput: ActionInput;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Action: ResolverTypeWrapper<Action>;
  ActionsConnection: ResolverTypeWrapper<ActionsConnection>;
  AdminActionQueries: ResolverTypeWrapper<AdminActionQueries>;
  CreateContent: CreateContent;
  UpdateContent: UpdateContent;
  ContentConnection: ResolverTypeWrapper<ContentConnection>;
  AdminContentMutations: ResolverTypeWrapper<AdminContentMutations>;
  AdminContentFilter: AdminContentFilter;
  AdminContentQueries: ResolverTypeWrapper<AdminContentQueries>;
  TopicsConnection: ResolverTypeWrapper<TopicsConnection>;
  DomainsConnection: ResolverTypeWrapper<DomainsConnection>;
  AdminDomainsFilter: AdminDomainsFilter;
  AdminTopicsFilter: AdminTopicsFilter;
  AdminDomainQueries: ResolverTypeWrapper<AdminDomainQueries>;
  CreateDomain: CreateDomain;
  UpdateDomain: UpdateDomain;
  CreateTopic: CreateTopic;
  UpdateTopic: UpdateTopic;
  AdminDomainMutations: ResolverTypeWrapper<AdminDomainMutations>;
  KCsConnection: ResolverTypeWrapper<KCsConnection>;
  AdminKCsFilter: AdminKCsFilter;
  CreateKCInput: CreateKcInput;
  UpdateKCInput: UpdateKcInput;
  Project: ResolverTypeWrapper<Project>;
  ProjectsConnection: ResolverTypeWrapper<ProjectsConnection>;
  AdminProjectsQueries: ResolverTypeWrapper<AdminProjectsQueries>;
  CreateProject: CreateProject;
  UpdateProject: UpdateProject;
  AdminProjectsMutations: ResolverTypeWrapper<AdminProjectsMutations>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  Mutation: {};
  Subscription: {};
  DateTime: Scalars["DateTime"];
  Timestamp: Scalars["Timestamp"];
  JSONObject: Scalars["JSONObject"];
  NonNegativeInt: Scalars["NonNegativeInt"];
  Void: Scalars["Void"];
  URL: Scalars["URL"];
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  Group: Group;
  GroupFlags: GroupFlags;
  Boolean: Scalars["Boolean"];
  GroupFlagsInput: GroupFlagsInput;
  CreateGroupInput: CreateGroupInput;
  UpdateGroupInput: UpdateGroupInput;
  GroupsConnection: GroupsConnection;
  User: User;
  UsersConnection: UsersConnection;
  AdminUsersFilter: AdminUsersFilter;
  AdminUserQueries: AdminUserQueries;
  UpdateUserInput: UpdateUserInput;
  AdminUserMutations: AdminUserMutations;
  PageInfo: PageInfo;
  Node: never;
  Connection:
    | ResolversParentTypes["GroupsConnection"]
    | ResolversParentTypes["UsersConnection"]
    | ResolversParentTypes["ContentConnection"]
    | ResolversParentTypes["TopicsConnection"]
    | ResolversParentTypes["DomainsConnection"]
    | ResolversParentTypes["KCsConnection"]
    | ResolversParentTypes["ProjectsConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  ActionVerb: ActionVerb;
  Content: Content;
  Int: Scalars["Int"];
  KC: Kc;
  Domain: Domain;
  Topic: Topic;
  ActionInput: ActionInput;
  ID: Scalars["ID"];
  Float: Scalars["Float"];
  Action: Action;
  ActionsConnection: ActionsConnection;
  AdminActionQueries: AdminActionQueries;
  CreateContent: CreateContent;
  UpdateContent: UpdateContent;
  ContentConnection: ContentConnection;
  AdminContentMutations: AdminContentMutations;
  AdminContentFilter: AdminContentFilter;
  AdminContentQueries: AdminContentQueries;
  TopicsConnection: TopicsConnection;
  DomainsConnection: DomainsConnection;
  AdminDomainsFilter: AdminDomainsFilter;
  AdminTopicsFilter: AdminTopicsFilter;
  AdminDomainQueries: AdminDomainQueries;
  CreateDomain: CreateDomain;
  UpdateDomain: UpdateDomain;
  CreateTopic: CreateTopic;
  UpdateTopic: UpdateTopic;
  AdminDomainMutations: AdminDomainMutations;
  KCsConnection: KCsConnection;
  AdminKCsFilter: AdminKCsFilter;
  CreateKCInput: CreateKcInput;
  UpdateKCInput: UpdateKcInput;
  Project: Project;
  ProjectsConnection: ProjectsConnection;
  AdminProjectsQueries: AdminProjectsQueries;
  CreateProject: CreateProject;
  UpdateProject: UpdateProject;
  AdminProjectsMutations: AdminProjectsMutations;
};

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  groups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupsArgs, "ids">
  >;
  adminUsers?: Resolver<
    ResolversTypes["AdminUserQueries"],
    ParentType,
    ContextType
  >;
  currentUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, "ids">
  >;
  adminActions?: Resolver<
    ResolversTypes["AdminActionQueries"],
    ParentType,
    ContextType
  >;
  adminContent?: Resolver<
    ResolversTypes["AdminContentQueries"],
    ParentType,
    ContextType
  >;
  content?: Resolver<
    Array<ResolversTypes["Content"]>,
    ParentType,
    ContextType,
    RequireFields<QueryContentArgs, "ids">
  >;
  topics?: Resolver<
    Array<ResolversTypes["Topic"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTopicsArgs, "ids">
  >;
  domains?: Resolver<
    Array<ResolversTypes["Domain"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDomainsArgs, "ids">
  >;
  adminDomain?: Resolver<
    ResolversTypes["AdminDomainQueries"],
    ParentType,
    ContextType
  >;
  kcs?: Resolver<
    Array<ResolversTypes["KC"]>,
    ParentType,
    ContextType,
    RequireFields<QueryKcsArgs, "ids">
  >;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectsArgs, "ids">
  >;
  adminProjects?: Resolver<
    ResolversTypes["AdminProjectsQueries"],
    ParentType,
    ContextType
  >;
  hello2?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  adminUsers?: Resolver<
    ResolversTypes["AdminUserMutations"],
    ParentType,
    ContextType
  >;
  action?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationActionArgs, "data">
  >;
  adminContent?: Resolver<
    ResolversTypes["AdminContentMutations"],
    ParentType,
    ContextType
  >;
  adminDomain?: Resolver<
    ResolversTypes["AdminDomainMutations"],
    ParentType,
    ContextType
  >;
  adminProjects?: Resolver<
    ResolversTypes["AdminProjectsMutations"],
    ParentType,
    ContextType
  >;
};

export type SubscriptionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  hello?: SubscriptionResolver<
    ResolversTypes["String"],
    "hello",
    ParentType,
    ContextType
  >;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export interface NonNegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeInt"], any> {
  name: "NonNegativeInt";
}

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export interface IntIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IntID"], any> {
  name: "IntID";
}

export type GroupResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Group"] = ResolversParentTypes["Group"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  flags?: Resolver<ResolversTypes["GroupFlags"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupFlagsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["GroupFlags"] = ResolversParentTypes["GroupFlags"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  readProjectActions?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["GroupsConnection"] = ResolversParentTypes["GroupsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  locked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lastOnline?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes["UserRole"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["UsersConnection"] = ResolversParentTypes["UsersConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminUserQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserQueries"] = ResolversParentTypes["AdminUserQueries"]
> = {
  allUsers?: Resolver<
    ResolversTypes["UsersConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllUsersArgs, "pagination">
  >;
  allGroups?: Resolver<
    ResolversTypes["GroupsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllGroupsArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminUserMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserMutations"] = ResolversParentTypes["AdminUserMutations"]
> = {
  upsertUsersWithProjects?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsUpsertUsersWithProjectsArgs,
      "emails" | "projectsIds"
    >
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateUserArgs, "data">
  >;
  setUserGroups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsSetUserGroupsArgs,
      "usersEmails" | "groupIds"
    >
  >;
  createGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsCreateGroupArgs, "data">
  >;
  updateGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateGroupArgs, "data">
  >;
  setProjectsToUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsSetProjectsToUsersArgs,
      "projectIds" | "userIds"
    >
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
};

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<
    | "GroupsConnection"
    | "UsersConnection"
    | "ContentConnection"
    | "TopicsConnection"
    | "DomainsConnection"
    | "KCsConnection"
    | "ProjectsConnection",
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export type ActionVerbResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ActionVerb"] = ResolversParentTypes["ActionVerb"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Content"] = ResolversParentTypes["Content"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  binaryBase64?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  binaryFilename?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  json?: Resolver<Maybe<ResolversTypes["JSONObject"]>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  sortIndex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KcResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["KC"] = ResolversParentTypes["KC"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Domain"] = ResolversParentTypes["Domain"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Topic"] = ResolversParentTypes["Topic"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  content?: Resolver<Array<ResolversTypes["Content"]>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sortIndex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes["Topic"]>, ParentType, ContextType>;
  childrens?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Action"] = ResolversParentTypes["Action"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  verb?: Resolver<ResolversTypes["ActionVerb"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes["Content"]>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes["Topic"]>, ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  stepID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  hintID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  extra?: Resolver<
    Maybe<ResolversTypes["JSONObject"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ActionsConnection"] = ResolversParentTypes["ActionsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Action"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminActionQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminActionQueries"] = ResolversParentTypes["AdminActionQueries"]
> = {
  allActions?: Resolver<
    ResolversTypes["ActionsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminActionQueriesAllActionsArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ContentConnection"] = ResolversParentTypes["ContentConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Content"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminContentMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminContentMutations"] = ResolversParentTypes["AdminContentMutations"]
> = {
  createContent?: Resolver<
    ResolversTypes["Content"],
    ParentType,
    ContextType,
    RequireFields<AdminContentMutationsCreateContentArgs, "data">
  >;
  updateContent?: Resolver<
    ResolversTypes["Content"],
    ParentType,
    ContextType,
    RequireFields<AdminContentMutationsUpdateContentArgs, "data">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminContentQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminContentQueries"] = ResolversParentTypes["AdminContentQueries"]
> = {
  allContent?: Resolver<
    ResolversTypes["ContentConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminContentQueriesAllContentArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["TopicsConnection"] = ResolversParentTypes["TopicsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["DomainsConnection"] = ResolversParentTypes["DomainsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Domain"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminDomainQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminDomainQueries"] = ResolversParentTypes["AdminDomainQueries"]
> = {
  allTopics?: Resolver<
    ResolversTypes["TopicsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainQueriesAllTopicsArgs, "pagination">
  >;
  allDomains?: Resolver<
    ResolversTypes["DomainsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainQueriesAllDomainsArgs, "pagination">
  >;
  allKCs?: Resolver<
    ResolversTypes["KCsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainQueriesAllKCsArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminDomainMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminDomainMutations"] = ResolversParentTypes["AdminDomainMutations"]
> = {
  createDomain?: Resolver<
    ResolversTypes["Domain"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsCreateDomainArgs, "input">
  >;
  updateDomain?: Resolver<
    ResolversTypes["Domain"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsUpdateDomainArgs, "input">
  >;
  createTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsCreateTopicArgs, "input">
  >;
  updateTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsUpdateTopicArgs, "input">
  >;
  createKC?: Resolver<
    ResolversTypes["KC"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsCreateKcArgs, "data">
  >;
  updateKC?: Resolver<
    ResolversTypes["KC"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsUpdateKcArgs, "data">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KCsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["KCsConnection"] = ResolversParentTypes["KCsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Project"] = ResolversParentTypes["Project"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  domains?: Resolver<Array<ResolversTypes["Domain"]>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ProjectsConnection"] = ResolversParentTypes["ProjectsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Project"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminProjectsQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminProjectsQueries"] = ResolversParentTypes["AdminProjectsQueries"]
> = {
  allProjects?: Resolver<
    ResolversTypes["ProjectsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminProjectsQueriesAllProjectsArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminProjectsMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminProjectsMutations"] = ResolversParentTypes["AdminProjectsMutations"]
> = {
  createProject?: Resolver<
    ResolversTypes["Project"],
    ParentType,
    ContextType,
    RequireFields<AdminProjectsMutationsCreateProjectArgs, "data">
  >;
  updateProject?: Resolver<
    ResolversTypes["Project"],
    ParentType,
    ContextType,
    RequireFields<AdminProjectsMutationsUpdateProjectArgs, "data">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = EZContext> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  GroupFlags?: GroupFlagsResolvers<ContextType>;
  GroupsConnection?: GroupsConnectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  AdminUserQueries?: AdminUserQueriesResolvers<ContextType>;
  AdminUserMutations?: AdminUserMutationsResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  ActionVerb?: ActionVerbResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  KC?: KcResolvers<ContextType>;
  Domain?: DomainResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  Action?: ActionResolvers<ContextType>;
  ActionsConnection?: ActionsConnectionResolvers<ContextType>;
  AdminActionQueries?: AdminActionQueriesResolvers<ContextType>;
  ContentConnection?: ContentConnectionResolvers<ContextType>;
  AdminContentMutations?: AdminContentMutationsResolvers<ContextType>;
  AdminContentQueries?: AdminContentQueriesResolvers<ContextType>;
  TopicsConnection?: TopicsConnectionResolvers<ContextType>;
  DomainsConnection?: DomainsConnectionResolvers<ContextType>;
  AdminDomainQueries?: AdminDomainQueriesResolvers<ContextType>;
  AdminDomainMutations?: AdminDomainMutationsResolvers<ContextType>;
  KCsConnection?: KCsConnectionResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectsConnection?: ProjectsConnectionResolvers<ContextType>;
  AdminProjectsQueries?: AdminProjectsQueriesResolvers<ContextType>;
  AdminProjectsMutations?: AdminProjectsMutationsResolvers<ContextType>;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
