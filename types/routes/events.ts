import type { FolderStructure, Head } from "@type/index";

export interface EventsReturn {
  OnCompilation: OnCompilationFunction;
  OnHydration: OnHydrationFunction;
  OnRequest: OnRequestFunction;
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
  fromRequest: T;
}

export interface OnRequestReceive {
  fromLocal: FromLocal;
  fromComputer: FromComputer;
  fromRequest: FromRequest;
}

export type FromCompilation<T> = T;
export type FromHydration<T> = {
  use: (id: keyof T) => string;
};

export type FromComputer = {
  cwd: string;
  time: Date;
};

export type LocalType = "db" | "docs";
export type FromLocal = {
  [K in LocalType]: {
    use: (title: string) => Promise<string>;
    getList: () => Promise<FolderStructure>;
  };
};

export type FromRequest = Request;
export type FromMetadata = Head;
