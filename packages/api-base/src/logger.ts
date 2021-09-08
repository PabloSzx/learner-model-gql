import Pino from "pino";

import { ENV } from "common";

export const logger = Pino({
  level: ENV.IS_DEVELOPMENT ? "info" : "info",
  prettyPrint: {
    levelFirst: true,
    translateTime: true,
  },
});
