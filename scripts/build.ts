import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";
import type { BuildConfig } from "bun";

export const defaultBuildingConfiguration: BuildConfig = {
  entrypoints: [],
  outdir: "./dist",
  splitting: false,
  sourcemap: "none",
  minify: true,
  target: "bun",
};

// remove the dist folder
await fs.rm(getFilePath("dist"), { recursive: true, force: true });

// compile the core puriffy
await Bun.build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("/src/core/index.ts")],
  target: "node",
  minify: {
    whitespace: true,
    syntax: true,
    identifiers: false,
  },
});
