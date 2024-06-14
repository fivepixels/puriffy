import { getFileNames, getFolderNames } from "@src/utils/files";
import { checkIfGroupFolder } from "@src/utils/url";

async function check(): Promise<string[]> {
  const basePath = `${process.cwd()}/app/pages`;
  const errorMessages = await checkRouteFolder(basePath);

  return errorMessages;
}

async function checkRouteFolder(basePath: string): Promise<string[]> {
  const errorMessages: string[] = [];

  const allFolders = getFolderNames(basePath);
  const allFiles = getFileNames(basePath);
  const isParentGroupFolder = checkIfGroupFolder(basePath);

  const errorMessagesFromFolders = await checkFolders(allFolders, basePath);
  const errorMessagesFromFiles = isParentGroupFolder
    ? []
    : await checkFiles(allFiles, basePath);

  const errorMessagesFromSubDirectories: string[] = [];
  for (const currentFolder of allFolders) {
    errorMessagesFromSubDirectories.push(
      ...(await checkRouteFolder(`${basePath}/${currentFolder}`)),
    );
  }

  return errorMessages.concat(
    errorMessagesFromFolders,
    errorMessagesFromFiles,
    errorMessagesFromSubDirectories,
  );
}

async function checkFolders(
  allFolders: string[],
  basePath: string,
): Promise<string[]> {
  const errorMessages: string[] = [];

  for (const currentFolderName of allFolders) {
    const isCurrentFolderStatusCodePage =
      currentFolderName === "404" || currentFolderName === "500";
    const isCurrentFolderGroup =
      currentFolderName.startsWith("(") && currentFolderName.endsWith(")");

    if (isCurrentFolderStatusCodePage || isCurrentFolderGroup) {
      continue;
    }

    const isCurrentFolderNameAllowed = /^(?:\+[a-zA-Z]+|[a-zA-Z_-]+)$/.test(
      currentFolderName,
    );

    if (!isCurrentFolderNameAllowed) {
      errorMessages.push(
        `| FOLDERS | ➜ There is a folder name that is NOT allowed. Unallowed Folder : ${`${basePath}/${currentFolderName}`.replaceAll(
          process.cwd(),
          "",
        )}`,
      );
    }
  }

  return errorMessages;
}

async function checkFiles(
  allFiles: string[],
  basePath: string,
): Promise<string[]> {
  const errorMessages: string[] = [];

  // TODO: Decide if we should allow develoepers to add more files in the route foler
  const expectedFiles = ["client.ts", "server.ts"].sort();
  const doesExpectedFilesExist = String(allFiles) === String(expectedFiles);

  if (!doesExpectedFilesExist) {
    errorMessages.push(
      `| FILES | ➜ There are missing or unallowed files. Unallowed Folder : ${basePath.replaceAll(
        process.cwd(),
        "",
      )}`,
    );
  }

  return errorMessages;
}

export default check;
