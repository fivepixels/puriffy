import type { WebPage } from "@type/tag/tag";
import type { FromComputer, FromLocal } from "./events";

export type PageFunction<T, U> = (
  pageFunctions: PageReceive<T, U>,
) => WebPage<false>;

export interface PageReceive<T extends any = void, U extends any = void> {
  fromComputer: FromComputer;
  fromCompilation: FromCompilation<T>;
  fromHydration: FromHydration<U>;
  fromLocal: FromLocal;
}

export type FromCompilation<T> = T;
export type FromHydration<T> = {
  use: (id: keyof T) => string;
};
