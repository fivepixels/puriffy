import { build } from "bun";
import fs from "node:fs/promises";
import type { BuildConfig } from "bun";
import type { Page } from "@type/tag";
import compilePage from "@src/core/compiler/compilePage";
import { getFilePath } from "@src/utils/getFilePath";

export const defaultBuildingConfiguration: BuildConfig = {
  entrypoints: [],
  outdir: "./dist",
  splitting: false,
  sourcemap: "inline",
  format: "esm",
  target: "bun",
  minify: {
    whitespace: true,
    syntax: true,
    identifiers: false,
  },
};

// remove the dist folder
await fs.rm(getFilePath("dist"), { recursive: true, force: true });

// compile the core puriffy
await build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("/src/index.ts")],
});

// compile the server typescript file
await build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("/src/core/server/index.ts")],
  naming: "server.js",
});

// compile the client typescript file
await build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("/src/core/client/index.ts")],
  naming: "client.js",
});

// compile the cli tools for puriffy
await build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("/src/cli/index.ts")],
  naming: "cli.js",
  target: "node",
});

// compile the common js
await Bun.build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("src/core/client/common.ts")],
  naming: "common.js",
  sourcemap: "none",
  outdir: getFilePath("/puriffied/public"),
  target: "browser",
});

// compile the interaction js
await Bun.build({
  ...defaultBuildingConfiguration,
  entrypoints: [getFilePath("src/core/client/interaction/index.ts")],
  naming: "interaction.js",
  sourcemap: "none",
  outdir: getFilePath("/puriffied/public"),
  target: "browser",
});

const compiledPage = await compilePage(
  (await import(getFilePath("/app/pages/index.ts"))).default as Page,
);
const writer = Bun.file(getFilePath("/puriffied/index.html")).writer();

writer.start();
writer.write(compiledPage);
writer.end();
