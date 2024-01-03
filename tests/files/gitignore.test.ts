import createGitignore from "../../src/files/gitignore";
import { options } from "../testUtils";

describe("gitignore file content creator", () => {
  it("should create the .gitignore content for a JavaScript project", () => {
    const content = createGitignore(options("javascript"));
    const entries = content.split("\r\n");
    expect(entries).toHaveLength(1);
    expect(entries[0]).toBe("node_modules");
  });

  it("should create the .gitignore content for a TypeScript project", () => {
    const content = createGitignore(options("typescript"));
    const entries = content.split("\r\n");
    expect(entries).toHaveLength(2);
    expect(entries[0]).toBe("node_modules");
    expect(entries[1]).toBe("dist");
  });
});
