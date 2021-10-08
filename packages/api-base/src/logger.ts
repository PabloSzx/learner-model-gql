import Pino from "pino";

import { ENV } from "common";

export const logger = Pino({
  level: ENV.IS_DEVELOPMENT ? "info" : "info",
  prettyPrint: {
    levelFirst: true,
    singleLine: true,
    translateTime: true,
  },
});
