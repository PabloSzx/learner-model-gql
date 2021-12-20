import { LazyPromise } from "@graphql-ez/utils/promise";
import PrismaClient from "@prisma/client";
import assert from "assert/strict";
import { ENV, logger } from "common-api";
import isEmail from "validator/lib/isEmail.js";

export const prisma = new PrismaClient.PrismaClient({
  log: ENV.IS_DEVELOPMENT
    ? ["info", "query", "error", "warn"]
    : ENV.IS_TEST
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

    logger.warn(`EMAIL "${ADMIN_USER_EMAIL}" HAS BEEN SET AS ADMIN USER`);
  } else {
    await prisma.$queryRawUnsafe("SELECT 1;");
  }
});

export const Prisma = PrismaClient.Prisma;

export * from "@prisma/client";
export type { Prisma as PrismaNS } from "@prisma/client";
