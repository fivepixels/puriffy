import type { Head } from "@type/tag";
import { compileTag } from "./tag";

export function compileHead(head: Head): string {
  const baseString = compileTag({
    tag: "head",
    children: [
      {
        tag: "link",
        rel: "icon",
        href: "data:;base64,iVBORw0KGgo=",
      },
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
    ],
  });

  return baseString;
}
