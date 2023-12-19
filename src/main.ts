#!/usr/bin/env node

import chalk from "chalk";
import banner from "./cli/banner.js";
import reader from "./cli/reader.js";
import createProject from "./commands/createProject.js";

console.log(chalk.cyan(banner("create-node-project", "@ 2023 pixel13")));
const answers = await reader();

console.log(chalk.yellow("\r\nPlease wait just some seconds...\r\n"));

try {
  await createProject(answers);
} catch (e) {
  console.error(chalk.red((e as Error).message));
  process.exit(1);
}

console.log(
  chalk.cyan(`
Your project is ready! To start, please launch the following commands:

cd ${answers.projectName}
npm install

Happy coding!`)
);
