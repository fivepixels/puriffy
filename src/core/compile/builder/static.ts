import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";

export async function buildStatic(): Promise<void> {
  await fs.mkdir(getFilePath("/puriffied/public"));
  await fs.mkdir(getFilePath("/puriffied/public/local"));
  await fs.mkdir(getFilePath("/puriffied/public/local/db"));
  await fs.mkdir(getFilePath("/puriffied/public/local/docs"));
  await fs.mkdir(getFilePath("/puriffied/public/local/images"));
  await fs.mkdir(getFilePath("/puriffied/public/local/videos"));

  return;
}
