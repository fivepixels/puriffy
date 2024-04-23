import type { Tag } from "@type/tag";
import { getChildren } from "./getChildren";

function compile(compilingPage: Tag): string {
  const baseString = getChildren(compilingPage);

  return baseString;
}

export default compile;
