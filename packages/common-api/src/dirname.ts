import { fileURLToPath } from "url";
import { dirname } from "path";

export const getDirname = (importMetaUrl: string) => {
  return dirname(fileURLToPath(importMetaUrl));
};
