import main from "../src/main.js";

describe("My awesome project", () => {
  it("should return a string", () => {
    expect(main()).toContain("create-node-project");
  });
});
