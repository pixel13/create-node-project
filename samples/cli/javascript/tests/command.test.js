const command = require("../src/command");

describe("CLI Command", () => {
  it("should return a string", () => {
    expect(command()).toContain("create-node-project");
  });
});
