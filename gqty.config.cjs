const { resolve } = require("path");

/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: "string", EmailAddress: "string" },
  introspection: { endpoint: resolve(__dirname, "./schema.gql"), headers: {} },
  destination: resolve(__dirname, "./packages/graph/src/gqty/index.ts"),
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
