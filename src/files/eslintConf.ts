import { BooleanMap, Options, StringOrNumberMap } from "../types/types.js";
import configReader from "../utils/configReader.js";

export type EslintConf = {
  env: BooleanMap;
  extends?: string[];
  parser?: string;
  parserOptions?: StringOrNumberMap;
  plugins?: string[];
};

export default (options: Options): string => {
  const conf = configReader(options);

  const eslint: EslintConf = {
    env: {
      node: true,
      jest: true,
      ...(conf.variables && { ["es" + conf.variables.esVersion]: true }),
    },
    extends: ["eslint:recommended"],
    parserOptions: {
      ecmaVersion: Number(conf.variables?.esVersion) || "latest",
      sourceType: "module",
    },
  };

  if (options.language === "typescript") {
    eslint.extends?.push("plugin:@typescript-eslint/recommended");
    eslint.parser = "@typescript-eslint/parser";
    eslint.plugins = ["@typescript-eslint"];
  }

  return JSON.stringify(eslint, null, 2);
};
