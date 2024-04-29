import path from "node:path";

export async function getCommonJs(): Promise<string> {
  return await Bun.file(
    path.join(process.cwd(), "puriffied", "public", "common.js"),
  ).text();
}
