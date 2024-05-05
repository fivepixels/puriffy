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

export interface PageReceive<T = void, U = void> {
  fromCompilation: T extends object ? Compilation<T> : undefined;
  fromHydration?: Hydration<U>;
}

export interface PageReturn {
  head: Head;
  body: Body;
}

export type AllowedHydrationTypes = string | number;
export type Compilation<T> = T;
export type Hydration<T> = {
  use: (id: keyof T) => string;
};

export type Page<T, U> = (pageFunctions: PageReceive<T, U>) => PageReturn;
