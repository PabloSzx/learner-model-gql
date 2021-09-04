import { command } from "execa";
import { generate } from "randomstring";

await command("docker-compose up -d");

await command("docker-compose logs");

const DATABASE_URL =
  (process.env.DATABASE_URL = `postgresql://postgres:postgres@localhost:5789/${generate(
    {
      length: 50,
    }
  )}`);

await command("pnpm -r migrate:push", {
  env: {
    DATABASE_URL,
  },
  stdio: "inherit",
});
