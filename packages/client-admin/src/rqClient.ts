import { API_URL } from "common";
import { QueryClient } from "react-query";
import { RQGQLClient } from "rq-gql";

export const queryClient = new QueryClient();

export const rqGQLClient = new RQGQLClient({
  endpoint: API_URL,
});
