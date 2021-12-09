import { mkdir, readdir } from "fs/promises";
import inquirer from "inquirer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { pubSub } from "./src";

process.chdir(dirname(fileURLToPath(import.meta.url)));

Promise.allSettled([pubSub.close(), mkdir("scripts_data")]);

const scriptsNames = await readdir("scripts");

const { scriptName } = await inquirer.prompt([
  {
    name: "scriptName",
    message: "What script do you want to run?",
    type: "list",
    choices: scriptsNames,
  },
]);

await import("./scripts/" + scriptName);
