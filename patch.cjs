const { writeFileSync, readFileSync } = require("fs");

const mochaEsmUtilsPath = require.resolve("mocha/lib/nodejs/esm-utils.js");
writeFileSync(
  mochaEsmUtilsPath,
  readFileSync(mochaEsmUtilsPath, "utf-8").replace(
    "path.extname(file) === '.mjs'",
    "true"
  ),
  "utf-8"
);
