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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
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

export type AllReturn = {
  __typename?: "AllReturn";
  PU?: Maybe<Array<Maybe<Scalars["String"]>>>;
  contentResult: Array<ContentsReturn>;
  model: Scalars["JSON"];
  newP?: Maybe<Array<Maybe<Scalars["String"]>>>;
  oldP?: Maybe<Array<Maybe<Scalars["String"]>>>;
  pAVGdif: Scalars["Float"];
  pAVGsim: Scalars["Float"];
  table: Array<TableReturn>;
  tableDifEasy: Array<TableReturn>;
  tableDifHarder: Array<TableReturn>;
  tableSim: Array<TableReturn>;
};

/** Pagination Interface */
export type Connection = {
  /** Pagination information */
  pageInfo: PageInfo;
};

export type Content = {
  __typename?: "Content";
  id: Scalars["IntID"];
};

export type ContentSelectionInput = {
  discardLast?: Scalars["Int"];
  domainId: Scalars["IntID"];
  projectId: Scalars["IntID"];
  topicId: Array<Scalars["IntID"]>;
  userId: Scalars["IntID"];
  zpdRange?: InputMaybe<Array<Scalars["Float"]>>;
};

export type ContentSelectionQueries = {
  __typename?: "ContentSelectionQueries";
  contentSelected: AllReturn;
};

export type ContentSelectionQueriesContentSelectedArgs = {
  input: ContentSelectionInput;
};

export type ContentsReturn = {
  __typename?: "ContentsReturn";
  Msg: Scalars["String"];
  Order: Scalars["IntID"];
  P: Content;
  Preferred: Scalars["Boolean"];
};

/**
 * Pagination parameters
 *
 * Forward pagination parameters can't be mixed with Backward pagination parameters simultaneously
 *
 * first & after => Forward Pagination
 *
 * last & before => Backward Pagination
 */
export type CursorConnectionArgs = {
  /**
   * Set the minimum boundary
   *
   * Use the "endCursor" field of "pageInfo"
   */
  after?: InputMaybe<Scalars["IntID"]>;
  /**
   * Set the maximum boundary
   *
   * Use the "startCursor" field of "pageInfo"
   */
  before?: InputMaybe<Scalars["IntID"]>;
  /**
   * Set the limit of nodes to be fetched
   *
   * It can't be more than 50
   */
  first?: InputMaybe<Scalars["NonNegativeInt"]>;
  /**
   * Set the limit of nodes to be fetched
   *
   * It can't be more than 50
   */
  last?: InputMaybe<Scalars["NonNegativeInt"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Returns 'Hello World!' */
  hello: Scalars["String"];
};

/** Minimum Entity Information */
export type Node = {
  /** Unique numeric identifier */
  id: Scalars["IntID"];
};

/** Order ascendingly or descendingly */
export type Order_By = "ASC" | "DESC";

/** Paginated related information */
export type PageInfo = {
  __typename?: "PageInfo";
  /** Cursor parameter normally used for forward pagination */
  endCursor?: Maybe<Scalars["String"]>;
  /** Utility field that returns "true" if a next page can be fetched */
  hasNextPage: Scalars["Boolean"];
  /** Utility field that returns "true" if a previous page can be fetched */
  hasPreviousPage: Scalars["Boolean"];
  /** Cursor parameter normally used for backward pagination */
  startCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  contentSelection: ContentSelectionQueries;
  /** Returns 'Hello World!' */
  hello: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  /** Emits 'Hello World1', 'Hello World2', 'Hello World3', 'Hello World4' and 'Hello World5' */
  hello: Scalars["String"];
};

export type TableReturn = {
  __typename?: "TableReturn";
  contentCode?: Maybe<Scalars["String"]>;
  diff?: Maybe<Scalars["Float"]>;
  probSuccessAvg?: Maybe<Scalars["Float"]>;
  probSuccessMult?: Maybe<Scalars["Float"]>;
  sim?: Maybe<Scalars["Float"]>;
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
  AllReturn: ResolverTypeWrapper<AllReturn>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Connection: never;
  Content: ResolverTypeWrapper<Content>;
  ContentSelectionInput: ContentSelectionInput;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  ContentSelectionQueries: ResolverTypeWrapper<ContentSelectionQueries>;
  ContentsReturn: ResolverTypeWrapper<ContentsReturn>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  ORDER_BY: Order_By;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  TableReturn: ResolverTypeWrapper<TableReturn>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AllReturn: AllReturn;
  String: Scalars["String"];
  Float: Scalars["Float"];
  Connection: never;
  Content: Content;
  ContentSelectionInput: ContentSelectionInput;
  Int: Scalars["Int"];
  ContentSelectionQueries: ContentSelectionQueries;
  ContentsReturn: ContentsReturn;
  Boolean: Scalars["Boolean"];
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  Mutation: {};
  Node: never;
  NonNegativeInt: Scalars["NonNegativeInt"];
  PageInfo: PageInfo;
  Query: {};
  Subscription: {};
  TableReturn: TableReturn;
  Timestamp: Scalars["Timestamp"];
  URL: Scalars["URL"];
  Void: Scalars["Void"];
};

export type AllReturnResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AllReturn"] = ResolversParentTypes["AllReturn"]
> = {
  PU?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  contentResult?: Resolver<
    Array<ResolversTypes["ContentsReturn"]>,
    ParentType,
    ContextType
  >;
  model?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  newP?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  oldP?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  pAVGdif?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  pAVGsim?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  table?: Resolver<
    Array<ResolversTypes["TableReturn"]>,
    ParentType,
    ContextType
  >;
  tableDifEasy?: Resolver<
    Array<ResolversTypes["TableReturn"]>,
    ParentType,
    ContextType
  >;
  tableDifHarder?: Resolver<
    Array<ResolversTypes["TableReturn"]>,
    ParentType,
    ContextType
  >;
  tableSim?: Resolver<
    Array<ResolversTypes["TableReturn"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export type ContentResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Content"] = ResolversParentTypes["Content"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentSelectionQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ContentSelectionQueries"] = ResolversParentTypes["ContentSelectionQueries"]
> = {
  contentSelected?: Resolver<
    ResolversTypes["AllReturn"],
    ParentType,
    ContextType,
    RequireFields<ContentSelectionQueriesContentSelectedArgs, "input">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentsReturnResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ContentsReturn"] = ResolversParentTypes["ContentsReturn"]
> = {
  Msg?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  Order?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  P?: Resolver<ResolversTypes["Content"], ParentType, ContextType>;
  Preferred?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

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
  contentSelection?: Resolver<
    ResolversTypes["ContentSelectionQueries"],
    ParentType,
    ContextType
  >;
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type TableReturnResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["TableReturn"] = ResolversParentTypes["TableReturn"]
> = {
  contentCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  diff?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  probSuccessAvg?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  probSuccessMult?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  sim?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URL"], any> {
  name: "URL";
}

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = EZContext> = {
  AllReturn?: AllReturnResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  ContentSelectionQueries?: ContentSelectionQueriesResolvers<ContextType>;
  ContentsReturn?: ContentsReturnResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TableReturn?: TableReturnResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
