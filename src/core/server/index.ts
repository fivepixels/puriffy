import { getPath } from "./getPath";

Bun.serve({
  port: process.env.PORT || 3000,
  fetch(request) {
    const url = new URL(request.url);
    const pathToHTML = getPath(url.pathname, []);

    // if the hydration is needed, then run the hydration function

    return new Response(Bun.file(pathToHTML));
  },
});
