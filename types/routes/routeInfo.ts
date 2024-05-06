import type { RenderingMethod } from "./profile";

export interface RouteInfo {
  index: RenderingMethod;
  [K: string]: RouteInfo | string;
}
