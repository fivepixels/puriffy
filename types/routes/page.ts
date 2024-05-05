import type { WebPage } from "@type/tag/tag";
import type {
  FromCompilation,
  FromComputer,
  FromHydration,
  FromLocal,
} from "./events";

export type PageFunction<T, U> = (
  pageFunctions: PageReceive<T, U>,
) => WebPage<false>;

export interface PageReceive<T = void, U = void> {
  fromComputer: FromComputer;
  fromCompilation: FromCompilation<T>;
  fromHydration: FromHydration<U>;
  fromLocal: FromLocal;
}
