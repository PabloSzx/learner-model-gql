import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { EZContext } from "graphql-ez";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

/** Admin State-Related Queries */
export type AdminStateQueries = {
  __typename?: "AdminStateQueries";
  /** [ADMIN] Get all the model states creators currently in the system */
  allModelStateCreators: ModelStateCreatorConnection;
  /** [ADMIN] Get all the model statestypes currently in the system */
  allModelStateTypes: ModelStateTypeConnection;
  /**
   * [ADMIN] Get all the model states currently in the system
   *
   * Pagination parameters are mandatory, but filters and orderBy are optional, and therefore the search can be customized.
   */
  allModelStates: ModelStateConnection;
};

/** Admin State-Related Queries */
export type AdminStateQueriesAllModelStateCreatorsArgs = {
  pagination: CursorConnectionArgs;
};

/** Admin State-Related Queries */
export type AdminStateQueriesAllModelStateTypesArgs = {
  pagination: CursorConnectionArgs;
};

/** Admin State-Related Queries */
export type AdminStateQueriesAllModelStatesArgs = {
  input: ModelStateConnectionInput;
};

export type Connection = {
  pageInfo: PageInfo;
};

export type CursorConnectionArgs = {
  after?: InputMaybe<Scalars["IntID"]>;
  before?: InputMaybe<Scalars["IntID"]>;
  first?: InputMaybe<Scalars["NonNegativeInt"]>;
  last?: InputMaybe<Scalars["NonNegativeInt"]>;
};

export type Domain = {
  __typename?: "Domain";
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Model States associated with domain */
  modelStates: ModelStateConnection;
};

export type DomainModelStatesArgs = {
  input: ModelStateConnectionInput;
};

/** Model State Entity */
export type ModelState = {
  __typename?: "ModelState";
  /** Date of creation */
  createdAt: Scalars["DateTime"];
  /** Creator of model state */
  creator: Scalars["String"];
  /** Domain associated with Model State */
  domain: Domain;
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Arbitrary JSON Data */
  json: Scalars["JSON"];
  /** Type / Category of model state */
  type?: Maybe<Scalars["String"]>;
  /** Date of last update */
  updatedAt: Scalars["DateTime"];
  /** User associated with Model State */
  user: User;
};

