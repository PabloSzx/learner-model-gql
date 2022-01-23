import { requireEnv } from "require-env-variable";
import "./dotenv";

export const { DATABASE_URL } = requireEnv("DATABASE_URL");

export const GATEWAY_URL = process.env.GATEWAY_URL || "http://localhost:8080";

!process.env.SILENT &&
  console.log({
    DATABASE_URL,
    GATEWAY_URL,
  });

export const URL_DATABASE = new URL(DATABASE_URL);

export const DATABASE_SCHEMA =
  URL_DATABASE.searchParams.get("schema") || "public";

export const DATABASE_DB_NAME = new URL(DATABASE_URL).pathname.slice(1);
export * from "common";
