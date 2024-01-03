import * as testUtils from "./../testUtils";
import createPackageJson, { PackageJson } from "../../src/files/packageJson";
import configReader, { Config } from "../../src/utils/configReader";
import { StringMap } from "../../src/types/types";

jest.mock("latest-version", () => async () => "1.2.3");

jest.mock("../../src/utils/configReader", () => jest.fn());
const mockConfigReader = jest.mocked(configReader);

const FULL_CONF: Config = {
  scripts: {
    firstScript: "first script code",
    secondScript: "second script code",
  },
  dependencies: ["dependency1", "dependency2"],
  devDependencies: ["devDependency1", "devDependency2"],
};

describe("packageJson file content creator", () => {
  it("should create a minimal package.json content for a generic JavaScript project with no config", async () => {
    const opts = testUtils.options("javascript", "generic");
    opts.description = "";
    opts.author = "";
    opts.license = "";
    mockConfigReader.mockReturnValueOnce({});

    const content = await createPackageJson(opts);
    const json: PackageJson = JSON.parse(content);

    expect(json.name).toBe(testUtils.PROJECT_NAME);
    expect(json.version).toBe("0.0.1");
    expect(json.description).toBeUndefined;
    expect(json.bin).toBeUndefined;
    expect(json.type).toBeUndefined;
    expect(json.author).toBeUndefined;
    expect(json.license).toBeUndefined;
    expect(json.scripts).toBeUndefined;
    expect(json.dependencies).toBeUndefined;
    expect(json.devDependencies).toBeUndefined;
  });

  it("should create a complete package.json content for a generic JavaScript project with full config", async () => {
    const opts = testUtils.options("javascript", "generic");
    mockConfigReader.mockReturnValueOnce(FULL_CONF);

    const content = await createPackageJson(opts);
    const json: PackageJson = JSON.parse(content);

    expect(json.name).toBe(testUtils.PROJECT_NAME);
    expect(json.version).toBe("0.0.1");
    expect(json.description).toBe(testUtils.PROJECT_DESCRIPTION);
    expect(json.bin).toBeUndefined;
    expect(json.type).toBeUndefined;
    expect(json.author).toBe(testUtils.PROJECT_AUTHOR);
    expect(json.license).toBe(testUtils.PROJECT_LICENSE);

    expect(json.scripts).toStrictEqual(FULL_CONF.scripts);

    expect(Object.keys(json.dependencies as StringMap)).toHaveLength(2);
    expect(json.dependencies?.dependency1).toBe("^1.2.3");
    expect(json.dependencies?.dependency2).toBe("^1.2.3");

    expect(Object.keys(json.devDependencies as StringMap)).toHaveLength(2);
    expect(json.devDependencies?.devDependency1).toBe("^1.2.3");
    expect(json.devDependencies?.devDependency2).toBe("^1.2.3");
  });

  it("should create a complete package.json content for a CLI JavaScript project with full config", async () => {
    const opts = testUtils.options("javascript", "cli");
    mockConfigReader.mockReturnValueOnce(FULL_CONF);

    const content = await createPackageJson(opts);
    const json: PackageJson = JSON.parse(content);

    expect(json.name).toBe(testUtils.PROJECT_NAME);
    expect(json.version).toBe("0.0.1");
    expect(json.description).toBe(testUtils.PROJECT_DESCRIPTION);
    expect(json.bin).toBe("src/main.js");
    expect(json.type).toBeUndefined;
    expect(json.author).toBe(testUtils.PROJECT_AUTHOR);
    expect(json.license).toBe(testUtils.PROJECT_LICENSE);

    expect(json.scripts).toStrictEqual(FULL_CONF.scripts);

    expect(Object.keys(json.dependencies as StringMap)).toHaveLength(2);
    expect(json.dependencies?.dependency1).toBe("^1.2.3");
    expect(json.dependencies?.dependency2).toBe("^1.2.3");

    expect(Object.keys(json.devDependencies as StringMap)).toHaveLength(2);
    expect(json.devDependencies?.devDependency1).toBe("^1.2.3");
    expect(json.devDependencies?.devDependency2).toBe("^1.2.3");
  });

  it("should create a minimal package.json content for a generic TypeScript project with no config", async () => {
    const opts = testUtils.options("typescript", "generic");
    opts.description = "";
    opts.author = "";
    opts.license = "";
    mockConfigReader.mockReturnValueOnce({});

    const content = await createPackageJson(opts);
    const json: PackageJson = JSON.parse(content);

    expect(json.name).toBe(testUtils.PROJECT_NAME);
    expect(json.version).toBe("0.0.1");
    expect(json.description).toBeUndefined;
    expect(json.bin).toBeUndefined;
    expect(json.type).toBe("module");
    expect(json.author).toBeUndefined;
    expect(json.license).toBeUndefined;
    expect(json.scripts).toBeUndefined;
    expect(json.dependencies).toBeUndefined;
    expect(json.devDependencies).toBeUndefined;
  });

  it("should create a complete package.json content for a generic TypeScript project with full config", async () => {
    const opts = testUtils.options("typescript", "generic");
    mockConfigReader.mockReturnValueOnce(FULL_CONF);

    const content = await createPackageJson(opts);
    const json: PackageJson = JSON.parse(content);

    expect(json.name).toBe(testUtils.PROJECT_NAME);
    expect(json.version).toBe("0.0.1");
    expect(json.description).toBe(testUtils.PROJECT_DESCRIPTION);
    expect(json.bin).toBeUndefined;
    expect(json.type).toBe("module");
    expect(json.author).toBe(testUtils.PROJECT_AUTHOR);
    expect(json.license).toBe(testUtils.PROJECT_LICENSE);

    expect(json.scripts).toStrictEqual(FULL_CONF.scripts);

    expect(Object.keys(json.dependencies as StringMap)).toHaveLength(2);
    expect(json.dependencies?.dependency1).toBe("^1.2.3");
    expect(json.dependencies?.dependency2).toBe("^1.2.3");

    expect(Object.keys(json.devDependencies as StringMap)).toHaveLength(2);
    expect(json.devDependencies?.devDependency1).toBe("^1.2.3");
    expect(json.devDependencies?.devDependency2).toBe("^1.2.3");
  });

  it("should create a complete package.json content for a CLI TypeScript project with full config", async () => {
    const opts = testUtils.options("typescript", "cli");
    mockConfigReader.mockReturnValueOnce(FULL_CONF);

    const content = await createPackageJson(opts);
    const json: PackageJson = JSON.parse(content);

    expect(json.name).toBe(testUtils.PROJECT_NAME);
    expect(json.version).toBe("0.0.1");
    expect(json.description).toBe(testUtils.PROJECT_DESCRIPTION);
    expect(json.bin).toBe("dist/main.js");
    expect(json.type).toBe("module");
    expect(json.author).toBe(testUtils.PROJECT_AUTHOR);
    expect(json.license).toBe(testUtils.PROJECT_LICENSE);

    expect(json.scripts).toStrictEqual(FULL_CONF.scripts);

    expect(Object.keys(json.dependencies as StringMap)).toHaveLength(2);
    expect(json.dependencies?.dependency1).toBe("^1.2.3");
    expect(json.dependencies?.dependency2).toBe("^1.2.3");

    expect(Object.keys(json.devDependencies as StringMap)).toHaveLength(2);
    expect(json.devDependencies?.devDependency1).toBe("^1.2.3");
    expect(json.devDependencies?.devDependency2).toBe("^1.2.3");
  });
});
