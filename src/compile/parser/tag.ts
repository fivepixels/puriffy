import type { ObjectTag } from "@type/tag";
import { getProperties } from "./utils/getProperties";
import { getTag } from "./utils/getTag";

export function parseTag(tag: ObjectTag): string {
  let baseChildrenString = "";
  const basePropertyString = getProperties(tag);

  if (tag.children) {
    const childrenType = typeof tag.children;
    const isSimple = childrenType === "string" || childrenType === "number";

    if (isSimple) {
      baseChildrenString += tag.children.toString();
    }

    const areChildren = Array.isArray(tag.children);
    if (areChildren) {
      let childrensString = "";

      for (const currentChild of tag.children as ObjectTag[]) {
        const compiledChildren = parseTag(currentChild);
        childrensString += compiledChildren;
      }

      baseChildrenString += childrensString;
    }

    const isChild =
      Object.hasOwn(tag.children as ObjectTag, "tag") && !areChildren;
    if (isChild) {
      const compiledChildren = parseTag(tag.children as ObjectTag);
      baseChildrenString += compiledChildren;
    }
  }

  return getTag(tag.tag, basePropertyString, baseChildrenString);
}
