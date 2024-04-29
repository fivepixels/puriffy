import path from "node:path";

interface DynamicRoute {
  id: string;
  value: string;
}

interface Route {
  baseRoute: string;
  dynamicRoutes: DynamicRoute[];
}

export function getPath(pathName: string, route: Route[]) {
  return path.join(
    process.cwd(),
    "puriffied",
    pathName + (pathName.startsWith("/public") ? "" : "index.html"),
  );
}
