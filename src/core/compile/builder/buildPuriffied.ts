import { getFilePath } from "@src/utils/getFilePath";
import fs from "node:fs/promises";

export async function buildPuriffied() {
  const puriffiedPath = getFilePath("/puriffied");

  const isPuriffiedExist = (await fs.readdir(puriffiedPath)).length > 0;

  if (isPuriffiedExist) {
    await fs.rm(puriffiedPath, { recursive: true, force: true });
  }

  await fs.mkdir(puriffiedPath);
  await fs.mkdir(getFilePath("/puriffied/pages"));
  await fs.mkdir(getFilePath("/puriffied/public"));
  await fs.mkdir(getFilePath("/puriffied/public/local"));
  await fs.mkdir(getFilePath("/puriffied/public/local/db"));
  await fs.mkdir(getFilePath("/puriffied/public/local/docs"));
  await fs.mkdir(getFilePath("/puriffied/public/local/images"));
  await fs.mkdir(getFilePath("/puriffied/public/local/videos"));
}
