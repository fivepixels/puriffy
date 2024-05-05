import type { Head } from "@type/tag/tag";

export interface EventsReturn {
  OnCompilation: OnCompilationFunction;
  OnHydration: OnHydrationFunction;
  OnRequest: OnRequestFunction;
}

export type OnCompilationFunction<T = void> = (
  compilationOption: OnCompilationRecieve,
) => Promise<T> | T;

export type OnHydrationFunction<T = void> = (
  hydrationOption: OnHydrationReceive,
) => Promise<T> | T;

export type OnRequestFunction<T = void> = (
  requestOption: OnRequestReceive,
) => Promise<T> | T;

export interface OnCompilationRecieve {
  fromComputer: FromComputer;
  fromLocal: FromLocal;
  fromMetadata: FromMetadata;
}

export interface OnHydrationReceive {
  fromComputer: FromComputer;
  fromLocal: FromLocal;
}

export interface OnRequestReceive {
  fromComputer: FromComputer;
  fromLocal: FromLocal;
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
  };
};

export type FromRequest = Request;
export type FromMetadata = Head;
