import { PrismaClient } from "@prisma/client";
import { IS_NOT_CI, ENV } from "common";

export const prisma = new PrismaClient({
  log: ENV.IS_DEVELOPMENT ? ["info", "query"] : ENV.IS_TEST && IS_NOT_CI ? ["info"] : undefined,
});
