import type { Body } from "@type/index";
import { parseTag } from "./tag";
import { getCommonJs } from "./utils/getCommonJs";

export async function parseBody(body: Body): Promise<string> {
  const compiledCommonJs = await getCommonJs();

  const commonJsString = parseTag({
    tag: "script",
    children: compiledCommonJs.trimEnd(),
  });

  const NavString = body.nav
    ? parseTag({
        tag: "nav",
        children: body.nav,
      })
    : "";

  const MainString = parseTag({
    tag: "main",
    children: body.main,
  });

  const FooterString = body.footer
    ? parseTag({
        tag: "footer",
        children: body.footer,
      })
    : "";

  return `<body>${NavString}${MainString}${FooterString}${commonJsString}</body>`;
}
