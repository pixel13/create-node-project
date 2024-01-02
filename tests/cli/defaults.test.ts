import { readJson } from "../../src/utils/fileReader";
import defaults from "../../src/cli/defaults";

const DEFAULT_VALUES = {
  author: "Tiziano Pessa",
  license: "MIT",
  language: "typescript",
};

jest.mock("../../src/utils/fileReader", () => ({
  readJson: jest.fn(() => ({
    author: "Tiziano Pessa",
    license: "MIT",
    language: "typescript",
  })),
}));
const mockReader = jest.mocked({ readJson });

jest.mock("../../src/utils/rootPath", () => "");

describe("CLI defaults", () => {
  it("should read the JSON file containing the default values", () => {
    mockReader.readJson.mockReturnValue(DEFAULT_VALUES);
    expect(defaults).toStrictEqual(DEFAULT_VALUES);
  });
});
