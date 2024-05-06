import type { FromHydration } from "@type/index";

export function getFromHydration<T>(): FromHydration<T> {
  return {
    use(id) {
      return `#(${String(id)})#`;
    },
  };
}
