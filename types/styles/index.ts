import type { CSS_COLOUR } from "./colours";
import type { CSS_SIZES } from "./sizes";

export interface Style {
  layout?: {
    width?: CSS_SIZES;
    height?: CSS_SIZES;
    zindex?: number;
  };
  background?: {
    colour?: CSS_COLOUR;
  };
  text?: {
    colour?: CSS_COLOUR;
    size?: number;
  };
}
