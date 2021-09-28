import { API_URL } from "common";
import type { ExecutionResult } from "graphql";
import { headers } from "../headers";

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    });

    const json: ExecutionResult<TData> = await res.json();

    if (json.errors?.length) {
      if (json.errors.length > 1) {
        const err = Error("Multiple Errors");

        Object.assign(err, {
          graphqlErrors: json.errors,
        });

        throw err;
      }

      const { message } = json.errors[0]!;

      throw new Error(message);
    }

    return json.data!;
  };
}
