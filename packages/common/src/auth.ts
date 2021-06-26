import { LazyPromise } from "@graphql-ez/core-utils";

import type { FastifyRequest } from "fastify";

import type { User as Auth0User } from "@auth0/auth0-react";

export { Auth0User };

export function GetAuth0User(request: FastifyRequest | undefined) {
  const Auth0UserPromise = LazyPromise(() => {
    if (!request?.headers.authorization) return null;

    return request.jwtVerify<Auth0User>().catch((err) => {
      console.error(err);
      return null;
    });
  });

  return {
    Auth0UserPromise,
  };
}
