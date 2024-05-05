import { getFilePath } from "@src/utils/getFilePath";

export async function getCommonJs(): Promise<string> {
  return await Bun.file(getFilePath("/puriffied/public/common.js")).text();
}
