import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";
import { buildStatic } from "./static";
import { buildPreWrittenFiles } from "./prewritten";
import { buildRoutes } from "./route";

async function build() {
  await fs.mkdir(getFilePath("/puriffied"));
  await fs.mkdir(getFilePath("/puriffied/pages"));

  await buildStatic();
  await buildPreWrittenFiles();
  await buildRoutes();
}

export default build;
