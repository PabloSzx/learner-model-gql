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

/** User-emitted actions related to system, data mainly used for logging and modeling purposes */
export type Action = {
  __typename?: "Action";
  /** Arbitrary numeric amount */
  amount?: Maybe<Scalars["Float"]>;
  /** Related content */
  content?: Maybe<Content>;
  /** Timestamp of the action, set by the database on row creation */
  createdAt: Scalars["DateTime"];
  /** Arbitrary string content detail */
  detail?: Maybe<Scalars["String"]>;
  /** Arbitrary JSON object data */
  extra?: Maybe<Scalars["JSONObject"]>;
  /** Arbitrary hint identifier */
  hintID?: Maybe<Scalars["ID"]>;
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Related KCs */
  kcs: Array<KC>;
  /** Arbitrary numeric result */
  result?: Maybe<Scalars["Float"]>;
  /** Arbitrary step identifier */
  stepID?: Maybe<Scalars["ID"]>;
  /** Timestamp of the action, set by the action emitter */
  timestamp: Scalars["Timestamp"];
  /** Related topic */
  topic?: Maybe<Topic>;
  /** User that emitted the action */
  user?: Maybe<User>;
  /** Type of action */
  verb: ActionVerb;
};

/** Input of action report */
export type ActionInput = {
  /** Arbitrary numeric amount */
  amount?: InputMaybe<Scalars["Float"]>;
  /**
   * Content identifier
   *
   * If it's numeric, it points to the "id" property of the content, otherwise, it points to the "code" property.
   *
   * Validation of content presence/authorization is made before confirming action
   */
  contentID?: InputMaybe<Scalars["ID"]>;
  /** Arbitrary string content detail */
  detail?: InputMaybe<Scalars["String"]>;
  /** Arbitrary JSON object data */
  extra?: InputMaybe<Scalars["JSONObject"]>;
  /** Arbitrary hint identifier */
  hintID?: InputMaybe<Scalars["ID"]>;
  /**
   * KCs identifiers
   *
   * If it's numeric, it points to the "id" property of the content, otherwise, it points to the "code" property.
   *
   * Validation of kc presence/authorization is made before confirming action
   */
  kcsIDs?: InputMaybe<Array<Scalars["ID"]>>;
  /**
   * Identifier of project related to action.
   *
   * It's verified based on authenticated user, and attached validated ids are validated against the specified project
   */
  projectId: Scalars["IntID"];
  /** Arbitrary numeric result */
  result?: InputMaybe<Scalars["Float"]>;
  /** Arbitrary step identifier */
  stepID?: InputMaybe<Scalars["ID"]>;
  /**
   * Timestamp of the action.
   *
   * Format in number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
   */
  timestamp: Scalars["Timestamp"];
  /**
   * Topic identifier
   *
   * If it's numeric, it points to the "id" property of the content, otherwise, it points to the "code" property.
   *
   * Validation of topic presence/authorization is made before confirming action
   */
  topicID?: InputMaybe<Scalars["ID"]>;
  /** Type of action, if specified verb doesn't exist, it's automatically created */
  verbName: Scalars["String"];
};

/**
 * Action Verb
 *
 * Main action categorization system
 */
export type ActionVerb = {
  __typename?: "ActionVerb";
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Name of the verb */
  name: Scalars["String"];
};

