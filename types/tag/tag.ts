export type AllTag = keyof HTMLElementTagNameMap;
export type DirectlyConvertibleTypes = string | number;
export type DirectlyInconvertibleTypes = Tag | Tag[];
export type BaseTagChildren =
  | DirectlyConvertibleTypes
  | DirectlyInconvertibleTypes;

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
  type?: string;
}

export interface Head {
  title: string;
  lang: string;
  description: string;
  author: string;
  keywords: string[];
}

export interface Body {
  nav?: Tag[];
  main: Tag[];
  footer?: Tag[];
}

export interface WebPage<T extends boolean = true> {
  head: T extends true ? Head : Partial<Head>;
  body: Body;
}
