import { command } from "execa";
import { dirname, resolve } from "path";
import { generate } from "randomstring";
import { fileURLToPath } from "url";

const testDir = resolve(dirname(fileURLToPath(import.meta.url)), "./test");

await command("docker-compose up -d", {
  cwd: testDir,
});

await command("docker-compose logs", {
  cwd: testDir,
});

const DATABASE_URL =
  (process.env.DATABASE_URL = `postgresql://postgres:postgres@localhost:5789/test_${generate(
    {
      length: Math.floor(Math.random() * 25) + 20,
    }
  )}`);

await command("pnpm -r migrate:push", {
  env: {
    DATABASE_URL,
  },
  stdio: "inherit",
});
