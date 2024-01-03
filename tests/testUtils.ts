import { Options } from "../src/types/types";

export const PROJECT_NAME = "project-name";
export const PROJECT_DESCRIPTION = "project description";
export const PROJECT_AUTHOR = "project author";
export const PROJECT_LICENSE = "MIT";

export const options = (language: "javascript" | "typescript", type: "generic" | "cli" = "generic"): Options => {
  return {
    projectName: PROJECT_NAME,
    description: PROJECT_DESCRIPTION,
    author: PROJECT_AUTHOR,
    language: language,
    license: PROJECT_LICENSE,
    projectType: type,
  };
};
