import { ENV } from "common-api";

import PrismaClient from "@prisma/client";

export const prisma = new PrismaClient.PrismaClient({
  log: ENV.IS_DEVELOPMENT
    ? ["info", "query", "error", "warn"]
    : ENV.IS_TEST
    ? ["error", "warn"]
    : ["info", "error", "warn"],
});

export * from "@prisma/client";
