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
  /** ID that parses as non-negative integer, serializes to string, and can be passed as string or number */
  IntID: number;
};

export type Group = {
  __typename?: "Group";
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  users: Array<User>;
  projectsIds: Array<Scalars["IntID"]>;
};

export type CreateGroupInput = {
  code: Scalars["String"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
};

export type UpdateGroupInput = {
  id: Scalars["IntID"];
  code: Scalars["String"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
};

export type GroupsConnection = Connection & {
  __typename?: "GroupsConnection";
  nodes: Array<Group>;
  pageInfo: PageInfo;
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
  projectsIds: Array<Scalars["IntID"]>;
};

export type UsersConnection = {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
};

export type AdminUserQueries = {
  __typename?: "AdminUserQueries";
  allUsers: UsersConnection;
  allGroups: GroupsConnection;
};

export type AdminUserQueriesAllUsersArgs = {
  pagination: CursorConnectionArgs;
};

export type AdminUserQueriesAllGroupsArgs = {
  pagination: CursorConnectionArgs;
};

export type UpsertUserInput = {
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type UpdateUserInput = {
  id: Scalars["IntID"];
  role: UserRole;
  locked: Scalars["Boolean"];
};

export type AdminUserMutations = {
  __typename?: "AdminUserMutations";
  /** Upsert specified users, if user with specified email already exists, updates it with the specified name */
  upsertUsers: Array<User>;
  updateUser: User;
  setUserGroups: Array<User>;
  createGroup: Group;
  updateGroup: Group;
  setProjectsToUsers: Array<User>;
};

export type AdminUserMutationsUpsertUsersArgs = {
  data: Array<UpsertUserInput>;
};

export type AdminUserMutationsUpdateUserArgs = {
  data: UpdateUserInput;
};

export type AdminUserMutationsSetUserGroupsArgs = {
  userIds: Array<Scalars["IntID"]>;
  groupIds: Array<Scalars["IntID"]>;
};

export type AdminUserMutationsCreateGroupArgs = {
  data: CreateGroupInput;
};

export type AdminUserMutationsUpdateGroupArgs = {
  data: UpdateGroupInput;
};

export type AdminUserMutationsSetProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
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
  groups: Array<Group>;
  adminUsers: AdminUserQueries;
  currentUser?: Maybe<User>;
  users: Array<User>;
};

export type QueryGroupsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryUsersArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  hello: Scalars["String"];
  adminUsers: AdminUserMutations;
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
  IntID: ResolverTypeWrapper<Scalars["IntID"]>;
  Group: ResolverTypeWrapper<Group>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  CreateGroupInput: CreateGroupInput;
  UpdateGroupInput: UpdateGroupInput;
  GroupsConnection: ResolverTypeWrapper<GroupsConnection>;
  UserRole: UserRole;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  AdminUserQueries: ResolverTypeWrapper<AdminUserQueries>;
  UpsertUserInput: UpsertUserInput;
  UpdateUserInput: UpdateUserInput;
  AdminUserMutations: ResolverTypeWrapper<AdminUserMutations>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Node: never;
  Connection: ResolversTypes["GroupsConnection"];
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
  IntID: Scalars["IntID"];
  Group: Group;
  String: Scalars["String"];
  CreateGroupInput: CreateGroupInput;
  UpdateGroupInput: UpdateGroupInput;
  GroupsConnection: GroupsConnection;
  User: User;
  Boolean: Scalars["Boolean"];
  UsersConnection: UsersConnection;
  AdminUserQueries: AdminUserQueries;
  UpsertUserInput: UpsertUserInput;
  UpdateUserInput: UpdateUserInput;
  AdminUserMutations: AdminUserMutations;
  PageInfo: PageInfo;
  Node: never;
  Connection: ResolversParentTypes["GroupsConnection"];
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
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupsConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["GroupsConnection"] = ResolversParentTypes["GroupsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
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

export type AdminUserQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserQueries"] = ResolversParentTypes["AdminUserQueries"]
> = {
  allUsers?: Resolver<
    ResolversTypes["UsersConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllUsersArgs, "pagination">
  >;
  allGroups?: Resolver<
    ResolversTypes["GroupsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllGroupsArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminUserMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserMutations"] = ResolversParentTypes["AdminUserMutations"]
> = {
  upsertUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpsertUsersArgs, "data">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateUserArgs, "data">
  >;
  setUserGroups?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsSetUserGroupsArgs, "userIds" | "groupIds">
  >;
  createGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsCreateGroupArgs, "data">
  >;
  updateGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateGroupArgs, "data">
  >;
  setProjectsToUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsSetProjectsToUsersArgs,
      "projectIds" | "userIds"
    >
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
  __resolveType: TypeResolveFn<"GroupsConnection", ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  groups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupsArgs, "ids">
  >;
  adminUsers?: Resolver<
    ResolversTypes["AdminUserQueries"],
    ParentType,
    ContextType
  >;
  currentUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, "ids">
  >;
};

export type MutationResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  adminUsers?: Resolver<
    ResolversTypes["AdminUserMutations"],
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
  IntID?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  GroupsConnection?: GroupsConnectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  AdminUserQueries?: AdminUserQueriesResolvers<ContextType>;
  AdminUserMutations?: AdminUserMutationsResolvers<ContextType>;
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
