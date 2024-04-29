import type { Tag } from "@type/tag";
import { getProperties } from "./getProperties";
import { getTag } from "./getTag";

export function compileTag(tag: Tag): string {
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

      for (const currentChild of tag.children as Tag[]) {
        const compiledChildren = compileTag(currentChild);
        childrensString += compiledChildren;
      }

      baseChildrenString += childrensString;
    }

    const isChild = Object.hasOwn(tag.children as Tag, "tag") && !areChildren;
    if (isChild) {
      const compiledChildren = compileTag(tag.children as Tag);
      baseChildrenString += compiledChildren;
    }
  }

  return getTag(tag.tag, basePropertyString, baseChildrenString);
}
