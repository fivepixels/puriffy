import { fancyLog } from "@src/utils/fancyLog";
import build from "./builder";
import check from "./checker";

async function compile() {
  // build
  //
  // make a info.json, which will contain all pages' methods
  // make directories based on found the file tree
  // make the index.html in each folder inside of the directories, which will be the pages
  // make the index.js in each folder inside of the directoriees, which will be the js file for hydration
  //
  // log
  // log the results

  const checkingResult = await check();

  fancyLog(checkingResult);

  await build();
}

compile();

export default compile;
