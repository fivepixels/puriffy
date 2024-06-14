import fs from "node:fs/promises";
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
await fs.rm(`${process.cwd()}/dist`, { recursive: true, force: true });

// compile the core puriffy
await Bun.build({
  ...defaultBuildingConfiguration,
  entrypoints: [`${process.cwd()}/src/index.ts`],
  target: "node",
  minify: {
    whitespace: true,
    syntax: true,
    identifiers: false,
  },
});

Bun.spawn(["bunx", "tsc", "--outdir", `${process.cwd()}/dist`], {
  stdout: "inherit",
  stderr: "inherit",
});
