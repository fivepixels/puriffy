import type { Head } from "@type/tag";

export type PageRenderingMethod = "SSG" | "ISR" | "SSR";

export interface HydrationOptions {
  every: number;
  startAt: Date;
  id: string;
}

export interface Profile {
  method: PageRenderingMethod;
  hydrationOptions?: HydrationOptions;
  metadata?: Partial<Head>;
  style?: object;
}

export interface MainProfile {
  metadata: Head;
  hydrationOptions?: HydrationOptions;
  style: object;
}
