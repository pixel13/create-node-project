import path from "path";
import { fileURLToPath } from "url";

const fileDir = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.join(fileDir, "..", "..");

export default rootPath;
