import { useToast } from "@chakra-ui/react";
import { API_URL } from "common";
import { memo, useEffect } from "react";
import { QueryClient } from "react-query";
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
});

const errorState = proxy({
  message: null as string | null,
});

export const ErrorToast = memo(() => {
  const { message } = useSnapshot(errorState);

  const toast = useToast();

  useEffect(() => {
    if (!message) return;

    errorState.message = null;

    toast({
      title: message,
      status: "error",
    });
  }, [message]);

  return null;
});
