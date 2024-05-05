import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";

export async function getCommonJs(): Promise<string> {
  return await fs.readFile(getFilePath("/puriffied/public/common.js"), {
    encoding: "utf-8",
  });
}
