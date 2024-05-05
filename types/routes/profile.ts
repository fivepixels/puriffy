import type { Head } from "@type/tag/tag";

export type RenderingMethod = "SSG" | "ISR" | "SSR";

export interface HydrationOptions {
  every: number;
  startAt: Date;
  id: string;
}

export interface Profile {
  method: RenderingMethod;
  hydrationOptions?: HydrationOptions;
  metadata?: Partial<Head>;
}

export interface MainProfile {
  metadata: Head;
  hydrationOptions?: HydrationOptions;
}
