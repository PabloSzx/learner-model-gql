const { resolve } = require("path");

process.env.NODE_ENV = "test";

const config = {
  "enable-source-maps": true,
  spec: process.argv[2]
    ? []
    : [__dirname === process.cwd() ? "**/*.test.ts" : "test"],
  require: [resolve(__dirname, "./pre-test.mjs")],
  loader: "bob-tsm",
  extension: ["ts"],
};

module.exports = config;
