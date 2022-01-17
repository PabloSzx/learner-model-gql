import type { BuildContextArgs, InferContext } from "@graphql-ez/fastify";
import { prisma, pubSub } from "db";
import { Authorization, GetAuth0User, GetDBUser } from "./auth";
import { ResolveCursorConnection } from "./connection";
import {
  assertNotNumericCode,
  getIdsIntersection,
  getNodeIdList,
} from "./utils";

export async function buildContext({ fastify }: BuildContextArgs) {
  const Auth0UserPromise = GetAuth0User(fastify?.request);

  const UserPromise = GetDBUser(Auth0UserPromise);

  const authorization = Authorization(UserPromise);

  return {
    UserPromise,
    Auth0UserPromise,
    prisma,
    authorization,
    pubSub,
    ResolveCursorConnection,
    getNodeIdList,
    getIdsIntersection,
    assertNotNumericCode,
  };
}

declare module "graphql-ez" {
  interface EZContext extends InferContext<typeof buildContext> {}
}
