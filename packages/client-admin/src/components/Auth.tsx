import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/react";
import { CurrentUserQuery, gql, useGQLQuery } from "graph";
import Router from "next/router";
import { FC, useEffect } from "react";
import { proxy, useSnapshot } from "valtio";
import { rqGQLClient } from "../rqClient";

export const AuthState = proxy({
  auth0User: null as Auth0User | null,
  user: null as CurrentUserQuery["currentUser"],
  isLoading: true,
  authorization: undefined as string | undefined,
});

export function SyncAuth() {
  const { user, getIdTokenClaims, isLoading } = useAuth0();
  const { authorization } = useSnapshot(rqGQLClient.headers);

  const { isLoading: currentUserIsLoading } = useGQLQuery(
    gql(/* GraphQL */ `
      query currentUser {
        currentUser {
          id
          email
          name
          role
          picture
        }
      }
    `),
    undefined,
    {
      enabled: !!authorization,
      onSuccess(data) {
        AuthState.user = data.currentUser;
      },
      onSettled() {
        AuthState.isLoading = false;
      },
    }
  );

  useEffect(() => {
    AuthState.isLoading = currentUserIsLoading || isLoading;
  }, [isLoading, currentUserIsLoading]);

  useEffect(() => {
    AuthState.auth0User = user || null;
  }, [user]);

  useEffect(() => {
    if (user) {
      AuthState.isLoading = true;
      getIdTokenClaims().then((data) => {
        AuthState.authorization =
          rqGQLClient.headers.authorization = `Bearer ${data.__raw}`;

        AuthState.isLoading = true;
      });
    }
  }, [user]);

  return null;
}

export const useAuth = () => useSnapshot(AuthState);

export function withAdminAuth<Props extends Record<string, unknown>>(
  Cmp: FC<Props>
) {
  const WithAuth: {
    (props: Props): JSX.Element;
    displayName: string;
  } = function WithAuth(props: Props) {
    const { isLoading, user } = useAuth();

    if (isLoading) return <Spinner />;

    if (user?.role === "ADMIN") return <Cmp {...props} />;

    typeof window !== "undefined" && Router.replace("/");

    return <Spinner />;
  };

  WithAuth.displayName = Cmp.name;

  return WithAuth;
}
