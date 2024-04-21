export interface CompiledTag {
  baseString: string;
  markers: Markers[];
}

export interface Markers {
  hydrationId: string;
  position?: number;
}
