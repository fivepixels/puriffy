import { getFilePath } from "@src/utils/getFilePath";
import getFileStructure from "@src/utils/getFileStructure";
import deepMerge from "@src/utils/mergeDeepObjects";
import fs from "node:fs/promises";
import type { ProfileReturn } from "@type/routes/profile";
import type { EventReturn } from "@type/routes/events";
import type { Page } from "@type/routes/page";
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
  if (defaultPath !== "")
    await fs.mkdir(getFilePath(["/puriffied/pages", defaultPath]));

  const baseProfile = (await import(getFilePath("/app/puriffy.config.ts")))
    .default as Partial<ProfileReturn>;
  const profile = (
    await import(getFilePath(["/app/pages", defaultPath, "profile.ts"]))
  ).default as Partial<ProfileReturn>;

  const finalProfile = deepMerge<ProfileReturn>(baseProfile, profile);

  const events = (await import(
    getFilePath(["/app/pages", defaultPath, "events.ts"])
  )) as EventReturn;

  const returnedCompilationValue = await events.OnCompilation({
    at: new Date(),
  });

  const pageFunction = (
    await import(getFilePath(["/app/pages", defaultPath, "page.ts"]))
  ).default as Page<
    ReturnType<typeof events.OnCompilation>,
    ReturnType<typeof events.OnHydration>
  >;

  const { body: pageBody, head: pageHead } = pageFunction({
    fromCompilation: returnedCompilationValue,
    fromHydration: {
      use() {
        return "asdfjkl";
      },
    },
  });

  const mergedHead = deepMerge<typeof pageHead>(
    finalProfile.metadata,
    pageHead,
  );

  await fs.writeFile(
    getFilePath(["/puriffied/pages", defaultPath, "index.html"]),
    await compilePage({
      body: pageBody,
      head: mergedHead,
    }),
  );
}
