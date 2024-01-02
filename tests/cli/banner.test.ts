import figlet from "figlet";
import banner from "../../src/cli/banner";

const BANNER_TEXT = "This is a banner";
const SMALL_TEXT = "Small text";

jest.mock("figlet");
const mockFiglet = jest.mocked(figlet);

describe("CLI banner", () => {
  it("should return a text banner", () => {
    mockFiglet.textSync.mockReturnValueOnce(BANNER_TEXT);
    expect(banner("Test")).toBe(BANNER_TEXT);
  });

  it("should return a text banner with a right aligned small text, if given", () => {
    mockFiglet.textSync.mockReturnValueOnce(BANNER_TEXT);
    const result = banner("Test", SMALL_TEXT);
    expect(result).toBe(BANNER_TEXT + "\r\n      " + SMALL_TEXT + "\r\n");
  });
});
