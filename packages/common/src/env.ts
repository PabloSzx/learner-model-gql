const NODE_ENV = process.env.NODE_ENV || "production";

switch (NODE_ENV) {
  case "development":
  case "production":
  case "test":
    break;
  default:
    throw Error("Unexpected Environment variable NODE_ENV: " + NODE_ENV);
}

export const IS_PRODUCTION = NODE_ENV === "production";
export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_TEST = NODE_ENV === "test";

!process.env.SILENT &&
  console.log({
    IS_PRODUCTION,
    IS_DEVELOPMENT,
    IS_TEST,
  });

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://lm.inf.uach.cl/graphql";
