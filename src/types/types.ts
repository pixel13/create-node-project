export type Options = {
  projectName: string;
  description: string;
  author: string;
  license: string;
  language: "javascript" | "typescript";
  projectType: "cli" | "generic";
};

export type StringMap = { [key: string]: string };

export type BooleanMap = { [key: string]: boolean };

export type StringOrNumberMap = { [key: string]: string | number };
