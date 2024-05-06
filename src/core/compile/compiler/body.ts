import type { Body } from "@type/index";
import { compileTag } from "./tag";
import { getCommonJs } from "./utils/getCommonJs";

export async function compileBody(body: Body): Promise<string> {
  const compiledCommonJs = await getCommonJs();

  const commonJsString = compileTag({
    tag: "script",
    children: compiledCommonJs.trimEnd(),
  });

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

  return `<body>${NavString}${MainString}${FooterString}${commonJsString}<script>console.log(interaction);interaction.test()</script></body>`;
}
