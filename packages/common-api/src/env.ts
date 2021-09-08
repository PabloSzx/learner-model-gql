import { requireEnv } from "require-env-variable";
import "./dotenv";

export const { DATABASE_URL } = requireEnv("DATABASE_URL");

export const GATEWAY_URL = process.env.GATEWAY_URL || "http://localhost:8080";

console.log({
  DATABASE_URL,
  GATEWAY_URL,
});

export const DATABASE_SCHEMA =
  new URL(DATABASE_URL).searchParams.get("schema") || "public";

export * from "common";
