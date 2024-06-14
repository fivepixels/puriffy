import type { Profile } from "@type/page";
import type { Server } from "bun";
import type { Head } from "./tag";

export interface ServerReturn {
  OnCompilation: OnCompilationFunction<object>;
  OnHydration: OnHydrationFunction<object, object>;
  OnRequest: OnRequestFunction<object>;
  default: Profile;
}

export type OnCompilationFunction<T = void> = (
  compilationOption: OnCompilationRecieve,
) => Promise<T> | T;

export type OnHydrationFunction<T = void, U = void> = (
  hydrationOption: OnHydrationReceive<U>,
) => Promise<T> | T;

export type OnRequestFunction<T = void> = (
  requestOption: OnRequestReceive,
) => Promise<T> | T;

export interface OnCompilationRecieve {
  fromLocal: FromLocal;
  fromMetadata: FromMetadata;
}

export interface OnHydrationReceive<T = void> {
  fromLocal: FromLocal;
  fromRequest: T extends object ? T : undefined;
}

export interface OnRequestReceive {
  fromLocal: FromLocal;
  fromServer: FromServer;
  fromRequest: FromRequest;
  fromDynamicRoutes?: FromDynamicRoutes;
}

export type FromCompilation<T = void> = T;
export type FromHydration<T = void> = { use: (id: keyof T) => string };
export type FromRequest = Request;
export type FromMetadata = Head;
export type FromServer = Server;
export type FromDynamicRoutes = { [K in string]: string };
export type LocalType = "db" | "docs";
export type FromLocal = {
  [K in LocalType]: {
    getFileText: (id: string) => Promise<string | false>;
    checkIfExists: (id: string) => Promise<boolean | false>;
    getFolders: (id?: string) => string[] | false;
    getFiles: (id?: string) => string[] | false;
  };
};
