import { resolve } from "path";

import dotenv from "dotenv";

const envPath = resolve(__dirname, "../../../.env");
dotenv.config({
  path: envPath,
});
