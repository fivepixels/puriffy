import fs from "node:fs/promises";
import { defaultBuildingConfiguration } from "@scripts/build";
import { buildRoutes } from "./route";

async function build() {
  const puriffiedPath = `${process.cwd()}/puriffied`;
  const isPuriffiedExist = (await fs.readdir(process.cwd())).includes(
    "puriffied",
  );

  if (isPuriffiedExist) {
    await fs.rm(puriffiedPath, { recursive: true, force: true });
  }

  await fs.mkdir(puriffiedPath);
  await fs.mkdir(`${puriffiedPath}/pages`);
  await fs.mkdir(`${puriffiedPath}/public`);
  await fs.mkdir(`${puriffiedPath}/public/local`);
  await fs.mkdir(`${puriffiedPath}/public/local/db`);
  await fs.mkdir(`${puriffiedPath}/public/local/docs`);

  // compile the common.ts
  await Bun.build({
    ...defaultBuildingConfiguration,
    entrypoints: [`${process.cwd()}/src/client/common.ts`],
    outdir: `${process.cwd()}/puriffied/public`,
    naming: "common.js",
    target: "browser",
    minify: {
      whitespace: true,
      syntax: true,
      identifiers: false,
    },
  });

  // compile the interaction.ts
  await Bun.build({
    ...defaultBuildingConfiguration,
    entrypoints: [`${process.cwd()}/src/client/interaction/index.ts`],
    outdir: `${process.cwd()}/puriffied/public`,
    naming: "interaction.js",
    target: "browser",
    minify: {
      whitespace: true,
      syntax: true,
      identifiers: false,
    },
  });

  // compile the server.ts
  await Bun.build({
    ...defaultBuildingConfiguration,
    entrypoints: [`${process.cwd()}/src/server/index.ts`],
    outdir: `${process.cwd()}}/puriffied`,
    naming: "index.js",
  });

  const finalRouteInfo = await buildRoutes();

  await fs.writeFile(
    `${process.cwd()}/puriffied/info.json`,
    JSON.stringify(finalRouteInfo),
  );
}

export default build;
