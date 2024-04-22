export interface CompiledTag {
  baseString: string;
  markers: Marker[];
}

export interface Marker {
  hydrationId: string;
  positions?: number[];
}
