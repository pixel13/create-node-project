import { options } from "../../testUtils";
import { StringMap } from "../../../src/types/types";
import path from "path";

jest.doMock("../../../src/utils/rootPath", () => path.join(process.cwd(), "tests", "fixtures", "conf", "hierarchical"));
import configReader from "../../../src/utils/configReader";

describe("config reader", () => {
  it("should read a hierarchical JavaScript configuration with variables", () => {
    const conf = configReader(options("javascript"));

    expect(Object.keys(conf.variables as StringMap)).toHaveLength(3);
    expect(conf.variables?.var1).toBe("value1");
    expect(conf.variables?.var2).toBe("new-value2");
    expect(conf.variables?.var3).toBe("value3");

    expect(Object.keys(conf.scripts as StringMap)).toHaveLength(3);
    expect(conf.scripts?.script1).toBe("script value1");
    expect(conf.scripts?.script2).toBe("script new-value2");
    expect(conf.scripts?.script3).toBe("script value3");

    expect(conf.dependencies).toHaveLength(3);
    expect(conf.dependencies?.[0]).toBe("dependency1");
    expect(conf.dependencies?.[1]).toBe("dependency-new-value2");
    expect(conf.dependencies?.[2]).toBe("dependency3");

    expect(conf.devDependencies).toHaveLength(3);
    expect(conf.devDependencies?.[0]).toBe("devDependency-value1");
    expect(conf.devDependencies?.[1]).toBe("devDependency2");
    expect(conf.devDependencies?.[2]).toBe("devDependency3");
  });

  it("should read a hierarchical TypeScript configuration with variables", () => {
    const conf = configReader(options("typescript"));

    expect(Object.keys(conf.variables as StringMap)).toHaveLength(3);
    expect(conf.variables?.var1).toBe("value1");
    expect(conf.variables?.var2).toBe("new-value2");
    expect(conf.variables?.var3).toBe("value3");

    expect(Object.keys(conf.scripts as StringMap)).toHaveLength(3);
    expect(conf.scripts?.script1).toBe("script value1");
    expect(conf.scripts?.script2).toBe("script new-value2");
    expect(conf.scripts?.script3).toBe("script value3");

    expect(conf.dependencies).toHaveLength(3);
    expect(conf.dependencies?.[0]).toBe("dependency1");
    expect(conf.dependencies?.[1]).toBe("dependency-new-value2");
    expect(conf.dependencies?.[2]).toBe("dependency3");

    expect(conf.devDependencies).toHaveLength(3);
    expect(conf.devDependencies?.[0]).toBe("devDependency-value1");
    expect(conf.devDependencies?.[1]).toBe("devDependency2");
    expect(conf.devDependencies?.[2]).toBe("devDependency3");
  });
});
