require("dotenv/config");

const { DATABASE_URL, AUTH0_DOMAIN, AUTH0_CLIENT, AUTH0_SECRET } = process.env;

const env = {
  DATABASE_URL,
  AUTH0_DOMAIN,
  AUTH0_CLIENT,
  AUTH0_SECRET,
};

/**
 * @type {import("pm2/types/index").StartOptions[]}
 */
const apps = [
  {
    name: "Gateway",
    script: "gateway/dist/index.js",
    env,
  },
  {
    name: "Auth",
    script: "services/auth/dist/index.js",
    env,
  },
];

module.exports = {
  apps,
};
