import type { User as Auth0User } from "@auth0/auth0-react";
import type { PromiseType } from "@graphql-ez/fastify";
import assert from "assert";
import { IS_TEST, logger } from "common-api";
import { GroupFlags, prisma } from "db";
import type { FastifyRequest } from "fastify";
import FastifyAuth0 from "fastify-auth0-verify";
import fp from "fastify-plugin";
import { LazyPromise } from "graphql-ez/utils";

export type { Auth0User };

export const MockAuthUser: {
  user: Auth0User | null;
} = IS_TEST
  ? {
      user: null,
    }
  : Object.freeze({
      user: null,
    });

const GetAuth0UserFromAuthorizationHeader = (
  request: FastifyRequest | undefined
) =>
  LazyPromise(() => {
    if (!request?.headers.authorization) return null;

    return request.jwtVerify<Auth0User>().catch((err) => {
      logger.error(err);
      return null;
    });
  });
export const GetAuth0User: (
  request: FastifyRequest | undefined
) => Promise<Auth0User | null> = IS_TEST
  ? (request) => {
      if (MockAuthUser.user) return Promise.resolve(MockAuthUser.user);

      const { "auth-email": email, "auth-uid": sub } = request?.headers || {};

      if (typeof email === "string" && typeof sub === "string") {
        return Promise.resolve({
          sub,
          email,
        });
      }

      return GetAuth0UserFromAuthorizationHeader(request);
    }
  : GetAuth0UserFromAuthorizationHeader;

export const Auth0Verify = fp(async (app) => {
  const { AUTH0_DOMAIN, AUTH0_CLIENT, AUTH0_SECRET } = process.env;

  if (AUTH0_DOMAIN && AUTH0_CLIENT && AUTH0_SECRET) {
    await app.register(FastifyAuth0, {
      domain: AUTH0_DOMAIN,
      audience: AUTH0_CLIENT,
      secret: AUTH0_SECRET,
      secretsTtl: 1000 * 60,
    });
  } else if (!IS_TEST) {
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

  const expectUserProjectsSet = LazyPromise(async () => {
    const user = await expectUser;

    const projectIds = new Set<number>();

    for (const { id } of user.projects) {
      projectIds.add(id);
    }
    for (const { projects } of user.groups) {
      for (const { id } of projects) {
        projectIds.add(id);
      }
    }

    return projectIds;
  });

  const expectUserProjects = LazyPromise(async () => {
    return Array.from(await expectUserProjectsSet);
  });

  const projectIdCheckCache: Record<number, Promise<number>> = {};
  const checkProjectIdExists = async (
    projectIdPromise: number | Promise<number>
  ) => {
    const projectIdKey = await projectIdPromise;
    return (projectIdCheckCache[projectIdKey] ||= LazyPromise(() =>
      prisma.project
        .findUniqueOrThrow({
          where: {
            id: projectIdKey,
          },
          select: {
            id: true,
          },
        })
        .then((v) => v.id)
    ));
  };

  const expectAllowedUserProject = async (
    projectIdPromise: number | Promise<number>,
    { checkExists = true }: { checkExists?: boolean } = {}
  ) => {
    const [user, usersProjectsSet, projectId] = await Promise.all([
      expectUser,
      expectUserProjectsSet,
      checkExists ? checkProjectIdExists(projectIdPromise) : projectIdPromise,
    ]);

    if (user.role !== "ADMIN")
      assert(usersProjectsSet.has(projectId), "Forbidden Project!");

    return { user, projectId };
  };

  const expectSomeProjectsInPrismaFilter = LazyPromise(async () => {
    const [{ role }, projectsIds] = await Promise.all([
      expectUser,
      expectUserProjects,
    ]);

    if (role === "ADMIN") return undefined;

    return {
      some: {
        id: {
          in: projectsIds,
        },
      },
    } as const;
  });

  const expectProjectsIdInPrismaFilter = LazyPromise(async () => {
    const [{ role }, projectsIds] = await Promise.all([
      expectUser,
      expectUserProjects,
    ]);

    if (role === "ADMIN") return undefined;

    return {
      id: {
        in: projectsIds,
      },
    } as const;
  });

  const expectProjectsInPrismaFilter = LazyPromise(async () => {
    const [{ role }, projectsIds] = await Promise.all([
      expectUser,
      expectUserProjects,
    ]);

    if (role === "ADMIN") return undefined;

    return {
      in: projectsIds,
    } as const;
  });

  const expectAllowedReadProjectActions = async (
    projectIdPromise: number | Promise<number>
  ) => {
    const [user, projectId] = await Promise.all([
      expectUser,
      checkProjectIdExists(projectIdPromise),
    ]);

    if (user.role === "ADMIN") return;

    if (
      user.groups.some(({ flags, projects }) => {
        return (
          flags?.readProjectActions &&
          projects.some(({ id }) => id === projectId)
        );
      })
    ) {
      return;
    }

    throw Error("Forbidden!");
  };

  const expectGroupProjectsFlags = LazyPromise(async () => {
    return (await expectUser).groups.reduce<
      Record<
        number,
        Pick<GroupFlags, "readProjectActions" | "readProjectModelStates">
      >
    >((acc, { flags, projects }) => {
      const { readProjectActions = false, readProjectModelStates = false } =
        flags || {};

      for (const project of projects) {
        const projectFlags = (acc[project.id] ||= {
          readProjectActions: false,
          readProjectModelStates: false,
        });

        projectFlags.readProjectActions ||= readProjectActions;
        projectFlags.readProjectModelStates ||= readProjectModelStates;
      }

      return acc;
    }, {});
  });

  const expectAllowedProjectsIdsModelStates = LazyPromise(async () => {
    const user = await expectUser;

    if (user.role === "ADMIN") return undefined;

    const allowedProjectsIdsSet = Object.entries(
      await expectGroupProjectsFlags
    ).reduce((acc, [projectIdString, { readProjectModelStates }]) => {
      if (readProjectModelStates) acc.add(parseInt(projectIdString));

      return acc;
    }, new Set<number>());

    return Array.from(allowedProjectsIdsSet);
  });

  return {
    expectUser,
    expectAdmin,
    expectAllowedUserProject,
    expectUserProjects,
    expectUserProjectsSet,
    expectSomeProjectsInPrismaFilter,
    expectProjectsIdInPrismaFilter,
    expectProjectsInPrismaFilter,
    expectAllowedReadProjectActions,
    checkProjectIdExists,
    expectGroupProjectsFlags,
    expectAllowedProjectsIdsModelStates,
  };
};

export type DBUser = PromiseType<ReturnType<typeof GetDBUser>>;

export function GetDBUser(auth0UserPromise: Promise<Auth0User | null>) {
  return LazyPromise(async () => {
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
}
