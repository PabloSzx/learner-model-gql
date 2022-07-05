import { execSync } from "child_process";

if (process.env.CI) process.exit(0);

execSync("pnpm husky install", {
  stdio: "inherit",
});

execSync("pnpm -r db:generate", {
  stdio: "inherit",
});

try {
  execSync("pnpm -r db:link-env", {});
} catch {}
