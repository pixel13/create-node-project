import { options } from "./../testUtils";
import createEslintConfig, { EslintConf } from "../../src/files/eslintConf";
import { StringOrNumberMap } from "../../src/types/types";
import configReader from "../../src/utils/configReader";

jest.mock("../../src/utils/configReader", () => jest.fn());
const mockConfigReader = jest.mocked(configReader);

describe("eslintConf file content creator", () => {
  it("should create a configuration for a JavaScript project with no specific conf", () => {
    mockConfigReader.mockReturnValueOnce({});

    const content = createEslintConfig(options("javascript"));
    const json: EslintConf = JSON.parse(content);

    expect(Object.keys(json.env)).toHaveLength(2);
    expect(json.env.node).toBeTruthy;
    expect(json.env.jest).toBeTruthy;

    expect(json.extends).toHaveLength(1);
    expect(json.extends?.[0]).toBe("eslint:recommended");

    expect(Object.keys(json.parserOptions as StringOrNumberMap)).toHaveLength(2);
    expect(json.parserOptions?.ecmaVersion).toBe("latest");
    expect(json.parserOptions?.sourceType).toBe("module");

    expect(json.parser).toBeUndefined;
    expect(json.plugins).toBeUndefined;
  });

  it("should create a configuration for a JavaScript project with a specific esVersion conf", () => {
    mockConfigReader.mockReturnValueOnce({
      variables: {
        esVersion: "2023",
      },
    });

    const content = createEslintConfig(options("javascript"));
    const json: EslintConf = JSON.parse(content);

    expect(Object.keys(json.env)).toHaveLength(3);
    expect(json.env.node).toBeTruthy;
    expect(json.env.jest).toBeTruthy;
    expect(json.env.es2023).toBeTruthy;

    expect(json.extends).toHaveLength(1);
    expect(json.extends?.[0]).toBe("eslint:recommended");

    expect(Object.keys(json.parserOptions as StringOrNumberMap)).toHaveLength(2);
    expect(json.parserOptions?.ecmaVersion).toBe(2023);
    expect(json.parserOptions?.sourceType).toBe("module");

    expect(json.parser).toBeUndefined;
    expect(json.plugins).toBeUndefined;
  });

  it("should create a configuration for a TypeScript project with no specific conf", () => {
    mockConfigReader.mockReturnValueOnce({});

    const content = createEslintConfig(options("typescript"));
    const json: EslintConf = JSON.parse(content);

    expect(Object.keys(json.env)).toHaveLength(2);
    expect(json.env.node).toBeTruthy;
    expect(json.env.jest).toBeTruthy;

    expect(json.extends).toHaveLength(2);
    expect(json.extends?.[0]).toBe("eslint:recommended");
    expect(json.extends?.[1]).toBe("plugin:@typescript-eslint/recommended");

    expect(Object.keys(json.parserOptions as StringOrNumberMap)).toHaveLength(2);
    expect(json.parserOptions?.ecmaVersion).toBe("latest");
    expect(json.parserOptions?.sourceType).toBe("module");

    expect(json.parser).toBe("@typescript-eslint/parser");
    expect(json.plugins).toHaveLength(1);
    expect(json.plugins?.[0]).toBe("@typescript-eslint");
  });

  it("should create a configuration for a TypeScript project with a specific esVersion conf", () => {
    mockConfigReader.mockReturnValueOnce({
      variables: {
        esVersion: "2023",
      },
    });

    const content = createEslintConfig(options("typescript"));
    const json: EslintConf = JSON.parse(content);

    expect(Object.keys(json.env)).toHaveLength(3);
    expect(json.env.node).toBeTruthy;
    expect(json.env.jest).toBeTruthy;
    expect(json.env.es2023).toBeTruthy;

    expect(json.extends).toHaveLength(2);
    expect(json.extends?.[0]).toBe("eslint:recommended");
    expect(json.extends?.[1]).toBe("plugin:@typescript-eslint/recommended");

    expect(Object.keys(json.parserOptions as StringOrNumberMap)).toHaveLength(2);
    expect(json.parserOptions?.ecmaVersion).toBe(2023);
    expect(json.parserOptions?.sourceType).toBe("module");

    expect(json.parser).toBe("@typescript-eslint/parser");
    expect(json.plugins).toHaveLength(1);
    expect(json.plugins?.[0]).toBe("@typescript-eslint");
  });
});
