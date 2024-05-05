import type { FromHydration } from "@type/routes/page";

function getFromHydration<T>(): FromHydration<T> {
  return {
    use(id) {
      return `#(${String(id)})#`;
    },
  };
}

export default getFromHydration;
