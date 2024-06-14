import fs from "node:fs";
import type { FromLocal, LocalType } from "@type/index";
import { getFileNames, getFolderNames } from "../files";

export function getFromLocal(): FromLocal {
  const returnedObject: Partial<FromLocal> = {};
  const allLocalFileTypes: LocalType[] = ["db", "docs"];

  for (const currentLocalType of allLocalFileTypes) {
    returnedObject[currentLocalType] = {
      async getFileText(id: string) {
        const filePath = `${process.cwd()}/puriffied/public/local/${currentLocalType}/${id}`;
        const selectedFile = Bun.file(filePath);

        if (!(await selectedFile.exists())) {
          return false;
        }

        return await selectedFile.text();
      },
      async checkIfExists(id: string) {
        return await Bun.file(
          `${process.cwd()}/puriffied/public/local/${currentLocalType}/${id}`,
        ).exists();
      },
      getFolders(id?: string) {
        const basePath = `${process.cwd()}/puriffied/public/local/${currentLocalType}${
          id ? id : ""
        }`;
        const doesFolderExist = fs.existsSync(basePath);

        if (!doesFolderExist) {
          return false;
        }

        return getFolderNames(basePath);
      },
      getFiles(id?: string) {
        const basePath = `${process.cwd()}/puriffied/public/local/${currentLocalType}${
          id ? id : ""
        }`;

        const doesFolderExist = fs.existsSync(basePath);

        if (!doesFolderExist) {
          return false;
        }

        return getFileNames(basePath);
      },
    };
  }

  return returnedObject as FromLocal;
}
