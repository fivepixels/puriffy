import type { Head } from "@type/tag/tag";

export interface EventsReturn {
  OnCompilation: OnCompilationFunction;
  OnHydration: OnHydrationFunction;
  OnRequest: OnRequestFunction;
}

export type OnCompilationFunction<T extends any = void> = (
  compilationOption: OnCompilationRecieve,
) => Promise<T> | T;

export type OnHydrationFunction<T extends any = void> = (
  hydrationOption: OnHydrationReceive,
) => Promise<T> | T;

export type OnRequestFunction<T extends any = void> = (
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
