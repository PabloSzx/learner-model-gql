import { ENV } from "common";
import dotenv from "dotenv";
import { resolve } from "path";

import { PrismaClient } from "@prisma/client";

dotenv.config({
  path: resolve(__dirname, "../.env"),
});

export const prisma = new PrismaClient({
  log: ENV.IS_DEVELOPMENT ? ["info", "query"] : ["info"],
});

export * from "@prisma/client";
