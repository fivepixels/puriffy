import fs from "node:fs/promises";
import { defaultBuildingConfiguration } from "@scripts/build";
import { getFromHydration } from "@src/utils/from/hydration";
import { getFromLocal } from "@src/utils/from/local";
import { deepMerge } from "@src/utils/mergeDeepObjects";
import { checkIfGroupFolder, removeGroupFolderNames } from "@src/utils/url";
import { getFolderNames } from "../../utils/files";
import parsePage from "../parser";
import type { MainProfile, Profile, PageRenderingMethod } from "@type/page";
import type { ServerReturn } from "@type/server";
import type { PageFunction } from "@type/client";
import type { Head } from "@type/tag";

interface RouteInfo {
  [K: string]: PageRenderingMethod;
}

export async function buildRoutes(
  defaultPath = "",
  defaultRouteInfo = {} as RouteInfo,
): Promise<RouteInfo | undefined> {
  const basePath = `${process.cwd()}/app/pages/${defaultPath}`;
  const allFolders = getFolderNames(basePath);
  const isDefaultPathGroupFolder = checkIfGroupFolder(defaultPath);

  if (!isDefaultPathGroupFolder) {
    defaultRouteInfo[
      defaultPath === "" ? "/" : removeGroupFolderNames(defaultPath)
    ] = ((await import(`${basePath}/server.ts`)).default as Profile).method;

    await buildPage(defaultPath);
  }

  for (const currentFolder of allFolders) {
    deepMerge(
      defaultRouteInfo,
      await buildRoutes(`${defaultPath}/${currentFolder}`, defaultRouteInfo),
    );
  }

  return defaultRouteInfo;
}

async function buildPage(defaultPath: string): Promise<void> {
  try {
    if (defaultPath !== "") {
      await fs.mkdir(
        `${process.cwd()}/puriffied/pages${removeGroupFolderNames(
          defaultPath,
        )}`,
      );
    }

    const baseProfile = (await import(`${process.cwd()}/app/puriffy.config.ts`))
      .default as MainProfile;

    const event = (await import(
      `${process.cwd()}/app/pages/${defaultPath}/server.ts`
    )) as Partial<ServerReturn>;

    const server = {
      ...event,
      default: deepMerge<Profile>(baseProfile, event),
    };

    const client = (
      await import(`${process.cwd()}/app/pages/${defaultPath}/client.ts`)
    ).default as PageFunction;

    const compilationResult = server.OnCompilation
      ? await server.OnCompilation({
          fromLocal: getFromLocal(),
          fromMetadata: server.default.metadata as Head,
        })
      : {};

    const { body: pageBody, head: pageHead } = client({
      fromCompilation: compilationResult,
      fromHydration: getFromHydration(),
      fromLocal: getFromLocal(),
    });

    await fs.writeFile(
      `${process.cwd()}/puriffied/pages/${removeGroupFolderNames(
        defaultPath,
      )}/index.html`,
      await parsePage({
        body: pageBody,
        head: deepMerge<Head>(server.default.metadata, pageHead),
      }),
    );

    await Bun.build({
      ...defaultBuildingConfiguration,
      entrypoints: [`${process.cwd()}/app/pages/${defaultPath}/server.ts`],
      outdir: `${process.cwd()}/puriffied/pages/${removeGroupFolderNames(
        defaultPath,
      )}`,
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
