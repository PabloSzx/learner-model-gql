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
  ID: string;
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

export type AdminKCsFilter = {
  domains?: Maybe<Array<Scalars["IntID"]>>;
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type AdminTopicsFilter = {
  projects?: Maybe<Array<Scalars["IntID"]>>;
};

export type Connection = {
  pageInfo: PageInfo;
};

export type Content = {
  __typename?: "Content";
  id: Scalars["IntID"];
  kcs: Array<Kc>;
  topics: Array<Topic>;
};

export type CreateDomain = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectsIds: Array<Scalars["IntID"]>;
};

export type CreateKcInput = {
  code: Scalars["String"];
  domainId: Scalars["IntID"];
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
  updatedAt: Scalars["DateTime"];
};

export type DomainsConnection = Connection & {
  __typename?: "DomainsConnection";
  nodes: Array<Domain>;
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
  adminDomain: AdminDomainMutations;
  hello: Scalars["String"];
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
  domains: Array<Domain>;
  id: Scalars["IntID"];
};

export type Query = {
  __typename?: "Query";
  adminDomain: AdminDomainQueries;
  content: Array<Content>;
  domains: Array<Domain>;
  hello: Scalars["String"];
  kcs: Array<Kc>;
  projects: Array<Project>;
  topics: Array<Topic>;
};

export type QueryContentArgs = {
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

export type QueryTopicsArgs = {
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
  createdAt: Scalars["DateTime"];
  id: Scalars["IntID"];
  kcs: Array<Kc>;
  label: Scalars["String"];
  parent?: Maybe<Topic>;
  sortIndex?: Maybe<Scalars["Int"]>;
  updatedAt: Scalars["DateTime"];
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

export type UpdateKcInput = {
  code: Scalars["String"];
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
  AdminDomainMutations: ResolverTypeWrapper<AdminDomainMutations>;
  AdminDomainQueries: ResolverTypeWrapper<AdminDomainQueries>;
  AdminDomainsFilter: AdminDomainsFilter;
  AdminKCsFilter: AdminKCsFilter;
  AdminTopicsFilter: AdminTopicsFilter;
  Connection:
    | ResolversTypes["DomainsConnection"]
    | ResolversTypes["KCsConnection"]
    | ResolversTypes["TopicsConnection"];
  Content: ResolverTypeWrapper<Content>;
  CreateDomain: CreateDomain;
  String: ResolverTypeWrapper<Scalars["String"]>;
  CreateKCInput: CreateKcInput;
  CreateTopic: CreateTopic;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Domain: ResolverTypeWrapper<Domain>;
  DomainsConnection: ResolverTypeWrapper<DomainsConnection>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  KC: ResolverTypeWrapper<Kc>;
  KCsConnection: ResolverTypeWrapper<KCsConnection>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  Topic: ResolverTypeWrapper<Topic>;
  TopicsConnection: ResolverTypeWrapper<TopicsConnection>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  UpdateDomain: UpdateDomain;
  UpdateKCInput: UpdateKcInput;
  UpdateTopic: UpdateTopic;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminDomainMutations: AdminDomainMutations;
  AdminDomainQueries: AdminDomainQueries;
  AdminDomainsFilter: AdminDomainsFilter;
  AdminKCsFilter: AdminKCsFilter;
  AdminTopicsFilter: AdminTopicsFilter;
  Connection:
    | ResolversParentTypes["DomainsConnection"]
    | ResolversParentTypes["KCsConnection"]
    | ResolversParentTypes["TopicsConnection"];
  Content: Content;
  CreateDomain: CreateDomain;
  String: Scalars["String"];
  CreateKCInput: CreateKcInput;
  CreateTopic: CreateTopic;
  Int: Scalars["Int"];
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  Domain: Domain;
  DomainsConnection: DomainsConnection;
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  JSONObject: Scalars["JSONObject"];
  KC: Kc;
  KCsConnection: KCsConnection;
  Mutation: {};
  Node: never;
  NonNegativeInt: Scalars["NonNegativeInt"];
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  Project: Project;
  Query: {};
  Subscription: {};
  Timestamp: Scalars["Timestamp"];
  Topic: Topic;
  TopicsConnection: TopicsConnection;
  URL: Scalars["URL"];
  UpdateDomain: UpdateDomain;
  UpdateKCInput: UpdateKcInput;
  UpdateTopic: UpdateTopic;
  Void: Scalars["Void"];
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

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<
    "DomainsConnection" | "KCsConnection" | "TopicsConnection",
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export type ContentResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Content"] = ResolversParentTypes["Content"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
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
  adminDomain?: Resolver<
    ResolversTypes["AdminDomainMutations"],
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
  domains?: Resolver<Array<ResolversTypes["Domain"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  adminDomain?: Resolver<
    ResolversTypes["AdminDomainQueries"],
    ParentType,
    ContextType
  >;
  content?: Resolver<
    Array<ResolversTypes["Content"]>,
    ParentType,
    ContextType,
    RequireFields<QueryContentArgs, "ids">
  >;
  domains?: Resolver<
    Array<ResolversTypes["Domain"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDomainsArgs, "ids">
  >;
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  kcs?: Resolver<Array<ResolversTypes["KC"]>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes["Topic"]>, ParentType, ContextType>;
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

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = EZContext> = {
  AdminDomainMutations?: AdminDomainMutationsResolvers<ContextType>;
  AdminDomainQueries?: AdminDomainQueriesResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Domain?: DomainResolvers<ContextType>;
  DomainsConnection?: DomainsConnectionResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  KC?: KcResolvers<ContextType>;
  KCsConnection?: KCsConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Topic?: TopicResolvers<ContextType>;
  TopicsConnection?: TopicsConnectionResolvers<ContextType>;
  URL?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
