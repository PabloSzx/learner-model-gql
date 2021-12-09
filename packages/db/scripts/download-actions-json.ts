import { writeFile } from "fs/promises";
import { prisma } from "../src";

const actions = await prisma.action.findMany();

const now = new Date().toISOString();

await writeFile(
  `./scripts_data/actions_${now}.json`,
  JSON.stringify(actions, null, 2),
  "utf-8"
);
