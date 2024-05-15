import { getFromComputer } from "@src/utils/from/computer";
import { getFromLocal } from "@src/utils/from/local";
import type { Server } from "bun";
import hydrate from "./hydrator";
import { getPageRenderingInfo } from "./utils/getPageRenderingInfo";
import type { PageInfoJSON } from "./utils/getPageRenderingInfo";
import type { ServerReturn } from "@type/index";
import { getFilePath } from "@src/utils/getFilePath";

const PageInfo = (await import(getFilePath("/puriffied/info.json")))
  .default as PageInfoJSON;

Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(request: Request, server: Server) {
    const urlRoutes = new URL(request.url).pathname;
    const pageRenderingInfo = await getPageRenderingInfo(urlRoutes, PageInfo);
    const pathToPage = getFilePath(pageRenderingInfo.path);

    const serverInfo = (await import(
      `${pathToPage}/server.js`
    )) as ServerReturn;

    if (
      pageRenderingInfo.method === "SSG" ||
      pageRenderingInfo.method === "ISR"
    ) {
      if (serverInfo.OnRequest) {
        await serverInfo?.OnRequest({
          fromLocal: getFromLocal(),
          fromComputer: getFromComputer(),
          fromRequest: request,
          fromServer: server,
        });
      }

      return new Response(Bun.file(`${pathToPage}/index.html`));
    }

    if (pageRenderingInfo.method === "SSR") {
      const requestResult = await serverInfo.OnRequest({
        fromLocal: getFromLocal(),
        fromComputer: getFromComputer(),
        fromRequest: request,
        fromServer: server,
      });

      const resultFromHydration = await serverInfo.OnHydration({
        fromLocal: getFromLocal(),
        fromComputer: getFromComputer(),
        fromRequest: requestResult,
      });

      const page = await Bun.file(`${pathToPage}/index.html`).text();

      return new Response(hydrate(page, resultFromHydration), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    return new Response("Not found");
  },
});
