export function checkIfGroupFolder(basePath: string): boolean {
  const splittedPath = basePath.split("/");
  const parentFolder = splittedPath[splittedPath.length - 1];

  return parentFolder.startsWith("(") && parentFolder.endsWith(")");
}

export function removeGroupFolderNames(basePath: string): string {
  return basePath.replace(/\/\(.*?\)/g, "");
}
