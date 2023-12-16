#!/usr/bin/env node

import banner from "./cli/banner.js";
import reader from "./cli/reader.js";
import createProject from "./commands/createProject.js";

console.log(banner("create-node-project", "@ 2023 pixel13"));
const answers = await reader();
await createProject(answers);
