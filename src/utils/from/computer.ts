import type { FromComputer } from "@type/index";

export function getFromComputer(): FromComputer {
  return { cwd: process.cwd(), time: new Date() };
}
