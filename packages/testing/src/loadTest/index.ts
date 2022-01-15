import { kill } from "cross-port-killer";
import { execaCommand } from "execa";
import { baseServicesList } from "../../../services/list";
import { prisma } from "./seed";

await prisma.$disconnect();

async function killServices() {
  await Promise.all([
    Object.values(baseServicesList).map((port) => kill(port)),
  ]);
}

await killServices();

await execaCommand("pnpm -r start --filter=service-*", {
  stdio: "inherit",
  env: {
    ...process.env,
    ADMIN_USER_EMAIL: "pablosaez1995@gmail.com",
  },
});
