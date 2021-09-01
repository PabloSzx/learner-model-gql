import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { useEffect } from "react";
import { CurrentUserQuery, headers, useCurrentUserQuery } from "react-graphql";
import { proxy, useSnapshot } from "valtio";

export const AuthState = proxy({
  auth0User: null as Auth0User | null,
  user: null as CurrentUserQuery["currentUser"],
  isLoading: true,
});

export function SyncAuth() {
  const { user, getIdTokenClaims, isLoading } = useAuth0();
  const headersSnap = useSnapshot(headers);

  useEffect(() => {
    AuthState.isLoading = isLoading;
  }, [isLoading]);

  useEffect(() => {
    AuthState.auth0User = user || null;
  }, [user]);

  useCurrentUserQuery(undefined, {
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
      getIdTokenClaims().then((data) => {
        headers.authorization = `Bearer ${data.__raw}`;

        AuthState.isLoading = true;
      });
    }
  }, [user]);

  return null;
}

export const useAuth = () => useSnapshot(AuthState);
