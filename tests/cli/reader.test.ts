import { Answers, DistinctQuestion } from "inquirer";
import reader from "../../src/cli/reader";
import { Options } from "../../src/types/types";

jest.mock("../../src/cli/defaults", () => ({}));

jest.mock("inquirer", () => ({
  prompt: async (args: ReadonlyArray<DistinctQuestion<Answers>>) =>
    ({
      projectName: args[0].name,
      description: args[1].name,
      author: args[2].name,
      license: args[3].name,
      language: "typescript",
      projectType: "cli",
    }) as Options,
}));

describe("CLI reader", () => {
  it("should read a set of information from the user", async () => {
    expect(await reader()).toStrictEqual({
      projectName: "projectName",
      description: "description",
      author: "author",
      license: "license",
      language: "typescript",
      projectType: "cli",
    });
  });
});
