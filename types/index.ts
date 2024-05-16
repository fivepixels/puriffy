import type { PageFunction, PageReceive } from "./routes/page";
import type { MainProfile, Profile, RenderingMethod } from "./routes/profile";
import type { RouteInfo } from "./routes/routeInfo";
import type {
  FromCompilation,
  FromComputer,
  FromHydration,
  FromLocal,
  FromMetadata,
  FromRequest,
  FromServer,
  LocalType,
  OnCompilationFunction,
  OnCompilationRecieve,
  OnHydrationFunction,
  OnHydrationReceive,
  OnRequestFunction,
  OnRequestReceive,
  ServerReturn,
} from "./routes/server";
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

export type { ServerReturn };
export type { LocalType };

export type {
  FromCompilation,
  FromHydration,
  FromServer,
  FromLocal,
  FromComputer,
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

interface FolderStructure {
  folderName: string;
  files: string[];
  folders: string[];
}

export type { FolderStructure };
export type { RouteInfo };
