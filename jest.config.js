const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { readFileSync } = require("fs");
const { parse } = require("json5");
const { resolve } = require("path");

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "ts-jest",
  testMatch: [__dirname.replace(/\\/g, "/") + "/**/test/**/*.test.ts"],
  testEnvironment: "node",
  transform: { "\\.[jt]sx?$": "es-jest" },
  modulePathIgnorePatterns: ["/dist/"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.next"],
  coveragePathIgnorePatterns: ["node_modules", "/.next"],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(
    parse(
      readFileSync(resolve(__dirname, "tsconfig.json"), {
        encoding: "utf-8",
      })
    ).compilerOptions.paths,
    { prefix: "<rootDir>" }
  ),
  collectCoverage: true,
  globalSetup: "./setup-test.js",
  watchman: false,
  testTimeout: 10000,
};

module.exports = config;
