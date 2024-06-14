export async function getCommonJs(): Promise<string> {
  return await Bun.file(`${process.cwd()}/puriffied/public/common.js`).text();
}
