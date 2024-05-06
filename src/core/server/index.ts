import { getFromComputer } from "@src/utils/from/computer";
import { getFromLocal } from "@src/utils/from/local";
import type { EventsReturn } from "@type/index";
import hydrate from "./hydrator";
import { getPageInfo } from "./utils/getPagePath";
import type { Server } from "bun";

Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(request: Request, server: Server) {
    const urlRoutes = new URL(request.url).pathname
      .split("/")
      .filter((part) => part !== "");

    const pageInfo = getPageInfo(urlRoutes, {
      index: "SSG",
      blogs: {
        index: "SSR",
      },
    });

    const events = (await import(`${pageInfo.path}/events.js`)) as EventsReturn;

    if (pageInfo.method === "SSG" || pageInfo.method === "ISR") {
      await events.OnRequest({
        fromLocal: getFromLocal(),
        fromComputer: getFromComputer(),
        fromRequest: request,
        fromServer: server,
      });

      return new Response(Bun.file(`${pageInfo.path}/index.html`));
    }

    if (pageInfo.method === "SSR") {
      const resultFromRequest = await events.OnRequest({
        fromLocal: getFromLocal(),
        fromComputer: getFromComputer(),
        fromRequest: request,
        fromServer: server,
      });

      const resultFromHydration = await events.OnHydration({
        fromLocal: getFromLocal(),
        fromComputer: getFromComputer(),
        fromRequest: resultFromRequest,
      });

      const page = await Bun.file(`${pageInfo.path}/index.html`).text();

      return new Response(hydrate(page, resultFromHydration), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    return new Response("Not found");
  },
});
