import { kill } from "cross-port-killer";
import { execaCommand } from "execa";
import { baseServicesList } from "../../../services/list";
import { prisma } from "./seed";

await prisma.$disconnect();

async function killServices() {
  await Promise.allSettled(
    [...Object.values(baseServicesList), 8080, 4010].map(kill)
  );
}

await killServices();

process.on("SIGINT", killServices);

await Promise.all([
  execaCommand("pnpm -r start --filter=service-*", {
    stdio: "inherit",
    env: {
      ...process.env,
      ADMIN_USER_EMAIL: "pablosaez1995@gmail.com",
    },
  }),
  execaCommand("pnpm -r dev:localhost", {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "development",
    },
  }),
]);
