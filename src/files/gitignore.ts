import { Options } from "../types/types.js";

export default (options: Options): string => {
  const ignored = ["node_modules", ...(options.language === "typescript" ? ["dist"] : [])];

  return ignored.join("\r\n");
};
