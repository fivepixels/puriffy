import type { WebPage } from "@type/index";
import { parseBody } from "./body";
import { parseHead } from "./head";

async function parsePage(compilingPage: WebPage): Promise<string> {
  const HeadString = parseHead(compilingPage.head);
  const BodyString = await parseBody(compilingPage.body);

  return `<!DOCTYPE html><html lang="${compilingPage.head.lang}">${HeadString}${BodyString}</html>`;
}

export default parsePage;
