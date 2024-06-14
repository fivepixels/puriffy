import type { WebPage } from "@type/tag";
import type { FromCompilation, FromHydration, FromLocal } from "./server";

export type PageFunction<T = void, U = void> = (
  pageFunctions: PageReceive<T, U>,
) => WebPage;

export interface PageReceive<T = void, U = void> {
  fromLocal: FromLocal;
  fromCompilation: T extends void ? object : FromCompilation<T>;
  fromHydration: FromHydration<U>;
}
