import { describe, expect, test } from "bun:test";
import { compileTag } from "@src/core/compiler/compileTag";

import {
  simpleWithChildren,
  simpleWithPlain,
  simpleWithProperties,
} from "./constants";

describe("testing simple compilation", () => {
  test("testing tags generation", () => {
    const compiledResult = compileTag(simpleWithPlain);
    expect(compiledResult).toStrictEqual(
      "<main><h1>Test the h1 tag</h1><p>Test the p tag</p><div>Test the div tag</div></main>",
    );
  });

  test("testing properties generation", () => {
    const compiledResult = compileTag(simpleWithProperties);
    expect(compiledResult).toStrictEqual(
      `<main><a href="https://github.com/fivepixels/" target="new_tab">Test the a tag</a><textarea name="Test the textarea tag"></textarea></main>`,
    );
  });

  test("testing children generation", () => {
    const compiledResult = compileTag(simpleWithChildren);
    expect(compiledResult).toStrictEqual(
      "<main><h1>Test the h1 tag</h1><p>Test the p tag</p><div><h2>Test children tags</h2><p>Test children tags</p></div></main>",
    );
  });
});
