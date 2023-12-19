import { Options, StringMap } from "../types/types.js";
import latestVersion from "latest-version";
import configReader from "../utils/configReader.js";

type PackageJson = {
  name: string;
  version: string;
  description?: string;
  bin?: string;
  type?: "module" | "commonjs";
  author?: string;
  license?: string;
  scripts?: StringMap;
  dependencies?: StringMap;
  devDependencies?: StringMap;
};

const getDependencyVersion = async (packageName: string): Promise<string> => {
  const version = await latestVersion(packageName);
  return `^${version}`;
};

const getDependencies = async (packageList: string[]): Promise<StringMap> => {
  if (!packageList) {
    return {};
  }

  const dependencies: StringMap = {};
  for (const packageName of packageList) {
    dependencies[packageName] = await getDependencyVersion(packageName);
  }

  return dependencies;
};

export default async (options: Options): Promise<string> => {
  const conf = configReader(options);

  let bin: string | null = null;
  if (options.projectType === "cli") {
    bin = options.language === "typescript" ? "dist/main.js" : "src/main.js";
  }

  const packageJson: PackageJson = {
    name: options.projectName,
    version: "0.0.1",
    ...(options.description && { description: options.description }),
    ...(bin && { bin }),
    ...(options.language === "typescript" && { type: "module" }),
    ...(options.author && { author: options.author }),
    ...(options.license && { license: options.license }),
    ...(conf.scripts && { scripts: conf.scripts }),
  };

  if (conf.dependencies) {
    packageJson.dependencies = await getDependencies(conf.dependencies);
  }

  if (conf.devDependencies) {
    packageJson.devDependencies = await getDependencies(conf.devDependencies);
  }

  return JSON.stringify(packageJson, null, 2);
};
