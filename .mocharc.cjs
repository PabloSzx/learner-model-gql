const { resolve } = require("path");

module.exports = {
  "enable-source-maps": true,
  spec: process.argv[2]
    ? []
    : [__dirname === process.cwd() ? "dist/**/*.test.js" : "dist/test"],
  require: [resolve(__dirname, "./pre-test.mjs")],
};
