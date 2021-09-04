const { resolve } = require("path");

module.exports = {
  "enable-source-maps": true,
  spec: [__dirname === process.cwd() ? "dist/**/*.test.js" : "dist/test"],
  require: [resolve(__dirname, "./pre-test.mjs")],
};