/** Paginated Model States */
export type ModelStateConnection = Connection & {
  __typename?: "ModelStateConnection";
  /** Nodes of the current page */
  nodes: Array<ModelState>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

/** Pagination parameters of Model States */
export type ModelStateConnectionInput = {
  /** Customize search/filter parameters */
  filters?: InputMaybe<ModelStateFilter>;
  /** Customize order, by default it orders descendingly by id */
  orderBy?: InputMaybe<ModelStateOrderBy>;
  /** Pagination-specific parameters */
  pagination: CursorConnectionArgs;
};

/** Creators of Model States */
export type ModelStateCreator = {
  __typename?: "ModelStateCreator";
  /** Date of creation */
  createdAt: Scalars["DateTime"];
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  name: Scalars["String"];
  /** Date of last update */
  updatedAt: Scalars["DateTime"];
};

/** Paginated Model State Creators */
export type ModelStateCreatorConnection = Connection & {
  __typename?: "ModelStateCreatorConnection";
  /** Nodes of the current page */
  nodes: Array<ModelStateCreator>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

/** Filter model states data */
export type ModelStateFilter = {
  /**
   * Filter by the specified creators
   *
   * If states's creator matches any of the specified creators, the state is included
   */
  creators?: InputMaybe<Array<Scalars["String"]>>;
  /**
   * Filter by the specified types
   *
   * If state's type matches any of the specified types, the state is included
   */
  type?: InputMaybe<Array<Scalars["String"]>>;
};

/** Order Model States */
export type ModelStateOrderBy = {
  /**
   * Order the model states ascendingly or descendingly
   *
   * Following the cursor pagination's nature, ordering by "id" tends to follow the state creation date, but it can't be guaranteed
   *
   * By default the states are ordered descendingly, showing the newer states first
   */
  id?: InputMaybe<Order_By>;
};

/** Types/Categories of Model States */
export type ModelStateType = {
  __typename?: "ModelStateType";
  /** Date of creation */
  createdAt: Scalars["DateTime"];
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Name of the model type */
  name: Scalars["String"];
  /** Date of last update */
  updatedAt: Scalars["DateTime"];
};

/** Paginated Model State Types */
export type ModelStateTypeConnection = Connection & {
  __typename?: "ModelStateTypeConnection";
  /** Nodes of the current page */
  nodes: Array<ModelStateType>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

export type Mutation = {
  __typename?: "Mutation";
  hello: Scalars["String"];
};

export type Node = {
  /** Unique numeric identifier */
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

export type Query = {
  __typename?: "Query";
  /** [ADMIN] Admin related state queries, only authenticated users with the role "ADMIN" can access */
  adminState: AdminStateQueries;
  /**
   * Get all the domains associated with the specified identifiers
   *
   * The domains data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  domains: Array<Domain>;
  hello: Scalars["String"];
  /**
   * Get all the users associated with the specified identifiers
   *
   * The users data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  users: Array<User>;
};

export type QueryDomainsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryUsersArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  hello: Scalars["String"];
};

export type User = {
  __typename?: "User";
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Model States associated with user */
  modelStates: ModelStateConnection;
};

export type UserModelStatesArgs = {
  input: ModelStateConnectionInput;
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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  AdminStateQueries: ResolverTypeWrapper<AdminStateQueries>;
  Connection:
    | ResolversTypes["ModelStateConnection"]
    | ResolversTypes["ModelStateCreatorConnection"]
    | ResolversTypes["ModelStateTypeConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Domain: ResolverTypeWrapper<Domain>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  ModelState: ResolverTypeWrapper<ModelState>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ModelStateConnection: ResolverTypeWrapper<ModelStateConnection>;
  ModelStateConnectionInput: ModelStateConnectionInput;
  ModelStateCreator: ResolverTypeWrapper<ModelStateCreator>;
  ModelStateCreatorConnection: ResolverTypeWrapper<ModelStateCreatorConnection>;
  ModelStateFilter: ModelStateFilter;
  ModelStateOrderBy: ModelStateOrderBy;
  ModelStateType: ResolverTypeWrapper<ModelStateType>;
  ModelStateTypeConnection: ResolverTypeWrapper<ModelStateTypeConnection>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  ORDER_BY: Order_By;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  User: ResolverTypeWrapper<User>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminStateQueries: AdminStateQueries;
  Connection:
    | ResolversParentTypes["ModelStateConnection"]
    | ResolversParentTypes["ModelStateCreatorConnection"]
    | ResolversParentTypes["ModelStateTypeConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  Domain: Domain;
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  ModelState: ModelState;
  String: Scalars["String"];
  ModelStateConnection: ModelStateConnection;
  ModelStateConnectionInput: ModelStateConnectionInput;
  ModelStateCreator: ModelStateCreator;
  ModelStateCreatorConnection: ModelStateCreatorConnection;
  ModelStateFilter: ModelStateFilter;
  ModelStateOrderBy: ModelStateOrderBy;
  ModelStateType: ModelStateType;
  ModelStateTypeConnection: ModelStateTypeConnection;
  Mutation: {};
  Node: never;
  NonNegativeInt: Scalars["NonNegativeInt"];
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  Query: {};
  Subscription: {};
  Timestamp: Scalars["Timestamp"];
  URL: Scalars["URL"];
  User: User;
  Void: Scalars["Void"];
};

export type AdminStateQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminStateQueries"] = ResolversParentTypes["AdminStateQueries"]
> = {
  allModelStateCreators?: Resolver<
    ResolversTypes["ModelStateCreatorConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminStateQueriesAllModelStateCreatorsArgs, "pagination">
  >;
  allModelStateTypes?: Resolver<
    ResolversTypes["ModelStateTypeConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminStateQueriesAllModelStateTypesArgs, "pagination">
  >;
  allModelStates?: Resolver<
    ResolversTypes["ModelStateConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminStateQueriesAllModelStatesArgs, "input">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<
    | "ModelStateConnection"
    | "ModelStateCreatorConnection"
    | "ModelStateTypeConnection",
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
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
  modelStates?: Resolver<
    ResolversTypes["ModelStateConnection"],
    ParentType,
    ContextType,
    RequireFields<DomainModelStatesArgs, "input">
  >;
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

export type ModelStateResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ModelState"] = ResolversParentTypes["ModelState"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  json?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelStateConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ModelStateConnection"] = ResolversParentTypes["ModelStateConnection"]
> = {
  nodes?: Resolver<
    Array<ResolversTypes["ModelState"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelStateCreatorResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ModelStateCreator"] = ResolversParentTypes["ModelStateCreator"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelStateCreatorConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ModelStateCreatorConnection"] = ResolversParentTypes["ModelStateCreatorConnection"]
> = {
  nodes?: Resolver<
    Array<ResolversTypes["ModelStateCreator"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelStateTypeResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ModelStateType"] = ResolversParentTypes["ModelStateType"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModelStateTypeConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ModelStateTypeConnection"] = ResolversParentTypes["ModelStateTypeConnection"]
> = {
  nodes?: Resolver<
    Array<ResolversTypes["ModelStateType"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
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

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  adminState?: Resolver<
    ResolversTypes["AdminStateQueries"],
    ParentType,
    ContextType
  >;
  domains?: Resolver<
    Array<ResolversTypes["Domain"]>,
    ParentType,
    ContextType,
    RequireFields<QueryDomainsArgs, "ids">
  >;
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export type UserResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  modelStates?: Resolver<
    ResolversTypes["ModelStateConnection"],
    ParentType,
    ContextType,
    RequireFields<UserModelStatesArgs, "input">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = EZContext> = {
  AdminStateQueries?: AdminStateQueriesResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Domain?: DomainResolvers<ContextType>;
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  ModelState?: ModelStateResolvers<ContextType>;
  ModelStateConnection?: ModelStateConnectionResolvers<ContextType>;
  ModelStateCreator?: ModelStateCreatorResolvers<ContextType>;
  ModelStateCreatorConnection?: ModelStateCreatorConnectionResolvers<ContextType>;
  ModelStateType?: ModelStateTypeResolvers<ContextType>;
  ModelStateTypeConnection?: ModelStateTypeConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
