import type { WebPage } from "@type/tag/tag";
import type {
  FromCompilation,
  FromComputer,
  FromHydration,
  FromLocal,
} from "./server";

export type PageFunction<T = void, U = void> = (
  pageFunctions: PageReceive<T, U>,
) => WebPage<false>;

export interface PageReceive<T = void, U = void> {
  fromLocal: FromLocal;
  fromComputer: FromComputer;
  fromCompilation: FromCompilation<T>;
  fromHydration: FromHydration<U>;
}
