import type { Marker } from "@type/converter/compile";

export function getMarkers(
  baseString: string,
  hydrationIds: string[],
): Marker[] {
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
