import type { User as Auth0User } from "@auth0/auth0-react";
import assert from "assert";
import { ENV } from "common-api";
import type { DBUser } from "db";
import type { FastifyRequest } from "fastify";
import FastifyAuth0 from "fastify-auth0-verify";
import fp from "fastify-plugin";
import { LazyPromise } from "graphql-ez/utils";

export { Auth0User };

export const MockAuthUser = {
  user: null as Auth0User | null,
};

export function GetAuth0User(request: FastifyRequest | undefined) {
  const Auth0UserPromise =
    ENV.IS_TEST && MockAuthUser.user
      ? Promise.resolve(MockAuthUser.user)
      : LazyPromise(() => {
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

export const Authorization = (userPromise: Promise<DBUser | null>) => {
  const expectUser = LazyPromise(async () => {
    const user = await userPromise;

    assert(user, "Forbidden!");

    return user;
  });
  const expectAdmin = LazyPromise(async () => {
    const user = await expectUser;

    assert(user.role === "ADMIN", "Forbidden");

    return user;
  });

  const expectUserProjects = LazyPromise(async () => {
    const user = await expectUser;

    return user.projects.map((v) => v.id);
  });

  const expectAllowedUserProject = async (
    projectIdPromise: number | Promise<number>
  ) => {
    const [user, projectId] = await Promise.all([expectUser, projectIdPromise]);

    assert(
      user.projects.find((v) => v.id === projectId),
      "Forbidden Project!"
    );

    return { user, projectId };
  };

  return {
    expectUser,
    expectAdmin,
    expectAllowedUserProject,
    expectUserProjects,
  };
};
