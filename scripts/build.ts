import { build } from "bun";
import fs from "node:fs/promises";
import path from "node:path";
import type { BuildConfig } from "bun";
import dts from "bun-plugin-dts";

const defaultBuildingConfiguration: BuildConfig = {
  entrypoints: [],
  outdir: "./dist",
  minify: {
    whitespace: true,
    syntax: true,
    identifiers: false,
  },
  splitting: false,
  sourcemap: "inline",
  format: "esm",
  target: "bun",
};

await fs.rm(path.join(process.cwd(), "dist"), { recursive: true, force: true });

// compile the core puriffy
await build({
  ...defaultBuildingConfiguration,
  entrypoints: [path.join(process.cwd(), "src", "index.ts")],
  plugins: [
    dts({
      output: {
        sortNodes: true,
        noBanner: false,
      },
    }),
  ],
});

// compile the server typescript file
await build({
  ...defaultBuildingConfiguration,
  entrypoints: [path.join(process.cwd(), "src/core/server/index.ts")],
  naming: "server.js",
});

await build({
  ...defaultBuildingConfiguration,
  entrypoints: [path.join(process.cwd(), "src/core/client/index.ts")],
  naming: "client.js",
});

// compile the cli tools for puriffy
await build({
  ...defaultBuildingConfiguration,
  entrypoints: [path.join(process.cwd(), "src/cli/index.ts")],
  naming: "cli.js",
  target: "node",
});
