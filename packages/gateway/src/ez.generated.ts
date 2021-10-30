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
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** ID that parses as non-negative integer, serializes to string, and can be passed as string or number */
  IntID: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: Date;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** Represents NULL values */
  Void: unknown;
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

export type Order_By = "ASC" | "DESC";

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
  projects: Array<Project>;
  projectsIds: Array<Scalars["IntID"]>;
  role: UserRole;
  tags: Array<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type UserRole = "ADMIN" | "USER";

export type UsersConnection = Connection & {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
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
  Action: ResolverTypeWrapper<Action>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  ActionInput: ActionInput;
  ActionVerb: ResolverTypeWrapper<ActionVerb>;
  ActionsConnection: ResolverTypeWrapper<ActionsConnection>;
  ActionsVerbsConnection: ResolverTypeWrapper<ActionsVerbsConnection>;
  AdminActionQueries: ResolverTypeWrapper<AdminActionQueries>;
  AdminActionsFilter: AdminActionsFilter;
  AdminActionsOrderBy: AdminActionsOrderBy;
  AdminContentFilter: AdminContentFilter;
  AdminContentMutations: ResolverTypeWrapper<AdminContentMutations>;
  AdminContentQueries: ResolverTypeWrapper<AdminContentQueries>;
  AdminDomainMutations: ResolverTypeWrapper<AdminDomainMutations>;
  AdminDomainQueries: ResolverTypeWrapper<AdminDomainQueries>;
  AdminDomainsFilter: AdminDomainsFilter;
  AdminGroupsFilter: AdminGroupsFilter;
  AdminKCsFilter: AdminKCsFilter;
  AdminProjectsMutations: ResolverTypeWrapper<AdminProjectsMutations>;
  AdminProjectsQueries: ResolverTypeWrapper<AdminProjectsQueries>;
  AdminTopicsFilter: AdminTopicsFilter;
  AdminUserMutations: ResolverTypeWrapper<AdminUserMutations>;
  AdminUserQueries: ResolverTypeWrapper<AdminUserQueries>;
  AdminUsersFilter: AdminUsersFilter;
  Connection:
    | ResolversTypes["ActionsConnection"]
    | ResolversTypes["ActionsVerbsConnection"]
    | ResolversTypes["ContentConnection"]
    | ResolversTypes["DomainsConnection"]
    | ResolversTypes["GroupsConnection"]
    | ResolversTypes["KCsConnection"]
    | ResolversTypes["ProjectsConnection"]
    | ResolversTypes["TopicsConnection"]
    | ResolversTypes["UsersConnection"];
  Content: ResolverTypeWrapper<Content>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  ContentConnection: ResolverTypeWrapper<ContentConnection>;
  CreateContent: CreateContent;
  CreateDomain: CreateDomain;
  CreateGroupInput: CreateGroupInput;
  CreateKCInput: CreateKcInput;
  CreateProject: CreateProject;
  CreateTopic: CreateTopic;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Domain: ResolverTypeWrapper<Domain>;
  DomainsConnection: ResolverTypeWrapper<DomainsConnection>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  Group: ResolverTypeWrapper<Group>;
  GroupFlags: ResolverTypeWrapper<GroupFlags>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  GroupFlagsInput: GroupFlagsInput;
  GroupsConnection: ResolverTypeWrapper<GroupsConnection>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  KC: ResolverTypeWrapper<Kc>;
  KCsConnection: ResolverTypeWrapper<KCsConnection>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  ORDER_BY: Order_By;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Project: ResolverTypeWrapper<Project>;
  ProjectActionsFilter: ProjectActionsFilter;
  ProjectsConnection: ResolverTypeWrapper<ProjectsConnection>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  Topic: ResolverTypeWrapper<Topic>;
  TopicsConnection: ResolverTypeWrapper<TopicsConnection>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  UpdateContent: UpdateContent;
  UpdateDomain: UpdateDomain;
  UpdateGroupInput: UpdateGroupInput;
  UpdateKCInput: UpdateKcInput;
  UpdateProject: UpdateProject;
  UpdateTopic: UpdateTopic;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Action: Action;
  Float: Scalars["Float"];
  String: Scalars["String"];
  ID: Scalars["ID"];
  ActionInput: ActionInput;
  ActionVerb: ActionVerb;
  ActionsConnection: ActionsConnection;
  ActionsVerbsConnection: ActionsVerbsConnection;
  AdminActionQueries: AdminActionQueries;
  AdminActionsFilter: AdminActionsFilter;
  AdminActionsOrderBy: AdminActionsOrderBy;
  AdminContentFilter: AdminContentFilter;
  AdminContentMutations: AdminContentMutations;
  AdminContentQueries: AdminContentQueries;
  AdminDomainMutations: AdminDomainMutations;
  AdminDomainQueries: AdminDomainQueries;
  AdminDomainsFilter: AdminDomainsFilter;
  AdminGroupsFilter: AdminGroupsFilter;
  AdminKCsFilter: AdminKCsFilter;
  AdminProjectsMutations: AdminProjectsMutations;
  AdminProjectsQueries: AdminProjectsQueries;
  AdminTopicsFilter: AdminTopicsFilter;
  AdminUserMutations: AdminUserMutations;
  AdminUserQueries: AdminUserQueries;
  AdminUsersFilter: AdminUsersFilter;
  Connection:
    | ResolversParentTypes["ActionsConnection"]
    | ResolversParentTypes["ActionsVerbsConnection"]
    | ResolversParentTypes["ContentConnection"]
    | ResolversParentTypes["DomainsConnection"]
    | ResolversParentTypes["GroupsConnection"]
    | ResolversParentTypes["KCsConnection"]
    | ResolversParentTypes["ProjectsConnection"]
    | ResolversParentTypes["TopicsConnection"]
    | ResolversParentTypes["UsersConnection"];
  Content: Content;
  Int: Scalars["Int"];
  ContentConnection: ContentConnection;
  CreateContent: CreateContent;
  CreateDomain: CreateDomain;
  CreateGroupInput: CreateGroupInput;
  CreateKCInput: CreateKcInput;
  CreateProject: CreateProject;
  CreateTopic: CreateTopic;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  Domain: Domain;
  DomainsConnection: DomainsConnection;
  EmailAddress: Scalars["EmailAddress"];
  Group: Group;
  GroupFlags: GroupFlags;
  Boolean: Scalars["Boolean"];
  GroupFlagsInput: GroupFlagsInput;
  GroupsConnection: GroupsConnection;
  IntID: Scalars["IntID"];
  JSONObject: Scalars["JSONObject"];
  KC: Kc;
  KCsConnection: KCsConnection;
  Mutation: {};
  Node: never;
  NonNegativeInt: Scalars["NonNegativeInt"];
  PageInfo: PageInfo;
  Project: Project;
  ProjectActionsFilter: ProjectActionsFilter;
  ProjectsConnection: ProjectsConnection;
  Query: {};
  Subscription: {};
  Timestamp: Scalars["Timestamp"];
  Topic: Topic;
  TopicsConnection: TopicsConnection;
  URL: Scalars["URL"];
  UpdateContent: UpdateContent;
  UpdateDomain: UpdateDomain;
  UpdateGroupInput: UpdateGroupInput;
  UpdateKCInput: UpdateKcInput;
  UpdateProject: UpdateProject;
  UpdateTopic: UpdateTopic;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UsersConnection: UsersConnection;
  Void: Scalars["Void"];
};

