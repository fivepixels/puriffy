import { fancyLog } from "@src/utils/fancyLog";
import check from "./checker";

async function compile() {
  // check
  //
  // find the directory /app
  // find the file puriffy.config.ts
  // find the directory /page & find the file tree
  // check if all exported values are in the right shape
  //
  // build
  //
  // make a directory /puriffied(might be changed by the "outDir" value)
  // make a file server.js, which will be eventually run by the computer
  // make a info.json, which will contain all pages' methods
  // make directories based on found the file tree
  // make the index.html in each folder inside of the directories, which will be the pages
  // make the index.js in each folder inside of the directoriees, which will be the js file for hydration
  //
  // log
  // log the results

}

export default compile;
