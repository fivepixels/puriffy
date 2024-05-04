export type eventFunction<T> = (eventOption: T) => object | Promise<object>;

export interface OnCompilationRecieve {
  at: Date;
}

export interface OnHydrationReceive {
  at: Date;
}

export interface OnRequestReceive {
  at: Date;
  requestBody: Request;
}

export interface EventReturn {
  OnCompilation?: eventFunction<OnCompilationRecieve>;
  OnHydration?: eventFunction<OnHydrationReceive>;
  OnRequest?: eventFunction<OnRequestReceive>;
}
