import { mkdir, readdir } from "fs/promises";
import inquirer from "inquirer";
import open from "open";

process.chdir(__dirname);

Promise.allSettled([mkdir("scripts_data")]);

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

await open("scripts_data");
