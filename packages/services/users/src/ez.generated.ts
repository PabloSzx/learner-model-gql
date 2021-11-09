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

export type AdminGroupsFilter = {
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type AdminUserMutations = {
  __typename?: "AdminUserMutations";
  createGroup: Group;
  setProjectsToUsers: Array<User>;
  setUserGroups: Array<Group>;
  updateGroup: Group;
  updateUser: User;
  /** Upsert specified users with specified project */
  upsertUsersWithProjects: Array<User>;
};

export type AdminUserMutationsCreateGroupArgs = {
  data: CreateGroupInput;
};

export type AdminUserMutationsSetProjectsToUsersArgs = {
  projectIds: Array<Scalars["IntID"]>;
  userIds: Array<Scalars["IntID"]>;
};

export type AdminUserMutationsSetUserGroupsArgs = {
  groupIds: Array<Scalars["IntID"]>;
  usersEmails: Array<Scalars["EmailAddress"]>;
};

export type AdminUserMutationsUpdateGroupArgs = {
  data: UpdateGroupInput;
};

export type AdminUserMutationsUpdateUserArgs = {
  data: UpdateUserInput;
};

export type AdminUserMutationsUpsertUsersWithProjectsArgs = {
  emails: Array<Scalars["EmailAddress"]>;
  projectsIds: Array<Scalars["IntID"]>;
};

export type AdminUserQueries = {
  __typename?: "AdminUserQueries";
  allGroups: GroupsConnection;
  allUsers: UsersConnection;
};

export type AdminUserQueriesAllGroupsArgs = {
  filters?: Maybe<AdminGroupsFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminUserQueriesAllUsersArgs = {
  filters?: Maybe<AdminUsersFilter>;
  pagination: CursorConnectionArgs;
};

export type AdminUsersFilter = {
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type Connection = {
  pageInfo: PageInfo;
};

export type CreateGroupInput = {
  code: Scalars["String"];
  flags?: Maybe<GroupFlagsInput>;
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
};

export type CursorConnectionArgs = {
  after?: Maybe<Scalars["IntID"]>;
  before?: Maybe<Scalars["IntID"]>;
  first?: Maybe<Scalars["NonNegativeInt"]>;
  last?: Maybe<Scalars["NonNegativeInt"]>;
};

export type Group = {
  __typename?: "Group";
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  flags: GroupFlags;
  id: Scalars["IntID"];
  label: Scalars["String"];
  projectsIds: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  users: Array<User>;
};

export type GroupFlags = {
  __typename?: "GroupFlags";
  createdAt: Scalars["DateTime"];
  id: Scalars["IntID"];
  readProjectActions: Scalars["Boolean"];
  updatedAt: Scalars["DateTime"];
};

export type GroupFlagsInput = {
  readProjectActions: Scalars["Boolean"];
};

export type GroupsConnection = Connection & {
  __typename?: "GroupsConnection";
  nodes: Array<Group>;
  pageInfo: PageInfo;
};

export type Mutation = {
  __typename?: "Mutation";
  adminUsers: AdminUserMutations;
  hello: Scalars["String"];
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

export type Query = {
  __typename?: "Query";
  adminUsers: AdminUserQueries;
  currentUser?: Maybe<User>;
  groups: Array<Group>;
  hello: Scalars["String"];
  users: Array<User>;
};

export type QueryGroupsArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type QueryUsersArgs = {
  ids: Array<Scalars["IntID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  hello: Scalars["String"];
};

export type UpdateGroupInput = {
  code: Scalars["String"];
  flags?: Maybe<GroupFlagsInput>;
  id: Scalars["IntID"];
  label: Scalars["String"];
  projectIds: Array<Scalars["IntID"]>;
  tags: Array<Scalars["String"]>;
};

export type UpdateUserInput = {
  id: Scalars["IntID"];
  locked: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  projectIds: Array<Scalars["IntID"]>;
  role: UserRole;
  tags: Array<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  active: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  enabled: Scalars["Boolean"];
  groups: Array<Group>;
  id: Scalars["IntID"];
  lastOnline?: Maybe<Scalars["DateTime"]>;
  locked: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  projectsIds: Array<Scalars["IntID"]>;
  role: UserRole;
  tags: Array<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type UserRole = "ADMIN" | "USER";

export type UsersConnection = Connection & {
  __typename?: "UsersConnection";
  nodes: Array<User>;
  pageInfo: PageInfo;
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
  AdminGroupsFilter: AdminGroupsFilter;
  String: ResolverTypeWrapper<Scalars["String"]>;
  AdminUserMutations: ResolverTypeWrapper<AdminUserMutations>;
  AdminUserQueries: ResolverTypeWrapper<AdminUserQueries>;
  AdminUsersFilter: AdminUsersFilter;
  Connection:
    | ResolversTypes["GroupsConnection"]
    | ResolversTypes["UsersConnection"];
  CreateGroupInput: CreateGroupInput;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  Group: ResolverTypeWrapper<Group>;
  GroupFlags: ResolverTypeWrapper<GroupFlags>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  GroupFlagsInput: GroupFlagsInput;
  GroupsConnection: ResolverTypeWrapper<GroupsConnection>;
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
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  URL: ResolverTypeWrapper<Scalars["URL"]>;
  UpdateGroupInput: UpdateGroupInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminGroupsFilter: AdminGroupsFilter;
  String: Scalars["String"];
  AdminUserMutations: AdminUserMutations;
  AdminUserQueries: AdminUserQueries;
  AdminUsersFilter: AdminUsersFilter;
  Connection:
    | ResolversParentTypes["GroupsConnection"]
    | ResolversParentTypes["UsersConnection"];
  CreateGroupInput: CreateGroupInput;
  CursorConnectionArgs: CursorConnectionArgs;
  DateTime: Scalars["DateTime"];
  EmailAddress: Scalars["EmailAddress"];
  Group: Group;
  GroupFlags: GroupFlags;
  Boolean: Scalars["Boolean"];
  GroupFlagsInput: GroupFlagsInput;
  GroupsConnection: GroupsConnection;
  IntID: Scalars["IntID"];
  JSON: Scalars["JSON"];
  JSONObject: Scalars["JSONObject"];
  Mutation: {};
  Node: never;
  NonNegativeInt: Scalars["NonNegativeInt"];
  PageInfo: PageInfo;
  Query: {};
  Subscription: {};
  Timestamp: Scalars["Timestamp"];
  URL: Scalars["URL"];
  UpdateGroupInput: UpdateGroupInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UsersConnection: UsersConnection;
  Void: Scalars["Void"];
};

export type AdminUserMutationsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserMutations"] = ResolversParentTypes["AdminUserMutations"]
> = {
  createGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsCreateGroupArgs, "data">
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
  setUserGroups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsSetUserGroupsArgs,
      "groupIds" | "usersEmails"
    >
  >;
  updateGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateGroupArgs, "data">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<AdminUserMutationsUpdateUserArgs, "data">
  >;
  upsertUsersWithProjects?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<
      AdminUserMutationsUpsertUsersWithProjectsArgs,
      "emails" | "projectsIds"
    >
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminUserQueriesResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["AdminUserQueries"] = ResolversParentTypes["AdminUserQueries"]
> = {
  allGroups?: Resolver<
    ResolversTypes["GroupsConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllGroupsArgs, "pagination">
  >;
  allUsers?: Resolver<
    ResolversTypes["UsersConnection"],
    ParentType,
    ContextType,
    RequireFields<AdminUserQueriesAllUsersArgs, "pagination">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<
    "GroupsConnection" | "UsersConnection",
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type GroupResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Group"] = ResolversParentTypes["Group"]
> = {
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  flags?: Resolver<ResolversTypes["GroupFlags"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupFlagsResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["GroupFlags"] = ResolversParentTypes["GroupFlags"]
> = {
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  readProjectActions?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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
  adminUsers?: Resolver<
    ResolversTypes["AdminUserMutations"],
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

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
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
  groups?: Resolver<
    Array<ResolversTypes["Group"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGroupsArgs, "ids">
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
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["IntID"], ParentType, ContextType>;
  lastOnline?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  locked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  projectsIds?: Resolver<
    Array<ResolversTypes["IntID"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes["UserRole"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = EZContext> = {
  AdminUserMutations?: AdminUserMutationsResolvers<ContextType>;
  AdminUserQueries?: AdminUserQueriesResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  GroupFlags?: GroupFlagsResolvers<ContextType>;
  GroupsConnection?: GroupsConnectionResolvers<ContextType>;
  IntID?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
