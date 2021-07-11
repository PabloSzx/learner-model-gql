import { PrismaClient } from "@prisma/client";
import { ENV } from "common";

export const prisma = new PrismaClient({
  log: ENV.IS_DEVELOPMENT ? ["info", "query"] : ["info"],
});

export * from "@prisma/client";
