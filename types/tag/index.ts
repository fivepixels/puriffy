import type { Markers } from "@type/converter/compile";
import type { Style } from "../styles";
import type { AllTags } from "./names";

export interface WholePage {
  head: {
    title: string;
  };
  main: Tag[];
}

export type DirectlyConvertibleTypes = string | number;
export type DirectlyInconvertibleTypes = Tag | Tag[];
export type BaseTagChildren =
  | DirectlyConvertibleTypes
  | DirectlyInconvertibleTypes
  | Markers;

export interface BaseTag {
  tag: AllTags;
  id?: string;
  class?: string;
  styles?: Style;
  children?: BaseTagChildren;
}

export type AnchorTagTarget = "current_tab" | "new_tab";
export interface AnchorTag extends BaseTag {
  href?: string;
  target?: AnchorTagTarget;
}

export interface TextArea extends BaseTag {
  name?: string;
}

export type Tag = BaseTag | AnchorTag | TextArea;
