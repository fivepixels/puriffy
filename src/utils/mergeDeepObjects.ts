// biome-ignore lint/suspicious/noExplicitAny: those two parameters have too complex shapes
function deepMerge<T>(target: any, source: any): T {
  const output = Object.assign({}, target);

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        typeof source[key] === "object" &&
        source[key] !== null &&
        target[key]
      ) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }

  return output as T;
}

export default deepMerge;
