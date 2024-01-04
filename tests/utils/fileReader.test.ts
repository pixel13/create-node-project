import path from "path";
import { readJson } from "../../src/utils/fileReader";

describe("file reader utils", () => {
  it("should return null if required JSON file does not exist", () => {
    const filePath = path.join(process.cwd(), "tests", "fixtures", "json", "unexisting.json");
    expect(readJson(filePath)).toBeNull();
  });

  it("should read and parse a JSON file", () => {
    const filePath = path.join(process.cwd(), "tests", "fixtures", "json", "sample.json");
    const json = readJson(filePath);

    expect(json.property1).toBe("value1");
    expect(Object.keys(json.property2)).toHaveLength(1);
    expect(json.property2.subproperty).toBe("subpropertyValue");
    expect(json.property3).toHaveLength(3);
    expect(json.property3).toStrictEqual([1, 2, 3]);
  });
});
