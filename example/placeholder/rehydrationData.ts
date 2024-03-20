type ElementType<T extends any[]> = T extends (infer U)[] ? U : never;
export type FullyStaticPage<T> = (
  serverProps: FullyStaticPageReceive<T>
) => void;
export type HydratablePage<T> = (serverProps: HydratablePageReceive<T>) => void;
export type ServerPage<T, U> = (serverProps: ServerPageReceive<T, U>) => void;

export interface FullyStaticPageReceive<T> {
  fromClient: FromClient;
  fromRouteGeneration: FromRouteGeneration;
  fromCompilation: FromServerProcess<T>;
}

export interface HydratablePageReceive<T> {
  fromClient: FromClient;
  fromHydration: FromServerProcess<T>;
}

export interface ServerPageReceive<T, U> {
  fromClient: FromClient;
  fromCompilation: FromServerProcess<T>;
  fromHydration: FromServerProcess<U>;
}

type FromRouteGeneration = {
  id: string;
  content: string;
};

type FromClient = {
  route: string;
  // time: string;
  // location: string;
  // browser: string;
};

type AllowedType = Array<any> | string;
type FromServerProcess<T> = {
  [K in keyof T]: T[K] extends AllowedType
    ? {
        use: useFromServerProcess;
        insert: insertFromServerProcess;
        iterate: T[K] extends Array<any>
          ? iterateFromServerProcess<T[K]>
          : undefined;
      }
    : FromServerProcess<T[K]>;
};

type useFromServerProcess = () => string;
type insertFromServerProcess = (baseText: string) => string;
type iterateFromServerProcess<T extends Array<T>> = (
  baseIterationFunction: (
    currentData: FromServerProcess<ElementType<T>>,
    index: number
  ) => object[]
) => string;
