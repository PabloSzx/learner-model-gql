import { useEffect } from "react";
import { headers, ReactQuery } from "react-graphql";

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { MainLayout } from "../components/MainLayout";

import type { AppProps } from "next/app";

const theme = extendTheme({});

const reactQueryClient = new ReactQuery.QueryClient();

function SyncAuthorization() {
  const { user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    if (user) {
      getIdTokenClaims().then((data) => {
        headers.authorization = `Bearer ${data.__raw}`;
      });
    }
  }, [user]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        redirectUri={typeof window !== "undefined" ? window.location.origin : undefined}
      >
        <SyncAuthorization />
        <ChakraProvider theme={theme}>
          <ReactQuery.QueryClientProvider client={reactQueryClient}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ReactQuery.QueryClientProvider>
        </ChakraProvider>
      </Auth0Provider>
    </>
  );
}
