export type DirectlyConvertibleTypes = string | number;
export type DirectlyInconvertibleTypes = Tag | Tag[];
export type BaseTagChildren =
  | DirectlyConvertibleTypes
  | DirectlyInconvertibleTypes;

export type AllTag = keyof HTMLElementTagNameMap;
export type ScriptType = "src" | "action";

export interface Tag {
  tag: AllTag;
  id?: string;
  style?: string;
  children?: BaseTagChildren;
  href?: string;
  src?: string;
  alt?: string;
  target?: string;
  rel?: string;
  property?: string;
  name?: string;
  content?: string;
}

export interface Script {
  type: ScriptType;
  content: string;
}

export interface Head {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  lang: string;
}

export interface Body {
  nav?: Tag[];
  main: Tag[];
  footer?: Tag[];
}

export interface Page {
  head: Head;
  body: Body;
}
