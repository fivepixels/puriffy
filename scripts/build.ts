import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";
import type { BuildConfig } from "bun";
import dts from "bun-plugin-dts";

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

// compile the type file
await Bun.build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("/types/index.ts")],
  plugins: [dts({})],
});
