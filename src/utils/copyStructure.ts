import fs from "node:fs";
import path from "node:path";

export function copyFile(source: string, destination: string) {
  fs.copyFileSync(source, destination);
}

export function copyStructure(source: string, destination: string) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const items = fs.readdirSync(source);

  for (const item of items) {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);
    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      copyStructure(sourcePath, destinationPath);
    } else {
      copyFile(sourcePath, destinationPath);
    }
  }
}
