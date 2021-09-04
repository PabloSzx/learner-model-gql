import { requireEnv } from "require-env-variable";
import "./dotenv";

export const { DATABASE_URL } = requireEnv("DATABASE_URL");

console.log({
  DATABASE_URL,
});

export * from "common";
