import createJestConfig from "../../src/files/jestConfig";

describe("jestConfig file content creator", () => {
  it("should return the configuration for using Jest in a Typescript project", () => {
    expect(createJestConfig()).toBe(`/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.js$": "$1",
  },
};`);
  });
});
