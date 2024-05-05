import type { FromComputer } from "@type/routes/events";

function getFromComputer(): FromComputer {
  return { cwd: process.cwd(), time: new Date() };
}

export default getFromComputer;
