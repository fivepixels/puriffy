import type { Head } from "./page";

export type RenderingMethod = "SSG" | "ISR" | "SSR";

export interface HydrationOptions {
  every: number;
  startAt: Date;
  id: string;
}

export interface ProfileReturn {
  method: RenderingMethod;
  hydrationOptions: HydrationOptions;
  metadata: Head;
}

export type Profile = Partial<ProfileReturn>;
