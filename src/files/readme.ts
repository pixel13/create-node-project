import { Options } from "../types/types.js";

export default (options: Options): string => {
  return `# ${options.projectName}

${options.description}
`;
};
