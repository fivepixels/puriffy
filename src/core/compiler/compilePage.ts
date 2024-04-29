import type { Page } from "@type/tag";
import { compileBody } from "./compileBody";
import { compileHead } from "./compileHead";

async function compilePage(compilingPage: Page): Promise<string> {
  const HeadString = await compileHead(compilingPage.head);
  const BodyString = compileBody(compilingPage.body);

  return `<!DOCTYPE html><html lang="${compilingPage.head.lang}">${HeadString}${BodyString}</html>`;
}

export default compilePage;
