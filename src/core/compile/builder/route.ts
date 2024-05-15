import fs from "node:fs/promises";
import { defaultBuildingConfiguration } from "@scripts/build";
import { getFromComputer } from "@src/utils/from/computer";
import { getFromHydration } from "@src/utils/from/hydration";
import { getFromLocal } from "@src/utils/from/local";
import { getFilePath } from "@src/utils/getFilePath";
import getFileStructure from "@src/utils/getFileStructure";
import { deepMerge } from "@src/utils/mergeDeepObjects";
import type {
  Head,
  MainProfile,
  Profile,
  RouteInfo,
  ServerReturn,
} from "@type/index";
import compilePage from "../compiler";

export async function buildRoutes(
  defaultPath = "",
  defaultRouteInfo = {} as RouteInfo,
): Promise<RouteInfo | undefined> {
  const basePath = getFilePath(["/app/pages", defaultPath]);
  const fileStructure = await getFileStructure(basePath);

  const currentRenderingMethod = (await import(`${basePath}/server.ts`))
    .default as Profile;

  defaultRouteInfo[defaultPath === "" ? "/" : defaultPath] =
    currentRenderingMethod.method;

  await buildPage(defaultPath);

  for (const currentFolder of fileStructure.folders) {
    deepMerge(
      defaultRouteInfo,
      await buildRoutes(`${defaultPath}/${currentFolder}`, defaultRouteInfo),
    );
  }

  return defaultRouteInfo;
}

async function buildPage(defaultPath: string): Promise<void> {
  try {
    if (defaultPath !== "")
      await fs.mkdir(getFilePath(["/puriffied/pages", defaultPath]));

    const server = await importEvents(defaultPath);
    const client = (
      await import(getFilePath(["/app/pages", defaultPath, "client.ts"]))
    ).default;

    const compilationResult = await server.OnCompilation({
      fromComputer: getFromComputer(),
      fromLocal: getFromLocal(),
      fromMetadata: server.default.metadata as Head,
    });

    const { body: pageBody, head: pageHead } = client({
      fromComputer: getFromComputer(),
      fromCompilation: compilationResult,
      fromHydration: getFromHydration(),
      fromLocal: getFromLocal(),
    });

    await fs.writeFile(
      getFilePath(["/puriffied/pages", defaultPath, "index.html"]),
      await compilePage({
        body: pageBody,
        head: deepMerge<typeof pageHead>(server.default.metadata, pageHead),
      }),
    );

    await Bun.build({
      ...defaultBuildingConfiguration,
      entrypoints: [getFilePath(["/app/pages", defaultPath, "server.ts"])],
      outdir: getFilePath(["/puriffied/pages", defaultPath]),
      minify: {
        whitespace: true,
        syntax: true,
        identifiers: false,
      },
    });

    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function importEvents(defaultPath: string): Promise<ServerReturn> {
  const baseProfile = (await import(getFilePath("/app/puriffy.config.ts")))
    .default as MainProfile;

  const event = (await import(
    getFilePath(["/app/pages", defaultPath, "server.ts"])
  )) as ServerReturn;

  return {
    ...event,
    default: deepMerge<Profile>(baseProfile, event),
  };
}
