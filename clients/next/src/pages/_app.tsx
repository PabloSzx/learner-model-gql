import { ReactQuery } from "react-graphql";

import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { SyncAuth } from "../components/Auth";
import { MainLayout } from "../components/MainLayout";

import type { AppProps } from "next/app";

const theme = extendTheme({});

const reactQueryClient = new ReactQuery.QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        redirectUri={
          typeof window !== "undefined" ? window.location.origin : undefined
        }
      >
        <ReactQuery.QueryClientProvider client={reactQueryClient}>
          <SyncAuth />
          <ChakraProvider theme={theme}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ChakraProvider>
        </ReactQuery.QueryClientProvider>
      </Auth0Provider>
    </>
  );
}
