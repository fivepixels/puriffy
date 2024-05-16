import type { FolderStructure, Head, Profile } from "@type/index";
import type { Server } from "bun";

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
  fromComputer: FromComputer;
  fromMetadata: FromMetadata;
}

export interface OnHydrationReceive<T = void> {
  fromLocal: FromLocal;
  fromComputer: FromComputer;
  fromRequest: T extends object ? T : undefined;
}

export interface OnRequestReceive {
  fromLocal: FromLocal;
  fromComputer: FromComputer;
  fromServer: FromServer;
  fromRequest: FromRequest;
}

export type FromCompilation<T = void> = T;
export type FromHydration<T = void> = { use: (id: keyof T) => string };
export type FromRequest = Request;
export type FromMetadata = Head;
export type FromServer = Server;
export type LocalType = "db" | "docs";
export type FromLocal = {
  [K in LocalType]: {
    use: (title: string) => Promise<string>;
    getList: () => Promise<FolderStructure>;
  };
};

export type FromComputer = {
  cwd: string;
  time: Date;
};
