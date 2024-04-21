export type CSS_PIXEL = `${number}px`;
export type CSS_POINT = `${number}pt`;
export type CSS_PICAS = `${number}pc`;
export type CSS_CM = `${number}cm`;
export type CSS_MM = `${number}mm`;
export type CSS_IN = `${number}in`;

export type CSS_EM = `${number}em`;
export type CSS_REM = `${number}rem`;
export type CSS_EX = `${number}ex`;
export type CSS_CH = `${number}ch`;

export type CSS_VIEWPORT_WIDTH = `${number}vw`;
export type CSS_VIEWPORT_HEIGHT = `${number}vh`;

export type CSS_PERCENTAGE = `${number}vmax`;

export type CSS_ABSOLUTE_SIZES =
  | CSS_PIXEL
  | CSS_POINT
  | CSS_PICAS
  | CSS_CM
  | CSS_IN;

export type CSS_RELATIVE_SIZES =
  | CSS_EM
  | CSS_REM
  | CSS_EX
  | CSS_CH
  | CSS_VIEWPORT_WIDTH
  | CSS_VIEWPORT_HEIGHT;

export type CSS_SIZES = CSS_ABSOLUTE_SIZES | CSS_RELATIVE_SIZES;
