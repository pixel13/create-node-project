const main = require("../src/main");

describe("My awesome project", () => {
  it("should return a string", () => {
    expect(main()).toContain("create-node-project");
  });
});
