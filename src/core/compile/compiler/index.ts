import type { PageReturn } from "@type/routes/page";
import { compileBody } from "./body";
import { compileHead } from "./head";

async function compilePage(compilingPage: PageReturn): Promise<string> {
  const HeadString = compileHead(compilingPage.head);
  const BodyString = await compileBody(compilingPage.body);

  return `<!DOCTYPE html><html lang="${compilingPage.head.lang}">${HeadString}${BodyString}</html>`;
}

export default compilePage;
