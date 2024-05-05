import type {
  EventsReturn,
  FromCompilation,
  FromComputer,
  FromHydration,
  FromLocal,
  FromMetadata,
  FromRequest,
  OnCompilationFunction,
  OnCompilationRecieve,
  OnHydrationFunction,
  OnHydrationReceive,
  OnRequestFunction,
  OnRequestReceive,
} from "./routes/events";
import type { PageFunction, PageReceive } from "./routes/page";
import type { MainProfile, Profile, RenderingMethod } from "./routes/profile";
import type {
  AllTag,
  BaseTagChildren,
  Body,
  DirectlyConvertibleTypes,
  DirectlyInconvertibleTypes,
  Head,
  Tag,
  WebPage,
} from "./tag/tag";

export type { MainProfile, Profile, RenderingMethod };
export type { PageFunction, PageReceive };

export type { EventsReturn };
export type {
  FromCompilation,
  FromHydration,
  FromComputer,
  FromLocal,
  FromRequest,
  FromMetadata,
};
export type {
  OnCompilationFunction,
  OnHydrationFunction,
  OnRequestFunction,
  OnCompilationRecieve,
  OnHydrationReceive,
  OnRequestReceive,
};

export type {
  WebPage,
  Body,
  Head,
  Tag,
  BaseTagChildren,
  DirectlyConvertibleTypes,
  DirectlyInconvertibleTypes,
  AllTag,
};
