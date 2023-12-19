import command from "../src/command.js";

describe("CLI Command", () => {
  it("should return a string", () => {
    expect(command()).toContain("create-node-project");
  });
});
