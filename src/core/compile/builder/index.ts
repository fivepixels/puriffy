import { getFilePath } from "@src/utils/getFilePath";
import { buildPreWrittenFiles } from "./prewritten";
import { buildPuriffied } from "./puriffied";
import { buildRoutes } from "./route";
import fs from "node:fs/promises";

async function build() {
  await buildPuriffied();
  await buildPreWrittenFiles();

  const finalRouteInfo = await buildRoutes();

  await fs.writeFile(
    getFilePath(["/puriffied/info.json"]),
    JSON.stringify(finalRouteInfo),
  );
}

export default build;
