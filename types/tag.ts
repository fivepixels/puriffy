export type AllTag = keyof HTMLElementTagNameMap;
export type DirectlyConvertibleTypes = string | number;
export type DirectlyInconvertibleTypes = ObjectTag | ObjectTag[];
export type BaseTagChildren =
  | DirectlyConvertibleTypes
  | DirectlyInconvertibleTypes;

export interface ObjectTag {
  tag: AllTag;
  id?: string;
  style?: Partial<CSSStyleDeclaration>;
  children?: BaseTagChildren;
  href?: string;
  src?: string;
  alt?: string;
  target?: string;
  rel?: string;
  property?: string;
  name?: string;
  content?: string;
  type?: string;
}

export interface Head {
  lang: string;
  title: string;
  description: string;
  keywords: string | string[];
  author: string;
}

export interface Body {
  nav?: ObjectTag[];
  main: ObjectTag[];
  footer?: ObjectTag[];
}

export interface WebPage {
  head: Head;
  body: Body;
}
