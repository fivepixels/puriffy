import type { Tag } from "@type/tag";
import type { CompiledTag, Marker } from "@type/converter/compile";

interface CompilingSettings {
  compilingTag: Tag;
  hydrationIds?: string[];
}

function compile({
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

function getProperties(tag: Tag): string {
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

function getChildren(tag: Tag): string {
  const basePropertyString = getProperties(tag);
  let baseChildrenString = "";

  if (tag.children) {
    const childrenType = typeof tag.children;
    const isSimple = childrenType === "string" || childrenType === "number";

    if (isSimple) {
      baseChildrenString += tag.children.toString();

      return generateTag(tag.tag, basePropertyString, baseChildrenString);
    }

    const areChildren = Array.isArray(tag.children);
    if (areChildren) {
      let childrensString = "";

      for (const currentChild of tag.children as Tag[]) {
        const compiledChildren = compile({
          compilingTag: currentChild,
        });
        childrensString += compiledChildren.baseString;
      }

      baseChildrenString += childrensString;

      return generateTag(tag.tag, basePropertyString, baseChildrenString);
    }

    const isChild = Object.hasOwn(tag.children as Tag, "tag") && !areChildren;
    if (isChild) {
      const compiledChildren = compile({
        compilingTag: tag.children as Tag,
      });

      baseChildrenString += compiledChildren.baseString;

      return generateTag(tag.tag, basePropertyString, baseChildrenString);
    }
  }

  return generateTag(tag.tag, basePropertyString, baseChildrenString);
}

function generateTag(
  tagName: string,
  tagProperties: string,
  tagChildren: string,
): string {
  return `<${tagName}${tagProperties}>${tagChildren}</${tagName}>`;
}

function getMarkers(baseString: string, hydrationIds: string[]): Marker[] {
  const markers: Marker[] = [];

  for (const currentHydrationId of hydrationIds) {
    const positions: number[] = [];

    let startIndex = 0;
    while (startIndex < baseString.length) {
      const index = baseString.indexOf(`#(${currentHydrationId})#`, startIndex);
      if (index !== -1) {
        positions.push(index);
        startIndex = index + currentHydrationId.length;
      } else {
        break;
      }
    }

    markers.push({
      hydrationId: currentHydrationId,
      positions,
    });
  }

  return markers;
}

export default compile;
