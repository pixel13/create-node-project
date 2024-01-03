import { Options } from "./../../src/types/types";
import { options } from "../testUtils";
import { createDir, createFile, copyFolderContent } from "../../src/utils/fileWriter";
import createProject from "../../src/commands/createProject";
import path from "path";

jest.mock("../../src/utils/rootPath", () => "root-folder");

jest.mock("../../src/utils/fileWriter");
const mockFileWriter = jest.mocked({ createDir, createFile, copyFolderContent });

jest.mock("../../src/files/packageJson", () => async () => "package.json content");
jest.mock("../../src/files/eslintConf", () => () => "eslintrc content");
jest.mock("../../src/files/tsConfig", () => () => "tsconfig content");
jest.mock("../../src/files/readme", () => () => "readme content");
jest.mock("../../src/files/gitignore", () => () => "gitignore content");
jest.mock("../../src/files/jestConfig", () => () => "jestconfig content");

describe("createProject command", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create the structure for a generic JavaScript project", async () => {
    const opts = options("javascript", "generic");
    await createProject(opts);
    expectCorrectProjectStructure(opts);
  });

  it("should create the structure for a CLI JavaScript project", async () => {
    const opts = options("javascript", "cli");
    await createProject(opts);
    expectCorrectProjectStructure(opts);
  });

  it("should create the structure for a generic TypeScript project", async () => {
    const opts = options("typescript", "generic");
    await createProject(opts);
    expectCorrectProjectStructure(opts);
  });

  it("should create the structure for a CLI TypeScript project", async () => {
    const opts = options("typescript", "generic");
    await createProject(opts);
    expectCorrectProjectStructure(opts);
  });
});

function expectCorrectProjectStructure(options: Options) {
  expect(mockFileWriter.createDir).toHaveBeenCalledTimes(3);
  expect(mockFileWriter.createDir).toHaveBeenCalledWith(pathEndingWith(options.projectName));
  expect(mockFileWriter.createDir).toHaveBeenCalledWith(pathEndingWith(options.projectName, "src"));
  expect(mockFileWriter.createDir).toHaveBeenCalledWith(pathEndingWith(options.projectName, "tests"));

  expect(mockFileWriter.createFile).toHaveBeenCalledTimes(options.language === "javascript" ? 4 : 6);
  expect(mockFileWriter.createFile).toHaveBeenCalledWith(
    pathEndingWith(options.projectName, "README.md"),
    "readme content"
  );
  expect(mockFileWriter.createFile).toHaveBeenCalledWith(
    pathEndingWith(options.projectName, ".gitignore"),
    "gitignore content"
  );
  expect(mockFileWriter.createFile).toHaveBeenCalledWith(
    pathEndingWith(options.projectName, "package.json"),
    "package.json content"
  );
  expect(mockFileWriter.createFile).toHaveBeenCalledWith(
    pathEndingWith(options.projectName, ".eslintrc.json"),
    "eslintrc content"
  );

  if (options.language === "typescript") {
    expect(mockFileWriter.createFile).toHaveBeenCalledWith(
      pathEndingWith(options.projectName, "tsconfig.json"),
      "tsconfig content"
    );
    expect(mockFileWriter.createFile).toHaveBeenCalledWith(
      pathEndingWith(options.projectName, "jest.config.cjs"),
      "jestconfig content"
    );
  }

  expect(mockFileWriter.copyFolderContent).toHaveBeenCalledTimes(2);
  expect(mockFileWriter.copyFolderContent).toHaveBeenCalledWith(
    pathEndingWith("root-folder", "samples", options.projectType, options.language, "src"),
    pathEndingWith(options.projectName, "src"),
    undefined
  );
  expect(mockFileWriter.copyFolderContent).toHaveBeenCalledWith(
    pathEndingWith("root-folder", "samples", options.projectType, options.language, "tests"),
    pathEndingWith(options.projectName, "tests"),
    undefined
  );
}

function pathEndingWith(...args: string[]) {
  const expectedPathEnd = path.join(...args).replace(/\\/g, "\\\\");
  return expect.stringMatching(new RegExp(`${expectedPathEnd}$`));
}
