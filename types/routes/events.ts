export type eventFunction<T, U> = (eventOption: T) => U | Promise<U>;

export interface OnCompilationRecieve {
  at: Date;
}

export interface OnHydrationReceive {
  at: Date;
  requestBody: Request;
}

export interface EventReturn<T = object> {
  OnCompilation: eventFunction<OnCompilationRecieve, T>;
  OnHydration: eventFunction<OnHydrationReceive, T>;
}
