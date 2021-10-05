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

export type Content = {
  __typename?: "Content";
  id: Scalars["IntID"];
  project: Project;
};

export type Domain = {
  __typename?: "Domain";
  id: Scalars["IntID"];
  project: Project;
};

export type Topic = {
  __typename?: "Topic";
  id: Scalars["IntID"];
  project: Project;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["IntID"];
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
};

export type UpdateProject = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
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

export type User = {
  __typename?: "User";
  id: Scalars["IntID"];
  projects: Array<Project>;
};

export type Group = {
  __typename?: "Group";
  id: Scalars["IntID"];
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
  pageInfo: PageInfo;
};

export type CursorConnectionArgs = {
  first?: Maybe<Scalars["NonNegativeInt"]>;
  after?: Maybe<Scalars["IntID"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
  before?: Maybe<Scalars["IntID"]>;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  content: Array<Content>;
  domains: Array<Domain>;
  topics: Array<Topic>;
  adminProjects: AdminProjectsQueries;
  projects: Array<Project>;
  users: Array<User>;
  groups: Array<Group>;
};

export type QueryContentArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryDomainsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryTopicsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryProjectsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryUsersArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryGroupsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  hello: Scalars["String"];
  adminProjects: AdminProjectsMutations;
};

export type Subscription = {
  __typename?: "Subscription";
  hello: Scalars["String"];
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
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  Content: ResolverTypeWrapper<Content>;
  Domain: ResolverTypeWrapper<Domain>;
  Topic: ResolverTypeWrapper<Topic>;
  Project: ResolverTypeWrapper<Project>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ProjectsConnection: ResolverTypeWrapper<ProjectsConnection>;
  AdminProjectsQueries: ResolverTypeWrapper<AdminProjectsQueries>;
  CreateProject: CreateProject;
  UpdateProject: UpdateProject;
  AdminProjectsMutations: ResolverTypeWrapper<AdminProjectsMutations>;
  User: ResolverTypeWrapper<User>;
  Group: ResolverTypeWrapper<Group>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Node: never;
  Connection: ResolversTypes["ProjectsConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars["DateTime"];
  Timestamp: Scalars["Timestamp"];
  JSONObject: Scalars["JSONObject"];
  NonNegativeInt: Scalars["NonNegativeInt"];
  Void: Scalars["Void"];
  URL: Scalars["URL"];
  EmailAddress: Scalars["EmailAddress"];
  IntID: Scalars["IntID"];
  Content: Content;
  Domain: Domain;
  Topic: Topic;
  Project: Project;
  String: Scalars["String"];
  ProjectsConnection: ProjectsConnection;
  AdminProjectsQueries: AdminProjectsQueries;
  CreateProject: CreateProject;
  UpdateProject: UpdateProject;
  AdminProjectsMutations: AdminProjectsMutations;
  User: User;
  Group: Group;
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  Node: never;
  Connection: ResolversParentTypes["ProjectsConnection"];
  CursorConnectionArgs: CursorConnectionArgs;
  Query: {};
  Mutation: {};
  Subscription: {};
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

export type ContentResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Content"] = ResolversParentTypes["Content"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Domain"] = ResolversParentTypes["Domain"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Topic"] = ResolversParentTypes["Topic"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  project?: Resolver<ResolversTypes["Project"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Project"] = ResolversParentTypes["Project"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
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

export type UserResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Group"] = ResolversParentTypes["Group"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<"ProjectsConnection", ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  topics?: Resolver<
    Array<ResolversTypes["Topic"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTopicsArgs, "ids">
  >;
  adminProjects?: Resolver<
    ResolversTypes["AdminProjectsQueries"],
    ParentType,
    ContextType
  >;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProjectsArgs, "ids">
  >;
  users?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, "ids">
  >;
  groups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupsArgs, "ids">
  >;
};

export type MutationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type Resolvers<ContextType = EZContext> = {
  DateTime?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  Content?: ContentResolvers<ContextType>;
  Domain?: DomainResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectsConnection?: ProjectsConnectionResolvers<ContextType>;
  AdminProjectsQueries?: AdminProjectsQueriesResolvers<ContextType>;
  AdminProjectsMutations?: AdminProjectsMutationsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
