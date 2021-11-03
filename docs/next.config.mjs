import withNextra from "nextra";

/**
 * @type {import("next").NextConfig}
 */
const config = {
  swcMinify: true,
};

export default withNextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_staticImage: true,
})(config);
