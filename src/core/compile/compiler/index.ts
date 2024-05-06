import type { WebPage } from "@type/index";
import { compileBody } from "./body";
import { compileHead } from "./head";

async function compilePage(compilingPage: WebPage): Promise<string> {
  const HeadString = compileHead(compilingPage.head);
  const BodyString = await compileBody(compilingPage.body);

  return `<!DOCTYPE html><html lang="${compilingPage.head.lang}">${HeadString}${BodyString}</html>`;
}

export default compilePage;
