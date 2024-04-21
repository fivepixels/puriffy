import { build } from "bun";
import dts from "bun-plugin-dts";

await build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  minify: {
    whitespace: true,
    syntax: true,
    identifiers: false,
  },
  splitting: false,
  sourcemap: "inline",
  format: "esm",
  plugins: [
    dts({
      output: {
        sortNodes: true,
        noBanner: false,
      },
    }),
  ],
});
