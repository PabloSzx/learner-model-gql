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

/** Pagination Interface */
export type Connection = {
  /** Pagination information */
  pageInfo: PageInfo;
};

/** Content entity */
export type Content = {
  __typename?: "Content";
  /** Unique numeric identifier */
  id: Scalars["IntID"];
};

/** Return selected content and properties for further analysis (model, codes of content, probabilities and tables) */
export type ContentSelectedPropsReturn = {
  __typename?: "ContentSelectedPropsReturn";
  /** All code of contents of last N contents done */
  PU: Array<Scalars["String"]>;
  /** Content selected for learner */
  contentResult: Array<ContentsSelectedReturn>;
  /** Model structure of learner composed for KC level and KC threshold */
  model: Scalars["JSON"];
  /** All codes of contents without last N contents and content dominated */
  newP: Array<Scalars["String"]>;
  /** All codes of contents of topic chapters */
  oldP: Array<Scalars["String"]>;
  /** Probability of success by average PK of exercise most difficult */
  pAVGdif: Scalars["Float"];
  /** Probability of success by average PK of exercise most similar */
  pAVGsim: Scalars["Float"];
  /** table of newP with TableReturn attributes */
  table: Array<TableReturn>;
  /** table filter with similarity less than 1 and difficulty less than difficulty of last content done (PU[0]) */
  tableDifEasy: Array<TableReturn>;
  /** table filter with similarity less than 1 and difficulty greater than difficulty of last content done (PU[0]) */
  tableDifHarder: Array<TableReturn>;
  /** table filter with similarity equals to 1 */
  tableSim: Array<TableReturn>;
  /** Return message of service */
  topicCompletedMsg: Message;
};

/** ContentSelection input data */
export type ContentSelectionInput = {
  /** Discard last N contents done (optional in query), default N= 10 */
  discardLast?: Scalars["Int"];
  /** Domain identifier */
  domainId: Scalars["IntID"];
  /** Project identifier */
  projectId: Scalars["IntID"];
  /** Topic identifier */
  topicId: Array<Scalars["IntID"]>;
  /** User identifier */
  userId: Scalars["IntID"];
  /** Range Zone proximal development(ZPD) (optional in query), default [0.4,0.6] */
  zpdRange?: InputMaybe<Array<Scalars["Float"]>>;
};

/** ContentSelection Queries */
export type ContentSelectionQueries = {
  __typename?: "ContentSelectionQueries";
  /** Get all contentSelected properties associated with the specified ContentSelectionInput */
  contentSelected: ContentSelectedPropsReturn;
};

/** ContentSelection Queries */
export type ContentSelectionQueriesContentSelectedArgs = {
  input: ContentSelectionInput;
};

/** Main structure of content selected return */
export type ContentsSelectedReturn = {
  __typename?: "ContentsSelectedReturn";
  /** Message associated to Content */
  Msg: Message;
  /** Order is 1 when Content is selected for easy criterion, 2 when Content is selected for similar criterion and 3 when Content is selected for hard criterion */
  Order: Scalars["IntID"];
  /** Content P */
  P: Content;
  /** Preferred is true when Content is the best option for learner, else false */
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

/** Structure of message return in content selected */
export type Message = {
  __typename?: "Message";
  /** Label of message of content selected */
  label: Scalars["String"];
  /** Text of message of content selected */
  text: Scalars["String"];
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
  /** ContentSelection Query */
  contentSelection: ContentSelectionQueries;
  /** Returns 'Hello World!' */
  hello: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  /** Emits 'Hello World1', 'Hello World2', 'Hello World3', 'Hello World4' and 'Hello World5' */
  hello: Scalars["String"];
};

/** Structure of TableReturn for check result of criterion and further analysis */
export type TableReturn = {
  __typename?: "TableReturn";
  /** Code of content */
  contentCode?: Maybe<Scalars["String"]>;
  /** Value of difficulty of content */
  diff?: Maybe<Scalars["Float"]>;
  /** Probability of success by average of KCs levels of the Content */
  probSuccessAvg?: Maybe<Scalars["Float"]>;
  /** Probability of success by multiplication of KCs levels of the Content */
  probSuccessMult?: Maybe<Scalars["Float"]>;
  /** Value of similarity of content */
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
  Connection: never;
  Content: ResolverTypeWrapper<Content>;
  ContentSelectedPropsReturn: ResolverTypeWrapper<ContentSelectedPropsReturn>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  ContentSelectionInput: ContentSelectionInput;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  ContentSelectionQueries: ResolverTypeWrapper<ContentSelectionQueries>;
  ContentsSelectedReturn: ResolverTypeWrapper<ContentsSelectedReturn>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  Message: ResolverTypeWrapper<Message>;
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
  Connection: never;
  Content: Content;
  ContentSelectedPropsReturn: ContentSelectedPropsReturn;
  String: Scalars["String"];
  Float: Scalars["Float"];
  ContentSelectionInput: ContentSelectionInput;
  Int: Scalars["Int"];
  ContentSelectionQueries: ContentSelectionQueries;
  ContentsSelectedReturn: ContentsSelectedReturn;
  Boolean: Scalars["Boolean"];
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  Message: Message;
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

export type ContentSelectedPropsReturnResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ContentSelectedPropsReturn"] = ResolversParentTypes["ContentSelectedPropsReturn"]
> = {
  PU?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  contentResult?: Resolver<
    Array<ResolversTypes["ContentsSelectedReturn"]>,
    ParentType,
    ContextType
  >;
  model?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  newP?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  oldP?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
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
  topicCompletedMsg?: Resolver<
    ResolversTypes["Message"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentSelectionQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ContentSelectionQueries"] = ResolversParentTypes["ContentSelectionQueries"]
> = {
  contentSelected?: Resolver<
    ResolversTypes["ContentSelectedPropsReturn"],
    ParentType,
    ContextType,
    RequireFields<ContentSelectionQueriesContentSelectedArgs, "input">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentsSelectedReturnResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["ContentsSelectedReturn"] = ResolversParentTypes["ContentsSelectedReturn"]
> = {
  Msg?: Resolver<ResolversTypes["Message"], ParentType, ContextType>;
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

export type MessageResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Message"] = ResolversParentTypes["Message"]
> = {
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  Connection?: ConnectionResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  ContentSelectedPropsReturn?: ContentSelectedPropsReturnResolvers<ContextType>;
  ContentSelectionQueries?: ContentSelectionQueriesResolvers<ContextType>;
  ContentsSelectedReturn?: ContentsSelectedReturnResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
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
