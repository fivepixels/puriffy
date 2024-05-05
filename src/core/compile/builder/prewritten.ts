import { defaultBuildingConfiguration } from "@scripts/build";
import { getFilePath } from "@src/utils/getFilePath";

export async function buildPreWrittenFiles(): Promise<void> {
  // compile the common.ts
  await Bun.build({
    ...defaultBuildingConfiguration,
    entrypoints: [getFilePath("/src/core/client/common.ts")],
    outdir: getFilePath("/puriffied/public"),
    naming: "common.js",
    target: "browser",
  });

  // compile the interaction.ts
  await Bun.build({
    ...defaultBuildingConfiguration,
    entrypoints: [getFilePath("/src/core/client/interaction/index.ts")],
    outdir: getFilePath("/puriffied/public"),
    naming: "interaction.js",
    target: "browser",
  });

  // compile the server.ts
  await Bun.build({
    ...defaultBuildingConfiguration,
    entrypoints: [getFilePath("/src/core/server/index.ts")],
    outdir: getFilePath("/puriffied"),
    naming: "server.js",
  });

  return;
}
