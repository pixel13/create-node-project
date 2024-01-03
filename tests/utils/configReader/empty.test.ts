import { options } from "../../testUtils";
import path from "path";

jest.doMock("../../../src/utils/rootPath", () => path.join(process.cwd(), "tests", "fixtures", "conf", "empty"));
import configReader from "../../../src/utils/configReader";

describe("config reader", () => {
  it("should return an empty object if no config file is found", () => {
    const conf = configReader(options("javascript"));

    expect(conf).toStrictEqual({});
  });
});
