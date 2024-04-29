import type { Head } from "@type/tag";
import { compileTag } from "./compileTag";
import { getCommonJs } from "./getCommonJs";

export async function compileHead(head: Head): Promise<string> {
  // inject the common js here
  // const commonJs = getCommonJs();

  const compiledCommonJs = await getCommonJs();

  const baseString = compileTag({
    tag: "head",
    children: [
      {
        tag: "title",
        children: head.title,
      },
      {
        tag: "meta",
        name: "description",
        content: head.description,
      },
      {
        tag: "meta",
        name: "author",
        content: head.author,
      },
      {
        tag: "meta",
        name: "keywords",
        content: head.keywords.join(","),
      },
      {
        tag: "script",
        children: compiledCommonJs,
      },
    ],
  });

  return baseString;
}
