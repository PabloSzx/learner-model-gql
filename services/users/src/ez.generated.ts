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
  JSONObject: Record<string | number, unknown>;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** ID that parses as non-negative integer, serializes to string, and can be passed as string or number */
  IntID: number;
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
};

export type User = {
  __typename?: "User";
  id: Scalars["IntID"];
  groups: Array<Group>;
};

export type UsersConnection = {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
};

export type AdminQueries = {
  __typename?: "AdminQueries";
  allUsers: UsersConnection;
};

export type AdminQueriesAllUsersArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminMutations = {
  __typename?: "AdminMutations";
  assignProjectsToUsers: Array<User>;
  unassignProjectsToUsers: Array<User>;
};

export type AdminMutationsAssignProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
};

export type AdminMutationsUnassignProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  admin: AdminQueries;
};

export type Mutation = {
  __typename?: "Mutation";
  admin: AdminMutations;
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
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
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>;
  NonNegativeInt: ResolverTypeWrapper<Scalars["NonNegativeInt"]>;
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  Group: ResolverTypeWrapper<Group>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Project: ResolverTypeWrapper<Project>;
  User: ResolverTypeWrapper<User>;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  AdminQueries: ResolverTypeWrapper<AdminQueries>;
  AdminMutations: ResolverTypeWrapper<AdminMutations>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Connection: never;
  CursorConnectionArgs: CursorConnectionArgs;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars["DateTime"];
  Timestamp: Scalars["Timestamp"];
  JSONObject: Scalars["JSONObject"];
  NonNegativeInt: Scalars["NonNegativeInt"];
  IntID: Scalars["IntID"];
  Group: Group;
  String: Scalars["String"];
  Project: Project;
  User: User;
  UsersConnection: UsersConnection;
  AdminQueries: AdminQueries;
  AdminMutations: AdminMutations;
  Query: {};
  Mutation: {};
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  Connection: never;
  CursorConnectionArgs: CursorConnectionArgs;
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

export interface IntIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["IntID"], any> {
  name: "IntID";
}

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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes["AdminQueries"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  admin?: Resolver<ResolversTypes["AdminMutations"], ParentType, ContextType>;
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

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = EZContext> = {
  DateTime?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  IntID?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  AdminQueries?: AdminQueriesResolvers<ContextType>;
  AdminMutations?: AdminMutationsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = EZContext> = Resolvers<ContextType>;

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
