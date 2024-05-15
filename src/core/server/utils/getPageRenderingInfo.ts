import type { RenderingMethod } from "@type/index";

interface PageInfo {
  method: RenderingMethod;
  path: string;
}

export interface PageInfoJSON {
  [K: string]: RenderingMethod;
}

export async function getPageRenderingInfo(
  url: string,
  config: PageInfoJSON,
): Promise<PageInfo> {
  const basePath = "/puriffied/pages";

  if (config[url]) {
    return {
      method: config[url],
      path: `${basePath}${url}`,
    };
  }

  const subdirectories = getSubdirectoryList(url);

  for (const currentValue in config) {
    const subdirectoriesForCurrent = getSubdirectoryList(currentValue);

    if (subdirectories.length === subdirectoriesForCurrent.length) {
      continue;
    }

    for (
      let currentSubdirectoryIndex = 0;
      currentSubdirectoryIndex < subdirectories.length;
      currentSubdirectoryIndex++
    ) {
      const currentSubdirectory = subdirectories[currentSubdirectoryIndex];
      const currentSubdirectoryForCurrent =
        subdirectoriesForCurrent[currentSubdirectoryIndex];

      if (currentSubdirectory !== currentSubdirectoryForCurrent) {
        if (!currentSubdirectory.startsWith("_")) {
          return {
            method: config["/404"],
            path: `${basePath}/404`,
          };
        }
      }
    }
  }

  return {
    method: config["/404"],
    path: `${basePath}/404`,
  };
}

function getSubdirectoryList(path: string) {
  return path
    .split("/")
    .filter((currentSubdirectory) => currentSubdirectory !== "");
}
