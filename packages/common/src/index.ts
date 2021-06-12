import FastifyAuth0 from "fastify-auth0-verify";
import fp from "fastify-plugin";

export const NODE_ENV = process.env.NODE_ENV;

export const ENV = {
  IS_PRODUCTION: NODE_ENV === "production",
  IS_DEVELOPMENT: NODE_ENV === "development",
  IS_TEST: NODE_ENV === "test",
};

export const IS_CI = !!process.env.CI;
export const IS_NOT_CI = !IS_CI;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://learner-model.pablosz.tech/graphql";

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

export type {} from "fastify-auth0-verify";

export * from "./auth";
