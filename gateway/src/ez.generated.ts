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
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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
} &
  { [P in K]-?: NonNullable<T[P]> };
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
  Void: void | null | undefined;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** ID that parses as non-negative integer, serializes to string, and can be passed as string or number */
  IntID: number;
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
  role: UserRole;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  groups: Array<Group>;
  projects: Array<Project>;
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
  pageInfo?: Maybe<PageInfo>;
};

export type CursorConnectionArgs = {
  first?: Maybe<Scalars["NonNegativeInt"]>;
  after?: Maybe<Scalars["IntID"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
  before?: Maybe<Scalars["IntID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  admin: AdminMutations;
  action: Scalars["Void"];
};

export type MutationActionArgs = {
  data: ActionInput;
};

export type Group = {
  __typename?: "Group";
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  users: Array<User>;
  projects: Array<Project>;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["IntID"];
  domains: Array<Domain>;
  code: Scalars["String"];
  label: Scalars["String"];
};

export type UsersConnection = {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
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

export type ActionVerb = {
  __typename?: "ActionVerb";
  id: Scalars["IntID"];
  name: Scalars["String"];
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

export type Domain = {
  __typename?: "Domain";
  id: Scalars["IntID"];
  content: Array<Content>;
  topics: Array<Topic>;
  project: Project;
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

export type Action = {
  __typename?: "Action";
  id: Scalars["IntID"];
  verb: ActionVerb;
  activity: ActionActivity;
  timestamp: Scalars["Timestamp"];
  result?: Maybe<Scalars["Float"]>;
  user?: Maybe<User>;
};

export type ActionsConnection = {
  __typename?: "ActionsConnection";
  nodes: Array<Action>;
  pageInfo: PageInfo;
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

export type TopicsConnection = Connection & {
  __typename?: "TopicsConnection";
  nodes: Array<Topic>;
  pageInfo?: Maybe<PageInfo>;
};

export type DomainsConnection = Connection & {
  __typename?: "DomainsConnection";
  nodes: Array<Domain>;
  pageInfo?: Maybe<PageInfo>;
};

export type CreateDomain = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectId: Scalars["IntID"];
};

export type CreateTopic = {
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  domainId: Scalars["IntID"];
  projectId: Scalars["IntID"];
};

export type UpdateTopic = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  parentTopicId?: Maybe<Scalars["IntID"]>;
  domainId: Scalars["IntID"];
  projectId: Scalars["IntID"];
};

export type CreateProject = {
  code: Scalars["String"];
  label: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  UserRole: UserRole;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Node: never;
  Connection:
    | ResolversTypes["TopicsConnection"]
    | ResolversTypes["DomainsConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  Mutation: ResolverTypeWrapper<{}>;
  Group: ResolverTypeWrapper<Group>;
  Project: ResolverTypeWrapper<Project>;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  AdminQueries: ResolverTypeWrapper<AdminQueries>;
  AdminMutations: ResolverTypeWrapper<AdminMutations>;
  ActionVerb: ResolverTypeWrapper<ActionVerb>;
  Content: ResolverTypeWrapper<Content>;
  Domain: ResolverTypeWrapper<Domain>;
  Topic: ResolverTypeWrapper<Topic>;
  ActionActivity: ResolverTypeWrapper<ActionActivity>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  ActionActivityInput: ActionActivityInput;
  ActionInput: ActionInput;
  Action: ResolverTypeWrapper<Action>;
  ActionsConnection: ResolverTypeWrapper<ActionsConnection>;
  CreateContent: CreateContent;
  TopicsConnection: ResolverTypeWrapper<TopicsConnection>;
  DomainsConnection: ResolverTypeWrapper<DomainsConnection>;
  CreateDomain: CreateDomain;
  CreateTopic: CreateTopic;
  UpdateTopic: UpdateTopic;
  CreateProject: CreateProject;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  DateTime: Scalars["DateTime"];
  Timestamp: Scalars["Timestamp"];
  JSONObject: Scalars["JSONObject"];
  NonNegativeInt: Scalars["NonNegativeInt"];
  Void: Scalars["Void"];
  URL: Scalars["URL"];
  IntID: Scalars["IntID"];
  User: User;
  Boolean: Scalars["Boolean"];
  PageInfo: PageInfo;
  Node: never;
  Connection:
    | ResolversParentTypes["TopicsConnection"]
    | ResolversParentTypes["DomainsConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  Mutation: {};
  Group: Group;
  Project: Project;
  UsersConnection: UsersConnection;
  AdminQueries: AdminQueries;
  AdminMutations: AdminMutations;
  ActionVerb: ActionVerb;
  Content: Content;
  Domain: Domain;
  Topic: Topic;
  ActionActivity: ActionActivity;
  ID: Scalars["ID"];
  Float: Scalars["Float"];
  ActionActivityInput: ActionActivityInput;
  ActionInput: ActionInput;
  Action: Action;
  ActionsConnection: ActionsConnection;
  CreateContent: CreateContent;
  TopicsConnection: TopicsConnection;
  DomainsConnection: DomainsConnection;
  CreateDomain: CreateDomain;
  CreateTopic: CreateTopic;
  UpdateTopic: UpdateTopic;
  CreateProject: CreateProject;
};

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  currentUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes["AdminQueries"], ParentType, ContextType>;
  domains?: Resolver<
    Array<ResolversTypes["Domain"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDomainsArgs, "ids">
  >;
  topics?: Resolver<
    Array<ResolversTypes["Topic"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTopicsArgs, "ids">
  >;
  content?: Resolver<
    Array<ResolversTypes["Content"]>,
    ParentType,
    ContextType,
    RequireFields<QueryContentArgs, "ids">
  >;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectsArgs, "ids">
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

export interface IntIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IntID"], any> {
  name: "IntID";
}

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
  role?: Resolver<ResolversTypes["UserRole"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
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
    "TopicsConnection" | "DomainsConnection",
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  admin?: Resolver<ResolversTypes["AdminMutations"], ParentType, ContextType>;
  action?: Resolver<
    ResolversTypes["Void"],
    ParentType,
    ContextType,
    RequireFields<MutationActionArgs, "data">
  >;
};

export type GroupResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Group"] = ResolversParentTypes["Group"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
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

export type AdminQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminQueries"] = ResolversParentTypes["AdminQueries"]
> = {
  allUsers?: Resolver<
    ResolversTypes["UsersConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminQueriesAllUsersArgs, "pagination">
  >;
  allActions?: Resolver<
    ResolversTypes["ActionsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminQueriesAllActionsArgs, "pagination">
  >;
  allTopics?: Resolver<
    ResolversTypes["TopicsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminQueriesAllTopicsArgs, "pagination">
  >;
  allDomains?: Resolver<
    ResolversTypes["DomainsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminQueriesAllDomainsArgs, "pagination">
  >;
  allProjects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminMutations"] = ResolversParentTypes["AdminMutations"]
> = {
  assignProjectsToUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminMutationsAssignProjectsToUsersArgs,
      "projectIds" | "userIds"
    >
  >;
  unassignProjectsToUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminMutationsUnassignProjectsToUsersArgs,
      "projectIds" | "userIds"
    >
  >;
  createContent?: Resolver<
    ResolversTypes["Content"],
    ParentType,
    ContextType,
    RequireFields<AdminMutationsCreateContentArgs, "data">
  >;
  createDomain?: Resolver<
    ResolversTypes["Domain"],
    ParentType,
    ContextType,
    RequireFields<AdminMutationsCreateDomainArgs, "input">
  >;
  createTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminMutationsCreateTopicArgs, "input">
  >;
  updateTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminMutationsUpdateTopicArgs, "input">
  >;
  createProject?: Resolver<
    ResolversTypes["Project"],
    ParentType,
    ContextType,
    RequireFields<AdminMutationsCreateProjectArgs, "data">
  >;
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

export type ContentResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Content"] = ResolversParentTypes["Content"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  binaryBase64?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  json?: Resolver<Maybe<ResolversTypes["JSONObject"]>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Domain"] = ResolversParentTypes["Domain"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  content?: Resolver<Array<ResolversTypes["Content"]>, ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Topic"] = ResolversParentTypes["Topic"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  content?: Resolver<Array<ResolversTypes["Content"]>, ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes["Topic"]>, ParentType, ContextType>;
  childrens?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionActivityResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ActionActivity"] = ResolversParentTypes["ActionActivity"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes["Content"]>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes["Topic"]>, ParentType, ContextType>;
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

export type ActionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Action"] = ResolversParentTypes["Action"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  verb?: Resolver<ResolversTypes["ActionVerb"], ParentType, ContextType>;
  activity?: Resolver<
    ResolversTypes["ActionActivity"],
    ParentType,
    ContextType
  >;
  timestamp?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
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

export type TopicsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["TopicsConnection"] = ResolversParentTypes["TopicsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["DomainsConnection"] = ResolversParentTypes["DomainsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Domain"]>, ParentType, ContextType>;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = EZContext> = {
  Query?: QueryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  AdminQueries?: AdminQueriesResolvers<ContextType>;
  AdminMutations?: AdminMutationsResolvers<ContextType>;
  ActionVerb?: ActionVerbResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  Domain?: DomainResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  ActionActivity?: ActionActivityResolvers<ContextType>;
  Action?: ActionResolvers<ContextType>;
  ActionsConnection?: ActionsConnectionResolvers<ContextType>;
  TopicsConnection?: TopicsConnectionResolvers<ContextType>;
  DomainsConnection?: DomainsConnectionResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = EZContext> = Resolvers<ContextType>;

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
