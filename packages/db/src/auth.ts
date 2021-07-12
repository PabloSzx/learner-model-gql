import { LazyPromise, PromiseType } from "@graphql-ez/fastify";

import { prisma } from "./db";

import type { Auth0User } from "api-base";

export type DBUser = PromiseType<ReturnType<typeof GetDBUser>["UserPromise"]>;

export function GetDBUser(auth0UserPromise: Promise<Auth0User | null>) {
  const UserPromise = LazyPromise(async () => {
    const user = await auth0UserPromise;

    if (!user) return null;

    const { sub: uid, email, name, picture } = user;

    if (!uid || !email) return null;

    return prisma.userUID
      .upsert({
        where: {
          uid,
        },
        create: {
          uid,
          user: {
            connectOrCreate: {
              where: {
                email,
              },
              create: {
                email,
                name,
                picture,
              },
            },
          },
        },
        update: {
          uid,
          user: {
            connectOrCreate: {
              where: {
                email,
              },
              create: {
                email,
                name,
                picture,
              },
            },
          },
        },
        select: {
          user: {
            include: {
              projects: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      })
      .then((data) => data.user);
  });

  return {
    UserPromise,
  };
}

export type {} from "@prisma/client";
