import { getFilePath } from "@src/utils/getFilePath";
import getFileStructure from "@src/utils/getFileStructure";
import type { CheckReturn } from ".";

export async function checkFiles(
  defaultCheckingFolder?: string,
): Promise<CheckReturn> {
  const basePath = getFilePath([
    "/app/pages",
    defaultCheckingFolder ? defaultCheckingFolder : "",
  ]);
  const requiredFiles = [
    "events.ts",
    "interactions.ts",
    "page.ts",
    "profile.ts",
  ];

  const fileStructure = await getFileStructure(basePath);

  const isFilesAllowed =
    String(fileStructure.files.sort()) === String(requiredFiles.sort());

  if (!isFilesAllowed) {
    return {
      content: `The folder | path: ${fileStructure.folderName} | does not have all required files or has some unallowed files.`,
      hasError: true,
    };
  }

  for (const currentFolder of fileStructure.folders) {
    const isFolderNameAllowed = /^[_]*[a-z]+[_]*$/.test(currentFolder);

    if (!isFolderNameAllowed) {
      return {
        content: `The folder | path: ${defaultCheckingFolder}/${currentFolder} | has an unallowed name. Remember, any folders for route must not have any letters, except for lowercase alphabets, and underscores at the beginning and last.`,
        hasError: true,
      };
    }

    const currentFolderCheckingResult = await checkFiles(
      `${defaultCheckingFolder ? defaultCheckingFolder : ""}/${currentFolder}`,
    );

    if (currentFolderCheckingResult.hasError) {
      return {
        content: currentFolderCheckingResult.content,
        hasError: true,
      };
    }
  }

  return { hasError: false };
}
