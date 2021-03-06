import { useToast } from "@chakra-ui/react";
import { API_URL } from "common";
import { memo, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "react-query";
import { RQGQLClient } from "rq-gql";
import { serializeError } from "serialize-error";
import { proxy, useSnapshot } from "valtio";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(err) {
        if (err instanceof Error) {
          errorState.message = err.message;
        } else {
          errorState.message = JSON.stringify(serializeError(err));
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries();
      },
    },
    queries: {
      onError(err) {
        if (err instanceof Error) {
          errorState.message = err.message;
        } else {
          errorState.message = JSON.stringify(serializeError(err));
        }
      },
    },
  },
});

export const rqGQLClient = new RQGQLClient({
  endpoint: API_URL,
  QueryClientProvider,
  useQuery,
  useMutation,
  useInfiniteQuery,
  proxy,
});

const errorState = proxy({
  message: null as string | null,
});

export const ErrorToast = memo(() => {
  const { message } = useSnapshot(errorState);

  const toast = useToast();

  useEffect(() => {
    if (!message) return;

    toast({
      title: message,
      status: "error",
    });

    errorState.message = null;
  }, [message]);

  return null;
});
