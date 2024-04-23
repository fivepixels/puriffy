import { getChildren } from "./getChildren";
import type { Tag } from "@type/tag";

function compile(compilingPage: Tag): string {
  const baseString = getChildren(compilingPage);

  return baseString;
}

export default compile;
