import type { Head } from "@type/index";
import { parseTag } from "./tag";

export function parseHead(head: Head): string {
  const baseString = parseTag({
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
        content:
          typeof head.keywords === "string"
            ? head.keywords
            : head.keywords.join(","),
      },
    ],
  });

  return baseString;
}
