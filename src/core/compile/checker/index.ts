import type { LogInfo } from "@src/utils/fancyLog";
import { checkTree } from "./tree";
import { checkFiles } from "./file";

export type FolderString = `/${string}` | `/${string}/${string}`;
export interface CheckReturn {
  content?: string;
  hasError: boolean;
}

async function check(): Promise<LogInfo> {
  const checkingSructureResult = checkTree();

  if (checkingSructureResult.hasError) {
    return {
      type: "COMPILING",
      description:
        "There was an error while checking folder structure of your app.",
      content: `${checkingSructureResult.content}`,
      hasError: true,
    };
  }

  const checkingFilesResult = await checkFiles();

  if (checkingFilesResult.hasError) {
    return {
      type: "COMPILING",
      description: "There was an error while checking files in your app.",
      content: `${checkingFilesResult.content}`,
      hasError: true,
    };
  }

  return {
    type: "COMPILING",
    content: "Checking is done successfully!",
    hasError: false,
  };
}

export default check;
