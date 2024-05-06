import { getFilePath } from "@src/utils/getFilePath";
import type { RouteInfo } from "@type/index";

type PageInfo = {
  path: string;
  method: string;
};

export function getPageInfo(urlRoutes: string[], config: RouteInfo): PageInfo {
  let currentPath = getFilePath("/puriffied/pages");
  let currentRouteConfig = config;

  if (urlRoutes.length === 0) {
    return {
      method: config.index,
      path: currentPath,
    };
  }

  for (const currentUrlRoute of urlRoutes) {
    if (currentRouteConfig[currentUrlRoute]) {
      currentRouteConfig = currentRouteConfig[currentUrlRoute] as RouteInfo;
      currentPath += `/${currentUrlRoute}`;
    } else {
      const dynamicRoutes = Object.keys(currentRouteConfig).filter(
        (currentKey) => currentKey[0] === "_",
      );

      if (dynamicRoutes.length === 1) {
        currentRouteConfig = currentRouteConfig[dynamicRoutes[0]] as RouteInfo;
        currentPath += `/${dynamicRoutes[0]}`;
      } else {
        return {
          method: "SSG",
          path: getFilePath("/puriffied/pages/404.html"),
        };
      }
    }
  }

  if (typeof currentRouteConfig.index === "string") {
    return {
      path: currentPath,
      method: currentRouteConfig.index,
    };
  }

  return {
    method: config.index, // TODO: work on stuff like 404 or 500
    path: getFilePath("/puriffied/pages/404.html"),
  };
}
