import fs from "node:fs";

export function getFolderNames(basePath: string): string[] {
  return fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export function getFileNames(basePath: string): string[] {
  return fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);
}
