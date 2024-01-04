import fs from "fs";
import path from "path";
import { copyFolderContent, createDir, createFile } from "../../src/utils/fileWriter";

const TEST_FOLDER = path.join(process.cwd(), "tests", "fixtures", "json");

describe("file writer utils", () => {
  beforeAll(() => {
    cleanUpTestDir();
  });

  it("should throw an error if trying to create a file that already exists", () => {
    const filePath = path.join(TEST_FOLDER, "sample.json");
    expect(() => {
      createFile(filePath, "");
    }).toThrow();
  });

  it("should create a new file with the given content", () => {
    const filePath = path.join(TEST_FOLDER, "newfile.txt");
    const content = "This is the content";
    createFile(filePath, content);
    expect(fs.existsSync(filePath)).toBeTruthy();
    expect(fs.readFileSync(filePath, "utf-8")).toBe(content);
  });

  it("should throw an error if trying to create a directory that already exists", () => {
    expect(() => {
      createDir(TEST_FOLDER);
    }).toThrow();
  });

  it("should create a new directory", () => {
    const filePath = path.join(TEST_FOLDER, "newdir");
    createDir(filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
  });

  it("should copy all the files from a directory to another", () => {
    const source = path.join(TEST_FOLDER, "..", "source");
    const dest = path.join(TEST_FOLDER, "dest");
    createDir(dest);

    copyFolderContent(source, dest);

    expect(fs.existsSync(dest)).toBeTruthy();
    expect(fs.existsSync(path.join(dest, "file_one.txt"))).toBeTruthy();
    expect(fs.existsSync(path.join(dest, "file_two.txt"))).toBeTruthy();
    expect(fs.readFileSync(path.join(dest, "file_one.txt"), "utf-8")).toBe("This is file one");
    expect(fs.readFileSync(path.join(dest, "file_two.txt"), "utf-8")).toBe("This is file two");
  });

  afterAll(() => {
    cleanUpTestDir();
  });
});

function cleanUpTestDir() {
  const files = fs.readdirSync(TEST_FOLDER);
  files.forEach((file) => {
    const filePath = path.join(TEST_FOLDER, file);
    if (file !== "sample.json") {
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });
}
