import { options } from "./../testUtils";
import createTsConfig, { TsConfig } from "../../src/files/tsConfig";
import configReader from "../../src/utils/configReader";

jest.mock("../../src/utils/configReader", () => jest.fn());
const mockConfigReader = jest.mocked(configReader);

describe("tsConfig file content creator", () => {
  it("should create the TypeScript minimal configuration", () => {
    mockConfigReader.mockReturnValueOnce({
      variables: {
        nodeVersion: "18",
      },
    });

    const content = createTsConfig(options("typescript"));
    const json: TsConfig = JSON.parse(content);

    expect(json.extends).toBe("@tsconfig/node18/tsconfig.json");
    expect(json.compilerOptions?.rootDir).toBe("src");
    expect(json.compilerOptions?.outDir).toBe("dist");
    expect(json.include).toHaveLength(1);
    expect(json.include?.[0]).toBe("src/**/*");
  });
});
