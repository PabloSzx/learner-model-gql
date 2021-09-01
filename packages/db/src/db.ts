import { ENV } from "common-api";

import PrismaClient from "@prisma/client";

export const prisma = new PrismaClient.PrismaClient({
  log: ENV.IS_DEVELOPMENT ? ["info", "query"] : ["info"],
});

export * from "@prisma/client";
