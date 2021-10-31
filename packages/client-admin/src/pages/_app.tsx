import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, extendTheme, Spinner } from "@chakra-ui/react";
import { CombinedRQGQLProvider } from "graph";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useIsFetching } from "react-query";
import { SyncAuth } from "../components/Auth";
import { MainLayout } from "../components/MainLayout";
import { NextNProgress } from "../components/NextNProgress";
import { ErrorToast, queryClient, rqGQLClient } from "../rqClient";

const theme = extendTheme({});

const GlobalLoadingSpinner = () => {
  const isFetching = useIsFetching();

  return isFetching ? (
    <Spinner
      zIndex={9999}
      pos="fixed"
      size="lg"
      top={0}
      right={0}
      margin="0.5em"
      color="blue.200"
      thickness="10px"
    />
  ) : null;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ADMIN - Learner Model GQL</title>
      </Head>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        redirectUri={
          typeof window !== "undefined" ? window.location.origin : undefined
        }
      >
        <CombinedRQGQLProvider client={queryClient} rqGQLClient={rqGQLClient}>
          <SyncAuth />
          <ChakraProvider theme={theme}>
            <GlobalLoadingSpinner />
            <ErrorToast />
            <NextNProgress color="#10b9cf" />
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ChakraProvider>
        </CombinedRQGQLProvider>
      </Auth0Provider>
    </>
  );
}
