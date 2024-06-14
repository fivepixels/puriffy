import type { ObjectTag } from "@type/index";
import { getStyle } from "./getStyle";

export function getProperties(tag: ObjectTag): string {
  let basePropertyString = "";
  for (const _currentProperty in tag) {
    const currentProperty = _currentProperty as keyof ObjectTag;
    let currentPropertyValue = tag[currentProperty as keyof ObjectTag];

    if (!currentPropertyValue) continue;

    if (currentProperty === "tag" || currentProperty === "children") continue;

    if (
      currentProperty === "style" &&
      typeof currentPropertyValue !== "string" &&
      typeof currentPropertyValue !== "number"
    ) {
      currentPropertyValue = getStyle(currentPropertyValue);
    }

    basePropertyString += ` ${currentProperty}="${currentPropertyValue}"`;
  }

  return basePropertyString;
}
