import type { CompiledTag } from "@type/converter/compile";

interface HydratingSettings<T = object> extends CompiledTag {
  hydrateTarget: T;
}

function hydrate<T = object>({
  baseString,
  markers,
  hydrateTarget,
}: HydratingSettings<T>): string {
  let positionOffset = 0;

  for (const currentMarker of markers) {
    if (!currentMarker.positions) {
      throw Error("The positions should exist.");
    }

    const actualCurrentMarkerLength = currentMarker.hydrationId.length + 4;
    const currentReplacement =
      hydrateTarget[currentMarker.hydrationId as keyof T];

    let currentReplacementLength = 0;

    if (typeof currentReplacement === "string") {
      currentReplacementLength = currentReplacement.length;
    } else if (typeof currentReplacement === "number") {
      currentReplacementLength = currentReplacement.toString().length;
    } else {
      throw Error("All hydration value should be either string or number.");
    }

    for (const currentPosition of currentMarker.positions) {
      const actualCurrentPosition = currentPosition + positionOffset;
      const startPart = baseString.substring(0, actualCurrentPosition);
      const endPart = baseString.substring(
        actualCurrentPosition + actualCurrentMarkerLength,
      );

      positionOffset += currentReplacementLength - actualCurrentMarkerLength;

      baseString = startPart + currentReplacement + endPart;
    }
  }

  return baseString;
}

export default hydrate;
