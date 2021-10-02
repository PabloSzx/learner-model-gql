import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/react";
import Router from "next/router";
import { FC, useEffect } from "react";
import {
  CurrentUserQuery,
  useHeaders,
  headers,
  useCurrentUserQuery,
} from "graph/rq";
import { headers as rqHeaders } from "graph/rq-gql";
import { proxy, useSnapshot } from "valtio";
export const AuthState = proxy({
  auth0User: null as Auth0User | null,
  user: null as CurrentUserQuery["currentUser"],
  isLoading: true,
});

export function SyncAuth() {
  const { user, getIdTokenClaims, isLoading } = useAuth0();
  const headersSnap = useHeaders();

  useEffect(() => {
    AuthState.isLoading = currentUser.isLoading || isLoading;
  }, [isLoading]);

  useEffect(() => {
    AuthState.auth0User = user || null;
  }, [user]);

  const currentUser = useCurrentUserQuery(undefined, {
    enabled: !!headersSnap.authorization,
    onSuccess(data) {
      AuthState.user = data.currentUser;
    },
    onSettled() {
      AuthState.isLoading = false;
    },
  });

  useEffect(() => {
    if (user) {
      AuthState.isLoading = true;
      getIdTokenClaims().then((data) => {
        headers.authorization =
          rqHeaders.authorization = `Bearer ${data.__raw}`;

        AuthState.isLoading = true;
      });
    }
  }, [user]);

  return null;
}

export const useAuth = () => useSnapshot(AuthState);

export function withAuth<Props extends Record<string, unknown>>(
  Cmp: FC<Props>
) {
  return function WithAuth(props: Props) {
    const { isLoading, user } = useAuth();

    if (isLoading) return <Spinner />;

    if (user) return <Cmp {...props} />;

    Router.replace("/");

    return <Spinner />;
  };
}
