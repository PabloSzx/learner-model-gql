import dotenv from "dotenv";
import { resolve } from "path";

const envPath = resolve(__dirname, "../../../.env");
dotenv.config({
  path: envPath,
});
