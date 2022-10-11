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

/** Admin Domain-Related Queries */
export type AdminDomainMutations = {
  __typename?: "AdminDomainMutations";
  /** Create a new domain entity */
  createDomain: Domain;
  /** Create a new KC entity */
  createKC: KC;
  /** Create a new topic entity */
  createTopic: Topic;
  /** Set KC Relation */
  setKCRelation: KCRelation;
  /** Unset KC Relation */
  unsetKCRelation?: Maybe<Scalars["Void"]>;
  /** Update an existent domain entity */
  updateDomain: Domain;
  /** Update an existent KC entity */
  updateKC: KC;
  /** Update an existent topic entity */
  updateTopic: Topic;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationscreateDomainArgs = {
  input: CreateDomain;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationscreateKCArgs = {
  data: CreateKCInput;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationscreateTopicArgs = {
  input: CreateTopic;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationssetKCRelationArgs = {
  data: KCRelationInput;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationsunsetKCRelationArgs = {
  data: KCRelationInput;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationsupdateDomainArgs = {
  input: UpdateDomain;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationsupdateKCArgs = {
  data: UpdateKCInput;
};

/** Admin Domain-Related Queries */
export type AdminDomainMutationsupdateTopicArgs = {
  input: UpdateTopic;
};

/** Admin Domain-Related Queries */
export type AdminDomainQueries = {
  __typename?: "AdminDomainQueries";
  /**
   * Get all the domains currently in the system
   *
   * Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
   */
  allDomains: DomainsConnection;
  /**
   * Get all the KCs currently in the system
   *
   * Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
   */
  allKCs: KCsConnection;
  /**
   * Get all the topics currently in the system
   *
   * Pagination parameters are mandatory, but filters is optional, and therefore the search can be customized.
   */
  allTopics: TopicsConnection;
};

/** Admin Domain-Related Queries */
export type AdminDomainQueriesallDomainsArgs = {
  filters?: InputMaybe<AdminDomainsFilter>;
  pagination: CursorConnectionArgs;
};

/** Admin Domain-Related Queries */
export type AdminDomainQueriesallKCsArgs = {
  filters?: InputMaybe<AdminKCsFilter>;
  pagination: CursorConnectionArgs;
};

/** Admin Domain-Related Queries */
export type AdminDomainQueriesallTopicsArgs = {
  filters?: InputMaybe<AdminTopicsFilter>;
  pagination: CursorConnectionArgs;
};

/** Filter all domains of admin query */
export type AdminDomainsFilter = {
  /**
   * Filter by the specified projects
   *
   * If the domain's project matches any of the specified projects, the domain is included
   */
  projects?: InputMaybe<Array<Scalars["IntID"]>>;
  /** Filter by text search inside "code" or "label" */
  textSearch?: InputMaybe<Scalars["String"]>;
};

/** Filter all KCs of admin query */
export type AdminKCsFilter = {
  /**
   * Filter by the specified projects
   *
   * If the KC's domain matches any of the specified projects, the KC is included
   */
  domains?: InputMaybe<Array<Scalars["IntID"]>>;
  /**
   * Filter by the specified projects
   *
   * If the KC's project matches any of the specified projects, the KC is included
   */
  projects?: InputMaybe<Array<Scalars["IntID"]>>;
  /** Filter by text search inside "code" or "label" */
  textSearch?: InputMaybe<Scalars["String"]>;
  /**
   * Filter by the specified topics
   *
   * If any of the KC's topics matches any of the specified topics, the KC is included
   */
  topics?: InputMaybe<Array<Scalars["IntID"]>>;
};

/** Filter all topics of admin query */
export type AdminTopicsFilter = {
  /**
   * Filter by the specified projects
   *
   * If the topic's project matches any of the specified projects, the topic is included
   */
  projects?: InputMaybe<Array<Scalars["IntID"]>>;
  /** Filter by text search inside "code", "label" or "tags" */
  textSearch?: InputMaybe<Scalars["String"]>;
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
  /** KCs associated with the content */
  kcs: Array<KC>;
  /** Topics associated with the content */
  topics: Array<Topic>;
};

/** Domain creation input data */
export type CreateDomain = {
  /** Unique string identifier */
  code: Scalars["String"];
  /** Human readable identifier */
  label: Scalars["String"];
  /** Projects associated with domain */
  projectsIds: Array<Scalars["IntID"]>;
};

/** KC creation input data */
export type CreateKCInput = {
  /** Unique string identifier */
  code: Scalars["String"];
  /** Domain associated with KC */
  domainId: Scalars["IntID"];
  /** Human readable identifier */
  label: Scalars["String"];
};

/** Topic creation input data */
export type CreateTopic = {
  /** Unique string identifier */
  code: Scalars["String"];
  /** Content associated with topic */
  contentIds: Array<Scalars["IntID"]>;
  /** Human readable identifier */
  label: Scalars["String"];
  /**
   * Parent topic
   *
   * Used to set the hierarchy of topics
   */
  parentTopicId?: InputMaybe<Scalars["IntID"]>;
  /** Project associated with topic */
  projectId: Scalars["IntID"];
  /** Parameter that can be used to sort a list of topics */
  sortIndex?: InputMaybe<Scalars["Int"]>;
  /**
   * Tags associated with the topic
   *
   * Tags can be used to categorize or filter
   */
  tags: Array<Scalars["String"]>;
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

/** Domain entity */
export type Domain = {
  __typename?: "Domain";
  /** Unique string identifier */
  code: Scalars["String"];
  /** Date of creation */
  createdAt: Scalars["DateTime"];
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** KCs associated with the domain */
  kcs: Array<KC>;
  /** Human readable identifier */
  label: Scalars["String"];
  /** Date of last update */
  updatedAt: Scalars["DateTime"];
};

/** Paginated Domains */
export type DomainsConnection = Connection & {
  __typename?: "DomainsConnection";
  /** Nodes of the current page */
  nodes: Array<Domain>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

/** KC / Knowledge Component Entity */
export type KC = {
  __typename?: "KC";
  /** Unique string identifier */
  code: Scalars["String"];
  /** Date of creation */
  createdAt: Scalars["DateTime"];
  /** Domain associated with the KC */
  domain: Domain;
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Human readable identifier */
  label: Scalars["String"];
  /** All relations of KC */
  relations: Array<KCRelation>;
  /** Topics associated with the KC */
  topics: Array<Topic>;
  /** Date of last update */
  updatedAt: Scalars["DateTime"];
};

/** Relations between KCs */
export type KCRelation = {
  __typename?: "KCRelation";
  /** Custom Comment of KC Relation */
  comment?: Maybe<Scalars["String"]>;
  /** Domain shared by both KCs */
  domain: Domain;
  /** Domain id shared by both KCs */
  domainId: Scalars["IntID"];
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** KC A */
  kcA: KC;
  /** KC A id */
  kcAId: Scalars["IntID"];
  /** KC B */
  kcB: KC;
  /** KC B id */
  kcBId: Scalars["IntID"];
  /** Custom Label of KC Relation */
  label?: Maybe<Scalars["String"]>;
  /** Type of relation */
  type: KCRelationType;
};

export type KCRelationInput = {
  /** Custom comment text */
  comment?: InputMaybe<Scalars["String"]>;
  /** KC A */
  kcA: Scalars["IntID"];
  /** KC B */
  kcB: Scalars["IntID"];
  /** Relation readable label */
  label?: InputMaybe<Scalars["String"]>;
  /** Type of KC Relation */
  type: KCRelationType;
};

/** Type of KC Relationship */
export const KCRelationType = {
  INTERACT: "INTERACT",
  PARTOF: "PARTOF",
  PREREQUISITE: "PREREQUISITE",
} as const;

export type KCRelationType = typeof KCRelationType[keyof typeof KCRelationType];
/** Paginated KCs */
export type KCsConnection = Connection & {
  __typename?: "KCsConnection";
  /** Nodes of the current page */
  nodes: Array<KC>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Admin related domain mutations, only authenticated users with the role "ADMIN" can access */
  adminDomain: AdminDomainMutations;
  /** Returns 'Hello World!' */
  hello: Scalars["String"];
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
  /** Domains associated with the project */
  domains: Array<Domain>;
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** Topics associated with the project */
  topics: Array<Topic>;
};

export type Query = {
  __typename?: "Query";
  /** Admin related domain queries, only authenticated users with the role "ADMIN" can access */
  adminDomain: AdminDomainQueries;
  /**
   * Get all the content associated with the specified identifiers
   *
   * The content data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  content: Array<Content>;
  /**
   * Get all the domains associated with the specified identifiers
   *
   * The domains data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  domains: Array<Domain>;
  /** Returns 'Hello World!' */
  hello: Scalars["String"];
  /**
   * Get all the KCs associated with the specified identifiers
   *
   * The KCs data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  kcs: Array<KC>;
  /**
   * Get all the projects associated with the specified identifiers
   *
   * The projects data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  projects: Array<Project>;
  /**
   * Get specified topic by "code".
   *
   * - If user is not authenticated it throws.
   * - If authenticated user has no permissions on the corresponding project it returns NULL.
   */
  topicByCode?: Maybe<Topic>;
  /**
   * Get all the topics associated with the specified identifiers
   *
   * The topics data is guaranteed to follow the specified identifiers order
   *
   * If any of the specified identifiers is not found or forbidden, query fails
   */
  topics: Array<Topic>;
};

export type QuerycontentArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QuerydomainsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QuerykcsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryprojectsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QuerytopicByCodeArgs = {
  code: Scalars["String"];
};

export type QuerytopicsArgs = {
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
  /**
   * Childrens topics
   *
   * Direct childrens of the current topic
   *
   * To build the topics tree, use the "parent" topic
   */
  childrens: Array<Topic>;
  /** Unique string identifier */
  code: Scalars["String"];
  /** Date of creation */
  createdAt: Scalars["DateTime"];
  /** Unique numeric identifier */
  id: Scalars["IntID"];
  /** KCs associated with the topic */
  kcs: Array<KC>;
  /** Human readable identifier */
  label: Scalars["String"];
  /**
   * Parent topic
   *
   * Used to set the hierarchy of topics
   */
  parent?: Maybe<Topic>;
  /** Parameter that can be used to sort a list of domains */
  sortIndex?: Maybe<Scalars["Int"]>;
  /**
   * Tags associated with the domain
   *
   * Tags can be used to categorize or filter
   */
  tags: Array<Scalars["String"]>;
  /** Date of last update */
  updatedAt: Scalars["DateTime"];
};

/** Paginated Topics */
export type TopicsConnection = Connection & {
  __typename?: "TopicsConnection";
  /** Nodes of the current page */
  nodes: Array<Topic>;
  /** Pagination related information */
  pageInfo: PageInfo;
};

/** Domain update input data */
export type UpdateDomain = {
  /** Unique string identifier */
  code: Scalars["String"];
  /** Current domain identifier */
  id: Scalars["IntID"];
  /** Human readable identifier */
  label: Scalars["String"];
};

export type UpdateKCInput = {
  /** Unique string identifier */
  code: Scalars["String"];
  /** Unique numeric identifier of the current KC */
  id: Scalars["IntID"];
  /** Human readable identifier */
  label: Scalars["String"];
};

/** Topic update input data */
export type UpdateTopic = {
  /** Unique string identifier */
  code: Scalars["String"];
  /** Content associated with topic */
  contentIds: Array<Scalars["IntID"]>;
  /** Current topic identifier */
  id: Scalars["IntID"];
  /** Human readable identifier */
  label: Scalars["String"];
  /**
   * Parent topic
   *
   * Used to set the hierarchy of topics
   */
  parentTopicId?: InputMaybe<Scalars["IntID"]>;
  /** Parameter that can be used to sort a list of topics */
  sortIndex?: InputMaybe<Scalars["Int"]>;
  /**
   * Tags associated with the topic
   *
   * Tags can be used to categorize or filter
   */
  tags: Array<Scalars["String"]>;
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
  AdminDomainMutations: ResolverTypeWrapper<AdminDomainMutations>;
  AdminDomainQueries: ResolverTypeWrapper<AdminDomainQueries>;
  AdminDomainsFilter: AdminDomainsFilter;
  String: ResolverTypeWrapper<Scalars["String"]>;
  AdminKCsFilter: AdminKCsFilter;
  AdminTopicsFilter: AdminTopicsFilter;
  Connection:
    | ResolversTypes["DomainsConnection"]
    | ResolversTypes["KCsConnection"]
    | ResolversTypes["TopicsConnection"];
  Content: ResolverTypeWrapper<Content>;
  CreateDomain: CreateDomain;
  CreateKCInput: CreateKCInput;
  CreateTopic: CreateTopic;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Domain: ResolverTypeWrapper<Domain>;
  DomainsConnection: ResolverTypeWrapper<DomainsConnection>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  KC: ResolverTypeWrapper<KC>;
  KCRelation: ResolverTypeWrapper<KCRelation>;
  KCRelationInput: KCRelationInput;
  KCRelationType: KCRelationType;
  KCsConnection: ResolverTypeWrapper<KCsConnection>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: never;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  ORDER_BY: ORDER_BY;
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
  UpdateKCInput: UpdateKCInput;
  UpdateTopic: UpdateTopic;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminDomainMutations: AdminDomainMutations;
  AdminDomainQueries: AdminDomainQueries;
  AdminDomainsFilter: AdminDomainsFilter;
  String: Scalars["String"];
  AdminKCsFilter: AdminKCsFilter;
  AdminTopicsFilter: AdminTopicsFilter;
  Connection:
    | ResolversParentTypes["DomainsConnection"]
    | ResolversParentTypes["KCsConnection"]
    | ResolversParentTypes["TopicsConnection"];
  Content: Content;
  CreateDomain: CreateDomain;
  CreateKCInput: CreateKCInput;
  CreateTopic: CreateTopic;
  Int: Scalars["Int"];
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  Domain: Domain;
  DomainsConnection: DomainsConnection;
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  KC: KC;
  KCRelation: KCRelation;
  KCRelationInput: KCRelationInput;
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
  UpdateKCInput: UpdateKCInput;
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
    RequireFields<AdminDomainMutationscreateDomainArgs, "input">
  >;
  createKC?: Resolver<
    ResolversTypes["KC"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationscreateKCArgs, "data">
  >;
  createTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationscreateTopicArgs, "input">
  >;
  setKCRelation?: Resolver<
    ResolversTypes["KCRelation"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationssetKCRelationArgs, "data">
  >;
  unsetKCRelation?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsunsetKCRelationArgs, "data">
  >;
  updateDomain?: Resolver<
    ResolversTypes["Domain"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsupdateDomainArgs, "input">
  >;
  updateKC?: Resolver<
    ResolversTypes["KC"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsupdateKCArgs, "data">
  >;
  updateTopic?: Resolver<
    ResolversTypes["Topic"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainMutationsupdateTopicArgs, "input">
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
    RequireFields<AdminDomainQueriesallDomainsArgs, "pagination">
  >;
  allKCs?: Resolver<
    ResolversTypes["KCsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainQueriesallKCsArgs, "pagination">
  >;
  allTopics?: Resolver<
    ResolversTypes["TopicsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminDomainQueriesallTopicsArgs, "pagination">
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
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  relations?: Resolver<
    Array<ResolversTypes["KCRelation"]>,
    ParentType,
    ContextType
  >;
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KCRelationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["KCRelation"] = ResolversParentTypes["KCRelation"]
> = {
  comment?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  domain?: Resolver<ResolversTypes["Domain"], ParentType, ContextType>;
  domainId?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  kcA?: Resolver<ResolversTypes["KC"], ParentType, ContextType>;
  kcAId?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  kcB?: Resolver<ResolversTypes["KC"], ParentType, ContextType>;
  kcBId?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes["KCRelationType"], ParentType, ContextType>;
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
  topics?: Resolver<Array<ResolversTypes["Topic"]>, ParentType, ContextType>;
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
    RequireFields<QuerycontentArgs, "ids">
  >;
  domains?: Resolver<
    Array<ResolversTypes["Domain"]>,
    ParentType,
    ContextType,
    RequireFields<QuerydomainsArgs, "ids">
  >;
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  kcs?: Resolver<
    Array<ResolversTypes["KC"]>,
    ParentType,
    ContextType,
    RequireFields<QuerykcsArgs, "ids">
  >;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<QueryprojectsArgs, "ids">
  >;
  topicByCode?: Resolver<
    Maybe<ResolversTypes["Topic"]>,
    ParentType,
    ContextType,
    RequireFields<QuerytopicByCodeArgs, "code">
  >;
  topics?: Resolver<
    Array<ResolversTypes["Topic"]>,
    ParentType,
    ContextType,
    RequireFields<QuerytopicsArgs, "ids">
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
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
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

export interface URLScalarConfig
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
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  KC?: KCResolvers<ContextType>;
  KCRelation?: KCRelationResolvers<ContextType>;
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
