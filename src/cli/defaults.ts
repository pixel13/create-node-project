import { readJson } from "../utils/fileReader.js";
import path from "path";
import { fileURLToPath } from "url";

type Defaults = {
  author?: string;
  license?: string;
  language?: string;
  projectType?: string;
};

const fileDir = path.dirname(fileURLToPath(import.meta.url));
const defaultsFile = path.join(fileDir, "..", "..", ".defaults.json");

export default (readJson(defaultsFile) || {}) as Defaults;
