import { options } from "../../testUtils";
import { StringMap } from "../../../src/types/types";
import path from "path";

jest.doMock("../../../src/utils/rootPath", () => path.join(process.cwd(), "tests", "fixtures", "conf", "variables"));
import configReader from "../../../src/utils/configReader";

describe("config reader", () => {
  it("should read a basic configuration with variables", () => {
    const conf = configReader(options("javascript"));

    expect(Object.keys(conf.variables as StringMap)).toHaveLength(2);
    expect(conf.variables?.var1).toBe("value1");
    expect(conf.variables?.var2).toBe("value2");

    expect(Object.keys(conf.scripts as StringMap)).toHaveLength(2);
    expect(conf.scripts?.script1).toBe("script value1");
    expect(conf.scripts?.script2).toBe("script two");

    expect(conf.dependencies).toHaveLength(2);
    expect(conf.dependencies?.[0]).toBe("dependency1");
    expect(conf.dependencies?.[1]).toBe("dependency-value2");

    expect(conf.devDependencies).toHaveLength(2);
    expect(conf.devDependencies?.[0]).toBe("devDependency-value1");
    expect(conf.devDependencies?.[1]).toBe("devDependency2");
  });
});
