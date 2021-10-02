import { API_URL } from "common";
import { configureRQ } from "graph/rq-gql";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export { QueryClientProvider };

configureRQ({
  endpoint: API_URL,
});
