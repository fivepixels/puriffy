import type { CompiledTag } from "@type/converter/compile";
import type { Tag } from "@type/tag";
import { getChildren } from "./getChildren";
import { getMarkers } from "./getMarkers";

interface CompilingSettings {
  compilingTag: Tag;
  hydrationIds?: string[];
}

export default function compile({
  compilingTag,
  hydrationIds = [],
}: CompilingSettings): CompiledTag {
  const baseString = getChildren(compilingTag);

  if (hydrationIds.length === 0) {
    return {
      baseString,
      markers: [],
    };
  }

  const markers = getMarkers(baseString, hydrationIds);

  return {
    baseString,
    markers,
  };
}
