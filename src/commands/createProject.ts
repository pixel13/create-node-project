import { Options } from "../types/types.js";
import createPackageJson from "../files/packageJson.js";
import createEslintConf from "../files/eslintConf.js";
import createTsConfig from "../files/tsConfig.js";
import createReadme from "../files/readme.js";
import createGitIgnore from "../files/gitignore.js";
import createJestConfig from "../files/jestConfig.js";
import { createDir, createFile, copyFolderContent } from "../utils/fileWriter.js";
import path from "path";
import { fileURLToPath } from "url";

const getSampleBasePath = (): string => {
  const fileDir = path.dirname(fileURLToPath(import.meta.url));
  return path.join(fileDir, "..", "..", "samples");
};

const copySampleFiles = (sampleDir: string, projectDir: string, subDir: string, fileExt: string): void => {
  const source = path.join(sampleDir, subDir);
  const dest = path.join(projectDir, subDir);
  copyFolderContent(source, dest, fileExt);
};

const createSampleFiles = (projectDir: string, options: Options): void => {
  const ext = options.language === "typescript" ? "ts" : "js";
  const sampleSourcePath = path.join(getSampleBasePath(), options.projectType);
  copySampleFiles(sampleSourcePath, projectDir, "src", ext);
  copySampleFiles(sampleSourcePath, projectDir, "tests", ext);
};

export default async (options: Options) => {
  const projectDir = path.join(process.cwd(), options.projectName);

  createDir(projectDir);
  createDir(path.join(projectDir, "src"));
  createDir(path.join(projectDir, "tests"));

  createFile(path.join(projectDir, "README.md"), createReadme(options));
  createFile(path.join(projectDir, ".gitignore"), createGitIgnore(options));
  createFile(path.join(projectDir, "package.json"), await createPackageJson(options));
  createFile(path.join(projectDir, ".eslintrc.json"), createEslintConf(options));

  if (options.language === "typescript") {
    createFile(path.join(projectDir, "tsconfig.json"), createTsConfig(options));
    createFile(path.join(projectDir, "jest.config.js"), createJestConfig());
  }

  createSampleFiles(projectDir, options);
};
