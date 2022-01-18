import { IS_DEVELOPMENT, IS_TEST } from "common";
import Pino from "pino";

export const logger = Pino({
  level: IS_TEST ? "error" : "info",
  transport: IS_DEVELOPMENT
    ? {
        target: "pino-pretty",
        options: {
          levelFirst: true,
          singleLine: true,
          translateTime: true,
        },
      }
    : undefined,
});

export { serializeError } from "serialize-error";
