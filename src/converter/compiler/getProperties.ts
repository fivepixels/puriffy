import type { Tag } from "@type/tag";

export function getProperties(tag: Tag): string {
  let basePropertyString = "";
  for (const _currentProperty in tag) {
    const currentProperty = _currentProperty as keyof Tag;
    const currentPropertyValue = tag[currentProperty as keyof Tag];

    if (
      currentProperty === "tag" ||
      currentProperty === "children" ||
      currentProperty === "hydrationId"
    )
      continue;

    if (currentProperty === "styles") {
      // TODO: Build a funciton only for this

      continue;
    }

    basePropertyString += ` ${currentProperty}="${currentPropertyValue}"`;
  }

  return basePropertyString;
}
