import { fancyLog } from "@src/utils/fancyLog";
import build from "./builder";
import check from "./checker";

async function compile() {
  const checkingResult = await check();

  fancyLog(checkingResult);

  await build();
}

export default compile;
