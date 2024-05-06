import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";

export async function buildPuriffied() {
  const puriffiedPath = getFilePath("/puriffied");
  const isPuriffiedExist = (await fs.readdir(getFilePath(""))).includes(
    "puriffied",
  );

  if (isPuriffiedExist) {
    await fs.rm(puriffiedPath, { recursive: true, force: true });
  }

  await fs.mkdir(puriffiedPath);
  await fs.mkdir(getFilePath("/puriffied/pages"));
  await fs.mkdir(getFilePath("/puriffied/public"));
  await fs.mkdir(getFilePath("/puriffied/public/local"));
  await fs.mkdir(getFilePath("/puriffied/public/local/db"));
  await fs.mkdir(getFilePath("/puriffied/public/local/docs"));
}
