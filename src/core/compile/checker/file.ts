import { getFilePath } from "@src/utils/getFilePath";
import type { FolderString, CheckReturn } from ".";
import fs from "node:fs/promises";
import path from "node:path";

export async function checkFiles(
  defaultCheckingFolder?: string,
): Promise<CheckReturn> {
  const defaultCheckingFolderPath = defaultCheckingFolder
    ? defaultCheckingFolder
    : "/app/pages";
  const checkingFolderPath = getFilePath(defaultCheckingFolderPath);
  const checkingFolderContent = (await fs.readdir(checkingFolderPath)).sort();
  const requiredFiles = [
    "events.ts",
    "interactions.ts",
    "page.ts",
    "profile.ts",
  ];

  for (const currentFile of checkingFolderContent) {
    const isCurrentFolder = (
      await fs.stat(path.join(checkingFolderPath, currentFile))
    ).isDirectory();

    if (isCurrentFolder) {
      const currentFileIndex = checkingFolderContent.indexOf(currentFile);
      if (currentFileIndex !== -1) {
        checkingFolderContent.splice(currentFileIndex, 1);
      }

      const isFolderNameAllowed = /^[_]*[a-z]+[_]*$/.test(currentFile);
      if (!isFolderNameAllowed) {
        return {
          content: `The folder | path: ${currentFile} | has an unallowed name. Remember, any folders for route must not have any letters, except for lowercase alphabets, and underscores at the beginning and last.`,
          hasError: true,
        };
      }

      return await checkFiles(
        path.join(defaultCheckingFolderPath, currentFile) as FolderString,
      );
    }
  }

  const isFilesAllowed =
    String(checkingFolderContent) === String(requiredFiles);

  if (!isFilesAllowed) {
    return {
      content: `The folder | path: ${checkingFolderPath} | does not have all required files or has some unallowed files.`,
      hasError: true,
    };
  }

  return {
    hasError: false,
  };
}
