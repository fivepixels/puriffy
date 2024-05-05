import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";
import type { FromLocal, LocalType } from "@type/routes/events";

function getFromLocal(): FromLocal {
  const returnedObject: Partial<FromLocal> = {};
  const allLocalFileTypes: LocalType[] = ["db", "docs"];

  for (const currentLocalType of allLocalFileTypes) {
    returnedObject[currentLocalType] = {
      async use(title) {
        return await getLocalFile(currentLocalType, title);
      },
    };
  }

  return returnedObject as FromLocal;
}

export async function getLocalFile(
  type: LocalType,
  title: string,
): Promise<string> {
  return await fs.readFile(
    getFilePath(["/puriffied/public/local/", type, title]),
    {
      encoding: "utf-8",
    },
  );
}

export default getFromLocal;
