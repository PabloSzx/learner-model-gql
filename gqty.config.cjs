/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: "string" },
  introspection: { endpoint: "./schema.gql", headers: {} },
  destination: "./packages/client-admin/src/gqty/index.ts",
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
