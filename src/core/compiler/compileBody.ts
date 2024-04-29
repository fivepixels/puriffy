import type { Body } from "@type/tag";
import { compileTag } from "./compileTag";

export function compileBody(body: Body): string {
  const NavString = body.nav
    ? compileTag({
        tag: "nav",
        children: body.nav,
      })
    : "";

  const MainString = compileTag({
    tag: "main",
    children: body.main,
  });

  const FooterString = body.footer
    ? compileTag({
        tag: "footer",
        children: body.footer,
      })
    : "";

  return `<body>${NavString}${MainString}${FooterString}</body>`;
}
