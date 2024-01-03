import { Options } from "../types/types.js";
import configReader from "../utils/configReader.js";

export type TsConfig = {
  extends?: string;
  compilerOptions?: {
    rootDir?: string;
    outDir?: string;
  };
  include?: string[];
};

export default (options: Options): string => {
  const conf = configReader(options);

  const tsConfig: TsConfig = {
    extends: `@tsconfig/node${conf.variables?.nodeVersion}/tsconfig.json`,
    compilerOptions: {
      rootDir: "src",
      outDir: "dist",
    },
    include: ["src/**/*"],
  };

  return JSON.stringify(tsConfig, null, 2);
};
