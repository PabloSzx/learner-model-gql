import dotenv from "dotenv";
import { resolve } from "path";
import { getDirname } from "./dirname";

const envPath = resolve(getDirname(import.meta.url), "../../../.env");
dotenv.config({
  path: envPath,
});
