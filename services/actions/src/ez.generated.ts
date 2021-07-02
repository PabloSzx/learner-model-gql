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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string | number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string | Date;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Verb = {
  __typename?: "Verb";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Activity = {
  __typename?: "Activity";
  contentID?: Maybe<Scalars["ID"]>;
  domainID?: Maybe<Scalars["ID"]>;
  stepID?: Maybe<Scalars["ID"]>;
  hintID?: Maybe<Scalars["ID"]>;
  amount?: Maybe<Scalars["Float"]>;
  detail?: Maybe<Scalars["String"]>;
  extra?: Maybe<Scalars["JSONObject"]>;
};

export type Action = {
  __typename?: "Action";
  id: Scalars["ID"];
  verb: Verb;
  activity: Activity;
  timestamp: Scalars["Timestamp"];
  result?: Maybe<Scalars["Float"]>;
};

export type Query = {
  __typename?: "Query";
  data: Action;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

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
  Verb: ResolverTypeWrapper<Verb>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Activity: ResolverTypeWrapper<Activity>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Action: ResolverTypeWrapper<Action>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars["DateTime"];
  Timestamp: Scalars["Timestamp"];
  JSONObject: Scalars["JSONObject"];
  Verb: Verb;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Activity: Activity;
  Float: Scalars["Float"];
  Action: Action;
  Query: {};
  Boolean: Scalars["Boolean"];
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

export type VerbResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Verb"] = ResolversParentTypes["Verb"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Activity"] = ResolversParentTypes["Activity"]
> = {
  contentID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  domainID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  stepID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  hintID?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  extra?: Resolver<
    Maybe<ResolversTypes["JSONObject"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Action"] = ResolversParentTypes["Action"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  verb?: Resolver<ResolversTypes["Verb"], ParentType, ContextType>;
  activity?: Resolver<ResolversTypes["Activity"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = EZContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  data?: Resolver<ResolversTypes["Action"], ParentType, ContextType>;
};

export type Resolvers<ContextType = EZContext> = {
  DateTime?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Verb?: VerbResolvers<ContextType>;
  Activity?: ActivityResolvers<ContextType>;
  Action?: ActionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = EZContext> = Resolvers<ContextType>;

declare module "graphql-ez" {
  interface EZResolvers extends Resolvers<import("graphql-ez").EZContext> {}
}
