import { LazyPromise } from "@graphql-ez/utils/promise";
import assert from "assert/strict";
import { IS_DEVELOPMENT, IS_TEST, logger } from "common-api";
import isEmail from "validator/lib/isEmail.js";
import * as Prisma from "./generated/client/index.js";

export const prisma = new Prisma.PrismaClient({
  log: IS_DEVELOPMENT
    ? ["info", "query", "error", "warn"]
    : IS_TEST
    ? ["error", "warn"]
    : ["info", "error", "warn"],
});

const ADMIN_USER_EMAIL = process.env.ADMIN_USER_EMAIL;

if (ADMIN_USER_EMAIL) {
  assert(
    isEmail(ADMIN_USER_EMAIL),
    `Invalid Email set as ADMIN_USER_EMAIL: "${ADMIN_USER_EMAIL}"`
  );
}

export const DB_PREPARED = LazyPromise(async () => {
  if (ADMIN_USER_EMAIL) {
    try {
      await prisma.user.upsert({
        create: {
          email: ADMIN_USER_EMAIL,
          role: "ADMIN",
        },
        update: {
          role: "ADMIN",
        },
        where: {
          email: ADMIN_USER_EMAIL,
        },
        select: null,
      });
    } catch (err: any) {
      if (err.code === "P2002") return;

      throw err;
    }

    logger.warn(`EMAIL "${ADMIN_USER_EMAIL}" HAS BEEN SET AS ADMIN USER`);
  } else {
    await prisma.$queryRawUnsafe("SELECT 1;");
  }
});

export * from "./generated/client/index.js";
export type { Prisma as PrismaNS } from "./generated/client/index.js";
