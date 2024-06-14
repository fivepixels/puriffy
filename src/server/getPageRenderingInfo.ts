import type { FromDynamicRoutes, PageRenderingMethod } from "@type/index";

export interface PageInfo {
  method: PageRenderingMethod;
  path: string;
  dynamicRoutes?: FromDynamicRoutes;
}

export interface PageInfoJSON {
  [K: string]: PageRenderingMethod;
}

export async function getPageRenderingInfo(
  url: string,
  config: PageInfoJSON,
): Promise<PageInfo | 404> {
  if (url === "/") {
    return {
      method: config["/"],
      path: "",
    };
  }

  const splittedURL = url
    .split("/")
    .filter((currentSubdirectory) => currentSubdirectory !== "");

  if (config[url]) {
    return {
      method: config[url],
      path: `${url}`,
    };
  }

  for (const currentConfigURL in config) {
    const splittedConfigURL = splitUrl(currentConfigURL);

    if (splittedConfigURL.length !== splittedURL.length) {
      continue;
    }

    const dynamicRoutes: FromDynamicRoutes = {};
    let isMatched = false;

    for (
      let currentSubdirectoryIndex = 0;
      currentSubdirectoryIndex < splittedURL.length;
      currentSubdirectoryIndex++
    ) {
      const currentSplittedConfigURL =
        splittedConfigURL[currentSubdirectoryIndex];
      const currentSplittedURL = splittedURL[currentSubdirectoryIndex];

      const isDyanmic = currentSplittedConfigURL.startsWith("+");

      if (isDyanmic) {
        dynamicRoutes[currentSplittedConfigURL] = currentSplittedURL;
        continue;
      }

      isMatched =
        String(currentSplittedURL) === String(currentSplittedConfigURL);

      if (!isMatched) {
        break;
      }
    }

    if (isMatched) {
      return {
        path: currentConfigURL,
        method: config[currentConfigURL],
        dynamicRoutes: dynamicRoutes,
      };
    }
  }

  return 404;
}

function splitUrl(path: string) {
  return path
    .split("/")
    .filter((currentSubdirectory) => currentSubdirectory !== "");
}
