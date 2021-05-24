import { useQuery, UseQueryOptions } from "react-query";
import { fetcher } from "../fetcher";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<User>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  enabled: Scalars["Boolean"];
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  locked: Scalars["Boolean"];
  active: Scalars["Boolean"];
  lastOnline?: Maybe<Scalars["DateTime"]>;
  role: UserRole;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser?: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "email" | "name" | "role">
  >;
};

export const CurrentUserDocument = `
    query currentUser {
  currentUser {
    id
    email
    name
    role
  }
}
    `;
export const useCurrentUserQuery = <TData = CurrentUserQuery, TError = unknown>(
  variables?: CurrentUserQueryVariables,
  options?: UseQueryOptions<CurrentUserQuery, TError, TData>
) =>
  useQuery<CurrentUserQuery, TError, TData>(
    ["currentUser", variables],
    fetcher<CurrentUserQuery, CurrentUserQueryVariables>(
      CurrentUserDocument,
      variables
    ),
    options
  );
useCurrentUserQuery.document = CurrentUserDocument;

useCurrentUserQuery.getKey = (variables?: CurrentUserQueryVariables) => [
  "currentUser",
  variables,
];
