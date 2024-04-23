import type { Tag } from "@type/tag";
import { getProperties } from "./getProperties";
import { getTag } from "./getTag";
import compile from "./index";

export function getChildren(tag: Tag): string {
  const basePropertyString = getProperties(tag);
  let baseChildrenString = "";

  if (tag.children) {
    const childrenType = typeof tag.children;
    const isSimple = childrenType === "string" || childrenType === "number";

    if (isSimple) {
      baseChildrenString += tag.children.toString();

      return getTag(tag.tag, basePropertyString, baseChildrenString);
    }

    const areChildren = Array.isArray(tag.children);
    if (areChildren) {
      let childrensString = "";

      for (const currentChild of tag.children as Tag[]) {
        const compiledChildren = compile(currentChild);
        childrensString += compiledChildren;
      }

      baseChildrenString += childrensString;
      return getTag(tag.tag, basePropertyString, baseChildrenString);
    }

    const isChild = Object.hasOwn(tag.children as Tag, "tag") && !areChildren;
    if (isChild) {
      const compiledChildren = compile(tag.children as Tag);
      baseChildrenString += compiledChildren;
      return getTag(tag.tag, basePropertyString, baseChildrenString);
    }
  }

  return getTag(tag.tag, basePropertyString, baseChildrenString);
}
