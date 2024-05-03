import { getFilePath } from "@src/utils/getFilePath";
import type { CheckReturn } from ".";
import fs from "node:fs";

export function checkTree(): CheckReturn {
  const checkingFolder = [
    "/app",
    "/app/pages",
    "/app/components",
    "/app/local",
    "/app/utils",
  ];

  for (
    let currentFolderIndex = 0;
    currentFolderIndex < checkingFolder.length;
    currentFolderIndex++
  ) {
    const currentFolder = checkingFolder[currentFolderIndex];

    const isCurrentFolderExist = fs.existsSync(getFilePath(currentFolder));

    if (!isCurrentFolderExist) {
      return {
        content: `The folder | path: ${currentFolder} | is missing from your app.`,
        hasError: true,
      };
    }
  }

  return {
    hasError: false,
  };
}
