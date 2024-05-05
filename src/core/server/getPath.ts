import { getFilePath } from "@src/utils/getFilePath";

interface DynamicRoute {
  id: string;
  value: string;
}

interface Route {
  baseRoute: string;
  dynamicRoutes: DynamicRoute[];
}

export function getPath(pathName: string, route: Route[]) {
  return getFilePath([
    "puriffied",
    pathName,
    pathName.startsWith("/public") ? "" : "/index.html",
  ]);
}
