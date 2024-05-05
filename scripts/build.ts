import type { BuildConfig } from "bun";
import fs from "node:fs/promises";
import { getFilePath } from "@src/utils/getFilePath";
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
  plugins: [dts({})],
  minify: {
    whitespace: true,
    syntax: true,
    identifiers: false,
  },
  target: "node",
});
