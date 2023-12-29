import { readJson } from "../utils/fileReader.js";
import path from "path";
import rootPath from "../utils/rootPath.js";

type Defaults = {
  author?: string;
  license?: string;
  language?: string;
  projectType?: string;
};

const defaultsFile = path.join(rootPath, ".defaults.json");

export default (readJson(defaultsFile) || {}) as Defaults;