/** Paginated Actions */
export type ActionsConnection = Connection & {
  __typename?: "ActionsConnection";
  /** Nodes of the current page */
  nodes: Array<Action>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

/** Paginated Actions Verbs */
export type ActionsVerbsConnection = Connection & {
  __typename?: "ActionsVerbsConnection";
  /** Nodes of the current page */
  nodes: Array<ActionVerb>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

/** Admin Action-Related Queries */
export type AdminActionQueries = {
  __typename?: "AdminActionQueries";
  /**
   * Get all the actions currently in the system
   *
   * Pagination parameters are mandatory, but filters and orderBy are optional, and therefore the search can be customized.
   */
  allActions: ActionsConnection;
  /** Get all the action's verbs currently in the system */
  allActionsVerbs: ActionsVerbsConnection;
};

/** Admin Action-Related Queries */
export type AdminActionQueriesallActionsArgs = {
  filters?: InputMaybe<AdminActionsFilter>;
  orderBy?: InputMaybe<AdminActionsOrderBy>;
  pagination: CursorConnectionArgs;
};

/** Admin Action-Related Queries */
export type AdminActionQueriesallActionsVerbsArgs = {
  pagination: CursorConnectionArgs;
};

/** Filter all actions of admin query */
export type AdminActionsFilter = {
  /**
   * Filter by the specified content
   *
   * If action's content matches any of the specified content, the action is included
   */
  content?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified end date
   *
   * If action's timestamp is before the specified date, the action is included
   */
  endDate?: InputMaybe<Scalars["DateTime"]>;
  /**
   * Filter by the specified KCs
   *
   * If any of the action's KCs matches any of the specified KCs, the action is included
   */
  kcs?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified projects
   *
   * If action's project matches any of the specified projects, the action is included
   */
  projects?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified starting date
   *
   * If action's timestamp is after the specified date, the action is included
   */
  startDate?: InputMaybe<Scalars["DateTime"]>;
  /**
   * Filter by the specified topics
   *
   * If action's topic matches any of the specified topics, the action is included
   */
  topics?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified users
   *
   * If action's user matches any of the specified users, the action is included
   */
  users?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified verbs
   *
   * If action's verb matches any of the specified verbs, the action is included
   */
  verbNames?: InputMaybe<Array<Scalars["String"]>>;
};

/** Order Admin Actions */
export type AdminActionsOrderBy = {
  /**
   * Order the actions ascendingly or descendingly
   *
   * Following the cursor pagination's nature, ordering by "id" tends to follow the action creation date
   *
   * By default the actions are ordered descendingly, showing the newer actions first
   */
  id?: InputMaybe<ORDER_BY>;
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

export type KC = {
  __typename?: "KC";
  /** Unique numeric identifier */
  id: Scalars["IntID"];
};

export type Mutation = {
  __typename?: "Mutation";
  /**
   * Report an action to the modeling service
   *
   * - User authentication is required
   * - Authenticated user has to be associated with specified project
   */
  action?: Maybe<Scalars["Void"]>;
  /** Returns 'Hello World!' */
  hello: Scalars["String"];
};

export type MutationactionArgs = {
  data: ActionInput;
};

/** Minimum Entity Information */
export type Node = {
  /** Unique numeric identifier */
  id: Scalars["IntID"];
};

/** Order ascendingly or descendingly */
export const ORDER_BY = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export type ORDER_BY = typeof ORDER_BY[keyof typeof ORDER_BY];
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

export type Project = {
  __typename?: "Project";
  /**
   * All actions of the project
   *
   * ADMIN User role or "readProjectActions" group permissions flag required
   */
  actions: ActionsConnection;
  /** Unique numeric identifier */
  id: Scalars["IntID"];
};

export type ProjectactionsArgs = {
  filters?: InputMaybe<ProjectActionsFilter>;
  pagination: CursorConnectionArgs;
};

/** Filter the actions of a project */
export type ProjectActionsFilter = {
  /**
   * Filter by the specified content
   *
   * If action's content matches any of the specified content, the action is included
   */
  content?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified end date
   *
   * If action's timestamp is before the specified date, the action is included
   */
  endDate?: InputMaybe<Scalars["DateTime"]>;
  /**
   * Filter by the specified KCs
   *
   * If any of the action's KCs matches any of the specified KCs, the action is included
   */
  kcs?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified starting date
   *
   * If action's timestamp is after the specified date, the action is included
   */
  startDate?: InputMaybe<Scalars["DateTime"]>;
  /**
   * Filter by the specified topics
   *
   * If action's topic matches any of the specified topics, the action is included
   */
  topics?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified users
   *
   * If action's user matches any of the specified users, the action is included
   */
  users?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified verbs
   *
   * If action's verb matches any of the specified verbs, the action is included
   */
  verbNames?: InputMaybe<Array<Scalars["String"]>>;
};

export type Query = {
  __typename?: "Query";
  /** Admin related actions queries, only authenticated users with the role "ADMIN" can access */
  adminActions: AdminActionQueries;
  /** Returns 'Hello World!' */
  hello: Scalars["String"];
  /**
   * Get all the projects associated with the specified identifiers
   *
   * The projects data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  projects: Array<Project>;
};

export type QueryprojectsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  /** Emits 'Hello World1', 'Hello World2', 'Hello World3', 'Hello World4' and 'Hello World5' */
  hello: Scalars["String"];
};

/** Topic entity */
export type Topic = {
  __typename?: "Topic";
  /** Unique numeric identifier */
  id: Scalars["IntID"];
};

/** User entity */
export type User = {
  __typename?: "User";
  /** Unique numeric identifier */
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
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  KC: ResolverTypeWrapper<KC>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  ORDER_BY: ORDER_BY;
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
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  KC: KC;
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
    RequireFields<AdminActionQueriesallActionsArgs, "pagination">
  >;
  allActionsVerbs?: Resolver<
    ResolversTypes["ActionsVerbsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminActionQueriesallActionsVerbsArgs, "pagination">
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

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export interface IntIDScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IntID"], any> {
  name: "IntID";
}

export interface JSONScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JSONObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export type KCResolvers<
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
    RequireFields<MutationactionArgs, "data">
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
    RequireFields<ProjectactionsArgs, "pagination">
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
    RequireFields<QueryprojectsArgs, "ids">
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

export interface URLScalarConfig
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
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  KC?: KCResolvers<ContextType>;
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
