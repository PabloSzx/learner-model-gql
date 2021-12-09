import { writeFile } from "fs/promises";
import { prisma } from "../src";

const actions = await prisma.action.findMany({
  include: {
    user: {
      select: {
        email: true,
        name: true,
      },
    },
    project: {
      select: {
        code: true,
        label: true,
      },
    },
  },
});

const now = new Date().toISOString();

await writeFile(
  `./scripts_data/actions_${now}.json`,
  JSON.stringify(actions, null, 2),
  "utf-8"
);
