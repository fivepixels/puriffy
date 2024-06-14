import type { AllTag } from "@type/index";

export function getTag(
  tagName: AllTag,
  tagProperties: string,
  tagChildren: string,
): string {
  const closedTags: AllTag[] = ["meta", "link"];
  const isClosed = closedTags.includes(tagName);

  return `<${tagName}${tagProperties}${isClosed ? "/>" : ">"}${tagChildren}${
    isClosed ? "" : `</${tagName}>`
  }`;
}
