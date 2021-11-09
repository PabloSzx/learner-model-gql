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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: unknown;
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

export type Connection = {
  pageInfo: PageInfo;
};

export type Content = {
  __typename?: "Content";
  id: Scalars["IntID"];
};

export type CursorConnectionArgs = {
  after?: Maybe<Scalars["IntID"]>;
  before?: Maybe<Scalars["IntID"]>;
  first?: Maybe<Scalars["NonNegativeInt"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
};

export type Domain = {
  __typename?: "Domain";
  id: Scalars["IntID"];
};

export type Kc = {
  __typename?: "KC";
  id: Scalars["IntID"];
};

export type Mutation = {
  __typename?: "Mutation";
  action?: Maybe<Scalars["Void"]>;
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
  id: Scalars["IntID"];
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

export type Query = {
  __typename?: "Query";
  adminActions: AdminActionQueries;
  hello: Scalars["String"];
  projects: Array<Project>;
};

export type QueryProjectsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  hello: Scalars["String"];
};

export type Topic = {
  __typename?: "Topic";
  id: Scalars["IntID"];
};

export type User = {
  __typename?: "User";
  id: Scalars["IntID"];
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
  Connection:
    | ResolversTypes["ActionsConnection"]
    | ResolversTypes["ActionsVerbsConnection"];
  Content: ResolverTypeWrapper<Content>;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Domain: ResolverTypeWrapper<Domain>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  KC: ResolverTypeWrapper<Kc>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  ORDER_BY: Order_By;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Project: ResolverTypeWrapper<Project>;
  ProjectActionsFilter: ProjectActionsFilter;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  Topic: ResolverTypeWrapper<Topic>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  User: ResolverTypeWrapper<User>;
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
  Connection:
    | ResolversParentTypes["ActionsConnection"]
    | ResolversParentTypes["ActionsVerbsConnection"];
  Content: Content;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  Domain: Domain;
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  KC: Kc;
  Mutation: {};
  Node: never;
  NonNegativeInt: Scalars["NonNegativeInt"];
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  Project: Project;
  ProjectActionsFilter: ProjectActionsFilter;
  Query: {};
  Subscription: {};
  Timestamp: Scalars["Timestamp"];
  Topic: Topic;
  URL: Scalars["URL"];
  User: User;
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

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<
    "ActionsConnection" | "ActionsVerbsConnection",
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
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
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

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export type KcResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["KC"] = ResolversParentTypes["KC"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
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
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectsArgs, "ids">
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
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
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
  Connection?: ConnectionResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Domain?: DomainResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  KC?: KcResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Topic?: TopicResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
