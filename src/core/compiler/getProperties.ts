import type { Tag } from "@type/tag";
import { getStyle } from "./getStyle";

export function getProperties(tag: Tag): string {
  let basePropertyString = "";
  for (const _currentProperty in tag) {
    const currentProperty = _currentProperty as keyof Tag;
    let currentPropertyValue = tag[currentProperty as keyof Tag];

    if (currentProperty === "tag" || currentProperty === "children") continue;

    if (currentProperty === "style") {
      currentPropertyValue = getStyle(currentPropertyValue as string);
    }

    basePropertyString += ` ${currentProperty}="${currentPropertyValue}"`;
  }

  return basePropertyString;
}
