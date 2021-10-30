import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/react";
import { CurrentUserQuery, gql, useGQLQuery } from "graph";
import Router from "next/router";
import { FC, useEffect, useMemo } from "react";
import { proxy, useSnapshot } from "valtio";
import { rqGQLClient } from "../rqClient";

export const AuthState = proxy({
  auth0User: null as Auth0User | null,
  user: null as CurrentUserQuery["currentUser"],
  isLoading: true,
});

export function SyncAuth() {
  const { user, getIdTokenClaims, isLoading } = useAuth0();
  const headersSnap = useSnapshot(rqGQLClient.headers);

  useEffect(() => {
    AuthState.isLoading = currentUser.isLoading || isLoading;
  }, [isLoading]);

  useEffect(() => {
    AuthState.auth0User = user || null;
  }, [user]);

  const currentUser = useGQLQuery(
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
      enabled: !!headersSnap.authorization,
      onSuccess(data) {
        AuthState.user = data.currentUser;
      },
      onSettled() {
        AuthState.isLoading = false;
      },
    }
  );

  useEffect(() => {
    if (user) {
      AuthState.isLoading = true;
      getIdTokenClaims().then((data) => {
        rqGQLClient.headers.authorization = `Bearer ${data.__raw}`;

        AuthState.isLoading = true;
      });
    }
  }, [user]);

  return null;
}

export const useAuth = () => {
  const auth = useSnapshot(AuthState);
  const headers = useSnapshot(rqGQLClient.headers);

  return useMemo(
    () => ({
      ...auth,
      headers,
    }),
    [auth, headers]
  );
};

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

    Router.replace("/");

    return <Spinner />;
  };

  WithAuth.displayName = Cmp.name;

  return WithAuth;
}
