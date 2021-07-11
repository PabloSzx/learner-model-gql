import FastifyAuth0 from "fastify-auth0-verify";
import fp from "fastify-plugin";
import { LazyPromise } from "graphql-ez/utils/promise";

import type { FastifyRequest } from "fastify";
import type { EZPlugin } from "graphql-ez";
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

export const Auth0Verify = fp(async (app) => {
  const { AUTH0_DOMAIN, AUTH0_CLIENT, AUTH0_SECRET } = process.env;

  if (AUTH0_DOMAIN && AUTH0_CLIENT && AUTH0_SECRET) {
    await app.register(FastifyAuth0, {
      domain: AUTH0_DOMAIN,
      audience: AUTH0_CLIENT,
      secret: AUTH0_SECRET,
      secretsTtl: 1000 * 60,
    });
  } else {
    console.warn(
      "NO AUTH0_DOMAIN, AUTH0_CLIENT, AUTH0_SECRET PROVIDED, NO AUTH0 VERIFICATION ENABLED"
    );
  }
});

export const AuthPlugin: EZPlugin = {
  name: "Auth",
  compatibilityList: ["fastify"],
  onIntegrationRegister(_ctx, integrationCtx) {
    integrationCtx.fastify!.register(Auth0Verify);
  },
};
