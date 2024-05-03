import path from "node:path";

export function getFilePath(paths: string | string[]): string {
  const isPathsString = typeof paths === "string";
  if (isPathsString) return path.join(process.cwd(), paths);
  return path.join(process.cwd(), ...paths);
}
