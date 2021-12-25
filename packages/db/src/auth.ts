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

    const lastOnline = new Date();
    const userDb = await prisma.userUID
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
                lastOnline,
                active: true,
              },
            },
          },
        },
        update: {
          user: {
            connectOrCreate: {
              where: {
                email,
              },
              create: {
                email,
                name,
                picture,
                lastOnline,
              },
            },
            update: {
              lastOnline,
              active: true,
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
              groups: {
                select: {
                  projects: {
                    select: {
                      id: true,
                    },
                  },
                  flags: {
                    select: {
                      readProjectActions: true,
                      readProjectModelStates: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .then((data) => (data.user?.locked ? null : data.user));

    if (userDb && ((!userDb.name && name) || (!userDb.picture && picture))) {
      const updatedUser = await prisma.user.update({
        where: {
          id: userDb.id,
        },
        data: {
          name: userDb.name ? undefined : name || undefined,
          picture: userDb.picture ? undefined : picture || undefined,
        },
        select: {
          name: true,
          picture: true,
        },
      });

      Object.assign(userDb, updatedUser);
    }

    return userDb;
  });

  return {
    UserPromise,
  };
}

export type {} from "@prisma/client";
