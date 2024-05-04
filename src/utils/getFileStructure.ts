import fs from "node:fs/promises";
import path from "node:path";
import { getFilePath } from "./getFilePath";

interface FolderStructure {
  folderName: string;
  files: string[];
  folders: FolderStructure[];
}

async function getFileStructure(defaultPath: string): Promise<FolderStructure> {
  const entries = await fs.readdir(defaultPath, { withFileTypes: true });
  const folderStructure: FolderStructure = {
    folderName: path.basename(defaultPath),
    files: [],
    folders: [],
  };

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subFolderPath = path.join(defaultPath, entry.name);
      const subFolderStructure = await getFileStructure(subFolderPath);
      folderStructure.folders.push(subFolderStructure);
    } else if (entry.isFile()) {
      folderStructure.files.push(entry.name);
    }
  }

  return folderStructure;
}

export default getFileStructure;
