import { LazyPromise } from "@graphql-ez/utils/promise";
import PrismaClient from "@prisma/client";
import { ENV } from "common-api";

export const prisma = new PrismaClient.PrismaClient({
  log: ENV.IS_DEVELOPMENT
    ? ["info", "query", "error", "warn"]
    : ENV.IS_TEST
    ? ["error", "warn"]
    : ["info", "error", "warn"],
});

export const DB_PREPARED = LazyPromise(async () => {
  await prisma.user.upsert({
    create: {
      email: "pablosaez1995@gmail.com",
      role: "ADMIN",
    },
    update: {
      role: "ADMIN",
    },
    where: {
      email: "pablosaez1995@gmail.com",
    },
    select: null,
  });
});

export const Prisma = PrismaClient.Prisma;

export type { Prisma as PrismaNS } from "@prisma/client";

export * from "@prisma/client";
