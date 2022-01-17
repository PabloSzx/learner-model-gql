import Pino from "pino";

import { ENV } from "common";

export const logger = Pino({
  level: ENV.IS_TEST ? "error" : "info",
  transport: ENV.IS_DEVELOPMENT
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
