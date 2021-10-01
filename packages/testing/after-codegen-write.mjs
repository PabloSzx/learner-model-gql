import { spawnSync } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const files = await Promise.all(
  process.argv.slice(2).map(async (file) => {
    if (file.endsWith("index.ts")) {
      const content = await readFile(file, {
        encoding: "utf-8",
      });

      await writeFile(
        file,
        content
          .replace("?? {}", "?? source")
          .replace(
            "gql(source: string): unknown",
            "gql(source: string): DocumentNode"
          ),
        {
          encoding: "utf-8",
        }
      );
    }

    return file;
  })
);

spawnSync(
  "node",
  [require.resolve("prettier/bin-prettier.js"), "--write", ...files],
  {
    stdio: "inherit",
  }
);
