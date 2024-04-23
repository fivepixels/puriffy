interface HydratingSettings<T = object> {
  baseString: string;
  hydrateTarget: T;
}

function hydrate<T extends object>({
  baseString,
  hydrateTarget,
}: HydratingSettings<T>): string {
  for (const currentHydrationId in hydrateTarget) {
    const currentHydrationValue = String(hydrateTarget[currentHydrationId]);

    baseString = baseString.replaceAll(
      `#(${currentHydrationId})#`,
      currentHydrationValue,
    );
  }

  return baseString;
}

export default hydrate;