export type ActionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Action"] = ResolversParentTypes["Action"]
> = {
  amount?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes["Content"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  extra?: Resolver<
    Maybe<ResolversTypes["JSONObject"]>,
    ParentType,
    ContextType
  >;
  hintID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  stepID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes["Topic"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  verb?: Resolver<ResolversTypes["ActionVerb"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionVerbResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ActionVerb"] = ResolversParentTypes["ActionVerb"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type ActionsVerbsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ActionsVerbsConnection"] = ResolversParentTypes["ActionsVerbsConnection"]
> = {
  nodes?: Resolver<
    Array<ResolversTypes["ActionVerb"]>,
    ParentType,
    ContextType
  >;
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
  allActionsVerbs?: Resolver<
    ResolversTypes["ActionsVerbsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminActionQueriesAllActionsVerbsArgs, "pagination">
  >;
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
  createKC?: Resolver<
    ResolversTypes["KC"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsCreateKcArgs, "data">
  >;
  createTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsCreateTopicArgs, "input">
  >;
  updateDomain?: Resolver<
    ResolversTypes["Domain"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsUpdateDomainArgs, "input">
  >;
  updateKC?: Resolver<
    ResolversTypes["KC"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsUpdateKcArgs, "data">
  >;
  updateTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsUpdateTopicArgs, "input">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminDomainQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminDomainQueries"] = ResolversParentTypes["AdminDomainQueries"]
> = {
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
  allTopics?: Resolver<
    ResolversTypes["TopicsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainQueriesAllTopicsArgs, "pagination">
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

export type AdminUserMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserMutations"] = ResolversParentTypes["AdminUserMutations"]
> = {
  createGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsCreateGroupArgs, "data">
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
  setUserGroups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsSetUserGroupsArgs,
      "groupIds" | "usersEmails"
    >
  >;
  updateGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateGroupArgs, "data">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateUserArgs, "data">
  >;
  upsertUsersWithProjects?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsUpsertUsersWithProjectsArgs,
      "emails" | "projectsIds"
    >
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminUserQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserQueries"] = ResolversParentTypes["AdminUserQueries"]
> = {
  allGroups?: Resolver<
    ResolversTypes["GroupsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllGroupsArgs, "pagination">
  >;
  allUsers?: Resolver<
    ResolversTypes["UsersConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllUsersArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<
    | "ActionsConnection"
    | "ActionsVerbsConnection"
    | "ContentConnection"
    | "DomainsConnection"
    | "GroupsConnection"
    | "KCsConnection"
    | "ProjectsConnection"
    | "TopicsConnection"
    | "UsersConnection",
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export type ContentResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Content"] = ResolversParentTypes["Content"]
> = {
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
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  json?: Resolver<Maybe<ResolversTypes["JSONObject"]>, ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  sortIndex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type DomainResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Domain"] = ResolversParentTypes["Domain"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type GroupResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Group"] = ResolversParentTypes["Group"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  flags?: Resolver<ResolversTypes["GroupFlags"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupFlagsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["GroupFlags"] = ResolversParentTypes["GroupFlags"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  readProjectActions?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
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

export interface IntIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IntID"], any> {
  name: "IntID";
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export type KcResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["KC"] = ResolversParentTypes["KC"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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

export type MutationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
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
  adminUsers?: Resolver<
    ResolversTypes["AdminUserMutations"],
    ParentType,
    ContextType
  >;
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type NodeResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
};

export interface NonNegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonNegativeInt"], any> {
  name: "NonNegativeInt";
}

export type PageInfoResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
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
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Project"] = ResolversParentTypes["Project"]
> = {
  actions?: Resolver<
    ResolversTypes["ActionsConnection"],
    ParentType,
    ContextType,
    RequireFields<ProjectActionsArgs, "pagination">
  >;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  domains?: Resolver<Array<ResolversTypes["Domain"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
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
  adminDomain?: Resolver<
    ResolversTypes["AdminDomainQueries"],
    ParentType,
    ContextType
  >;
  adminProjects?: Resolver<
    ResolversTypes["AdminProjectsQueries"],
    ParentType,
    ContextType
  >;
  adminUsers?: Resolver<
    ResolversTypes["AdminUserQueries"],
    ParentType,
    ContextType
  >;
  content?: Resolver<
    Array<ResolversTypes["Content"]>,
    ParentType,
    ContextType,
    RequireFields<QueryContentArgs, "ids">
  >;
  currentUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  domains?: Resolver<
    Array<ResolversTypes["Domain"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDomainsArgs, "ids">
  >;
  groups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupsArgs, "ids">
  >;
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hello2?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  topics?: Resolver<
    Array<ResolversTypes["Topic"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTopicsArgs, "ids">
  >;
  users?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, "ids">
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

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export type TopicResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Topic"] = ResolversParentTypes["Topic"]
> = {
  childrens?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  content?: Resolver<Array<ResolversTypes["Content"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes["Topic"]>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  sortIndex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export type UserResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  lastOnline?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  locked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes["UserRole"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = EZContext> = {
  Action?: ActionResolvers<ContextType>;
  ActionVerb?: ActionVerbResolvers<ContextType>;
  ActionsConnection?: ActionsConnectionResolvers<ContextType>;
  ActionsVerbsConnection?: ActionsVerbsConnectionResolvers<ContextType>;
  AdminActionQueries?: AdminActionQueriesResolvers<ContextType>;
  AdminContentMutations?: AdminContentMutationsResolvers<ContextType>;
  AdminContentQueries?: AdminContentQueriesResolvers<ContextType>;
  AdminDomainMutations?: AdminDomainMutationsResolvers<ContextType>;
  AdminDomainQueries?: AdminDomainQueriesResolvers<ContextType>;
  AdminProjectsMutations?: AdminProjectsMutationsResolvers<ContextType>;
  AdminProjectsQueries?: AdminProjectsQueriesResolvers<ContextType>;
  AdminUserMutations?: AdminUserMutationsResolvers<ContextType>;
  AdminUserQueries?: AdminUserQueriesResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  ContentConnection?: ContentConnectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Domain?: DomainResolvers<ContextType>;
  DomainsConnection?: DomainsConnectionResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  GroupFlags?: GroupFlagsResolvers<ContextType>;
  GroupsConnection?: GroupsConnectionResolvers<ContextType>;
  IntID?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  KC?: KcResolvers<ContextType>;
  KCsConnection?: KCsConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectsConnection?: ProjectsConnectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Topic?: TopicResolvers<ContextType>;
  TopicsConnection?: TopicsConnectionResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
