import fs from "node:fs";
import compile from "@src/compile";
import { getFromLocal } from "@src/utils/from/local";
import type { ServerReturn } from "@type/index";
import type { Server } from "bun";
import { getPageRenderingInfo } from "./getPageRenderingInfo";
import type { PageInfoJSON } from "./getPageRenderingInfo";
import hydrate from "./hydrator";

await compile();

const PageInfo = (await import(`${process.cwd()}/puriffied/info.json`))
  .default as PageInfoJSON;

const NotFoundPagePath = `${process.cwd()}/puriffied/pages/404`;
const ServerErrorPagePath = `${process.cwd()}/puriffied/pages/500`;

const NotFoundPage = Bun.file(
  `${process.cwd()}/puriffied/pages/404/index.html`,
);
const ServerErrorPage = Bun.file(
  `${process.cwd()}/puriffied/pages/500/index.html`,
);

const Header: (statusCode: number) => ResponseInit = (status) => {
  return {
    status,
    headers: {
      "Content-Type": "text/html",
      // "Content-Security-Policy": "script-src 'self'; object-src 'none';", // default-src 'self';
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "geolocation=(self), microphone=()",
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: 'W/"etag_value"',
      "Content-Encoding": "utf-8",
      "Transfer-Encoding": "chunked",
      Vary: "Accept-Encoding",
      "X-Robots-Tag": "index, follow",
      "Accept-CH": "DPR, Viewport-Width, Width",
      "Accept-CH-Lifetime": "86400",
      Server: "Bun/0.1",
      "X-Powered-By": "Bun/0.1",
      Date: new Date().toUTCString(),
    },
  };
};

Bun.serve({
  port: process.env.PORT || 3000,
  fetch: async (request: Request, server: Server) => {
    try {
      const urlRoutes = new URL(request.url).pathname;

      if (urlRoutes.startsWith("/public")) {
        const pagePath = `${process.cwd()}/puriffied${urlRoutes}`;
        const doesPageExist = fs.existsSync(pagePath);

        if (doesPageExist) {
          return new Response(Bun.file(pagePath), Header(200));
        }

        const notFoundEvents = (await import(
          `${NotFoundPagePath}/server.js`
        )) as ServerReturn;

        await notFoundEvents?.OnRequest({
          fromLocal: getFromLocal(),
          fromRequest: request,
          fromServer: server,
        });

        return new Response(NotFoundPage, Header(404));
      }

      const pageRenderingInfo = await getPageRenderingInfo(urlRoutes, PageInfo);

      if (pageRenderingInfo === 404) {
        const notFoundEvents = (await import(
          `${NotFoundPagePath}/server.js`
        )) as ServerReturn;

        await notFoundEvents?.OnRequest({
          fromLocal: getFromLocal(),
          fromRequest: request,
          fromServer: server,
        });

        return new Response(NotFoundPage, Header(404));
      }

      const pagePath = `${process.cwd()}/puriffied/pages${
        pageRenderingInfo.path
      }`;

      const pageEvents = (await import(
        `${pagePath}/server.js`
      )) as ServerReturn;

      const requestResult = await pageEvents?.OnRequest({
        fromLocal: getFromLocal(),
        fromRequest: request,
        fromServer: server,
        fromDynamicRoutes: pageRenderingInfo.dynamicRoutes,
      });

      if (
        pageRenderingInfo.method === "SSG" ||
        pageRenderingInfo.method === "ISR"
      ) {
        return new Response(Bun.file(`${pagePath}/index.html`), Header(200));
      }

      const resultFromHydration = await pageEvents.OnHydration({
        fromLocal: getFromLocal(),
        fromRequest: requestResult,
      });

      return new Response(
        hydrate(
          await Bun.file(`${pagePath}/index.html`).text(),
          resultFromHydration,
        ),
        Header(200),
      );
    } catch (error) {
      console.error(error);

      const ServerErrorEvents = (await import(
        `${ServerErrorPagePath}/server.js`
      )) as ServerReturn;

      await ServerErrorEvents?.OnRequest({
        fromLocal: getFromLocal(),
        fromRequest: request,
        fromServer: server,
      });

      return new Response(ServerErrorPage, Header(500));
    }
  },
});
