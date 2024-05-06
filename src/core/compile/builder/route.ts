import fs from "node:fs/promises";
import { defaultBuildingConfiguration } from "@scripts/build";
import { getFromComputer } from "@src/utils/from/computer";
import { getFromHydration } from "@src/utils/from/hydration";
import { getFromLocal } from "@src/utils/from/local";
import { getFilePath } from "@src/utils/getFilePath";
import getFileStructure from "@src/utils/getFileStructure";
import { deepMerge } from "@src/utils/mergeDeepObjects";
import type {
  EventsReturn,
  Head,
  MainProfile,
  PageFunction,
  Profile,
} from "@type/index";
import compilePage from "../compiler";

export async function buildRoutes(defaultPath = ""): Promise<void> {
  const basePath = getFilePath(["/app/pages", defaultPath]);
  const fileStructure = await getFileStructure(basePath);

  await buildPage(defaultPath);

  for (const currentFolder of fileStructure.folders) {
    await buildRoutes(`${defaultPath}/${currentFolder}`);
  }
}

async function buildPage(defaultPath: string): Promise<void> {
  try {
    if (defaultPath !== "")
      await fs.mkdir(getFilePath(["/puriffied/pages", defaultPath]));

    const finalProfile = await importProfile(defaultPath);
    const events = await importEvents(defaultPath);
    const pageFunction = await importPage(defaultPath);

    const resultFromCompilation = await events.OnCompilation({
      fromComputer: getFromComputer(),
      fromLocal: getFromLocal(),
      fromMetadata: finalProfile.metadata as Head,
    });

    const { body: pageBody, head: pageHead } = pageFunction({
      fromComputer: getFromComputer(),
      fromCompilation: resultFromCompilation,
      fromHydration: getFromHydration(),
      fromLocal: getFromLocal(),
    });

    const mergedHead = deepMerge<typeof pageHead>(
      finalProfile.metadata,
      pageHead,
    );

    const compiledPage = await compilePage({
      body: pageBody,
      head: mergedHead as Head,
    });

    await fs.writeFile(
      getFilePath(["/puriffied/pages", defaultPath, "index.html"]),
      compiledPage,
    );

    await Bun.build({
      ...defaultBuildingConfiguration,
      entrypoints: [getFilePath(["/app/pages", defaultPath, "events.ts"])],
      outdir: getFilePath(["/puriffied/pages", defaultPath]),
      minify: {
        whitespace: true,
        syntax: true,
        identifiers: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function importProfile(defaultPath: string): Promise<Profile> {
  const baseProfile = (await import(getFilePath("/app/puriffy.config.ts")))
    .default as MainProfile;

  const profile = (
    await import(getFilePath(["/app/pages", defaultPath, "profile.ts"]))
  ).default as Profile;

  return deepMerge<Profile>(baseProfile, profile);
}

async function importEvents(defaultPath: string): Promise<EventsReturn> {
  return (await import(
    getFilePath(["/app/pages", defaultPath, "events.ts"])
  )) as EventsReturn;
}

async function importPage(
  defaultPath: string,
): Promise<PageFunction<void, void>> {
  return (await import(getFilePath(["/app/pages", defaultPath, "page.ts"])))
    .default;
}
