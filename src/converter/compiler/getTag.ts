export function getTag(
  tagName: string,
  tagProperties: string,
  tagChildren: string,
): string {
  return `<${tagName}${tagProperties}>${tagChildren}</${tagName}>`;
}
