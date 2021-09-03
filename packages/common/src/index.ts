export const NODE_ENV = process.env.NODE_ENV;

export const ENV = {
  IS_PRODUCTION: NODE_ENV === "production",
  IS_DEVELOPMENT: NODE_ENV === "development",
  IS_TEST: NODE_ENV === "test",
};

export const IS_CI = !!process.env.CI;
export const IS_NOT_CI = !IS_CI;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://learner-model.pablosz.tech/graphql";