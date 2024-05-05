import { buildPuriffied } from "./buildPuriffied";
import { buildPreWrittenFiles } from "./prewritten";
import { buildRoutes } from "./route";

async function build() {
  await buildPuriffied();
  await buildPreWrittenFiles();
  await buildRoutes();
}

export default build;
