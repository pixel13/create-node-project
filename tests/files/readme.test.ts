import { PROJECT_NAME, PROJECT_DESCRIPTION, options } from "./../testUtils";
import createReadme from "../../src/files/readme";

describe("readme file content creator", () => {
  it("should create a minimal readme content", () => {
    expect(createReadme(options("javascript"))).toBe(`# ${PROJECT_NAME}

${PROJECT_DESCRIPTION}
`);
  });
});
