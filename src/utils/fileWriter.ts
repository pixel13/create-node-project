import fs from "fs";
import path from "path";

const ensureNotExisting = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    throw Error(`Cannot create file: ${filePath} already exists`);
  }
};

export const createFile = (filePath: string, content: string) => {
  ensureNotExisting(filePath);
  fs.writeFileSync(filePath, content);
};

export const createDir = (filePath: string) => {
  ensureNotExisting(filePath);
  fs.mkdirSync(filePath);
};

export const copyFolderContent = (sourceDir: string, destDir: string) => {
  const fileList = fs.readdirSync(sourceDir);
  fileList.forEach((fileName) => {
    const source = path.join(sourceDir, fileName);
    const dest = path.join(destDir, fileName);
    fs.copyFileSync(source, dest);
  });
};
