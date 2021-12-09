import { writeFile } from "fs/promises";
import json2csv from "json2csv";
import { prisma } from "../src";

const actions = await prisma.action.findMany();

const now = new Date().toISOString();

const csv = await json2csv.parseAsync(actions);

await writeFile(`./scripts_data/actions_${now}.csv`, csv, "utf-8");
