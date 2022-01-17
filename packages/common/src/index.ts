export const NODE_ENV = process.env.NODE_ENV || "production";

export const ENV = {
  IS_PRODUCTION: NODE_ENV === "production",
  IS_DEVELOPMENT: NODE_ENV === "development",
  IS_TEST: NODE_ENV === "test",
};

console.log(ENV);

export const IS_CI = !!process.env.CI;
export const IS_NOT_CI = !IS_CI;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://lm.inf.uach.cl/graphql";

export * from "./utils";
export * from "./date";
