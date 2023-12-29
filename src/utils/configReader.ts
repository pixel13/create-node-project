import { readJson } from "./fileReader.js";
import { Options, StringMap } from "../types/types.js";
import _ from "lodash";
import path from "path";
import rootPath from "./rootPath.js";

type Config = {
  variables?: StringMap;
  scripts?: StringMap;
  dependencies?: string[];
  devDependencies?: string[];
};

const replace = (text: string, variables: StringMap): string => {
  Object.keys(variables).forEach((varName) => {
    text = text.replaceAll(`\${${varName}}`, variables[varName]);
  });

  return text;
};

const replaceVariables = (conf: Config): Config => {
  if (conf.variables) {
    (Object.keys(conf) as Array<keyof Config>).forEach((element) => {
      if (Array.isArray(conf[element])) {
        (conf[element] as string[]).forEach((value, index, arr) => {
          arr[index] = replace(value, conf.variables as StringMap);
        });
      } else {
        Object.keys(conf[element] as StringMap).forEach((key) => {
          const value = (conf[element] as StringMap)[key];
          (conf[element] as StringMap)[key] = replace(value, conf.variables as StringMap);
        });
      }
    });
  }

  return conf;
};

export default (options: Options): Config => {
  const confDir = path.join(rootPath, "conf");

  const baseConf = readJson(path.join(confDir, "base.json")) || {};
  const languageConf = readJson(path.join(confDir, `${options.language}.json`)) || {};
  const typeConf = readJson(path.join(confDir, `${options.projectType}.json`)) || {};

  const conf = _.mergeWith(baseConf, languageConf, typeConf, (objValue, srcValue) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });

  return replaceVariables(conf);
};
