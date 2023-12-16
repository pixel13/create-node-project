import inquirer from "inquirer";
import defaults from "./defaults.js";
import { Options } from "../types/types.js";

export default async () => {
  return (await inquirer.prompt([
    {
      name: "projectName",
      message: "Project name:",
      prefix: "",
      validate(input) {
        if (input.match(/^[a-z0-9]+/i)) {
          return true;
        }

        return "Please enter a valid project name (must start with a letter or a digit)";
      },
    },
    {
      name: "description",
      message: "Project description (optional):",
      prefix: "",
    },
    {
      name: "author",
      message: "Project author (optional):",
      prefix: "",
      default: defaults.author,
    },
    {
      name: "license",
      message: "Project license (optional):",
      prefix: "",
      default: defaults.license,
    },
    {
      name: "language",
      message: "Which language do you want to use?",
      prefix: "",
      type: "list",
      choices: [
        { name: "JavaScript", value: "javascript" },
        { name: "TypeScript", value: "typescript" },
      ],
      default: defaults.language || "typescript",
    },
    {
      name: "projectType",
      message: "Project type:",
      prefix: "",
      type: "list",
      choices: [
        { name: "CLI", value: "cli" },
        { name: "Generic project", value: "generic" },
      ],
      default: defaults.projectType || "generic",
    },
  ])) as Options;
};
