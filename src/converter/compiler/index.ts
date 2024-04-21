import type { Tag } from "@type/tag";
import type { CompiledTag, Markers } from "@type/converter/compile";

interface CompilingSettings {
  compilingTag: Tag;
  exisitingMarkers?: Markers[];
}

function compile({
  compilingTag,
  exisitingMarkers = [],
}: CompilingSettings): CompiledTag {
  const basePropertyString = getProperties(compilingTag);
  let baseChildrenString = "";

  if (compilingTag.children) {
    const isSimple =
      typeof compilingTag.children === "string" ||
      typeof compilingTag.children === "number";
    if (isSimple) {
      baseChildrenString += compilingTag.children.toString();
    }

    const areChildren = Array.isArray(compilingTag.children);
    if (areChildren) {
      for (const currentChild of compilingTag.children as Tag[]) {
        const compiledChildren = compile({
          compilingTag: currentChild,
          exisitingMarkers: exisitingMarkers,
        });
        baseChildrenString += compiledChildren.baseString;
        exisitingMarkers.concat(compiledChildren.markers);
      }
    }

    const isTag = Object.hasOwn(compilingTag.children as object, "tag");
    if (isTag) {
      const compiledChildren = compile({
        compilingTag: compilingTag.children as Tag,
        exisitingMarkers: exisitingMarkers,
      });
      baseChildrenString += compiledChildren.baseString;
      exisitingMarkers.concat(compiledChildren.markers);
    }

    const isHydrationId = Object.hasOwn(
      compilingTag.children as object,
      "hydrationId",
    );
    if (isHydrationId) {
      baseChildrenString += `#(${
        (compilingTag.children as Markers).hydrationId
      })#`;
      exisitingMarkers.push(compilingTag.children as Markers);
    }
  }

  return {
    baseString: `<${compilingTag.tag}${basePropertyString}>${baseChildrenString}</${compilingTag.tag}>`,
    markers: exisitingMarkers,
  };
}

function getProperties(tag: Tag): string {
  let basePropertyString = "";
  for (const _currentProperty in tag) {
    const currentProperty = _currentProperty as keyof Tag;
    const currentPropertyValue = tag[currentProperty as keyof Tag];

    if (currentProperty === "tag" || currentProperty === "children") continue;

    if (currentProperty === "styles") {
      // TODO: Build a funciton only for this

      continue;
    }

    basePropertyString += ` ${currentProperty}="${currentPropertyValue}"`;
  }

  return basePropertyString;
}

export default compile;
