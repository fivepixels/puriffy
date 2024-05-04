import fs from "node:fs/promises";
import path from "node:path";
import { getFilePath } from "./getFilePath";

interface FolderStructure {
  folderName: string;
  files: string[];
  folders: string[];
}

async function getFileStructure(defaultPath: string): Promise<FolderStructure> {
  const entries = await fs.readdir(defaultPath, { withFileTypes: true });
  const folderStructure: FolderStructure = {
    folderName: path.basename(defaultPath),
    files: [],
    folders: [],
  };

  for (const entry of entries) {
    if (entry.isFile()) {
      folderStructure.files.push(entry.name);
    } else if (entry.isDirectory()) {
      folderStructure.folders.push(entry.name);
    }
  }

  return folderStructure;
}

export default getFileStructure;
