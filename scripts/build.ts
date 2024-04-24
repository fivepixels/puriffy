import { build } from "bun";
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

await build({
  ...defaultBuildingConfiguration,
  entrypoints: ["./src/index.ts", "./src/cli/index.ts"],
  plugins: [
    dts({
      output: {
        sortNodes: true,
        noBanner: false,
      },
    }),
  ],
});
