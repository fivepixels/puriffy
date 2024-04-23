import { describe, expect, test } from "bun:test";
import { compile } from "puriffy";

import {
  simpleWithPlain,
  simpleWithChildren,
  simpleWithProperties,
} from "./constants";

describe("testing simple compilation", () => {
  test("testing tags generation", () => {
    const compiledResult = compile(simpleWithPlain);
    expect(compiledResult).toStrictEqual(
      "<main><h1>Test the h1 tag</h1><p>Test the p tag</p><div>Test the div tag</div></main>",
    );
  });

  test("testing properties generation", () => {
    const compiledResult = compile(simpleWithProperties);
    expect(compiledResult).toStrictEqual(
      `<main><a href="https://github.com/fivepixels/" target="new_tab">Test the a tag</a><textarea name="Test the textarea tag"></textarea></main>`,
    );
  });

  test("testing children generation", () => {
    const compiledResult = compile(simpleWithChildren);
    expect(compiledResult).toStrictEqual(
      "<main><h1>Test the h1 tag</h1><p>Test the p tag</p><div><h2>Test children tags</h2><p>Test children tags</p></div></main>",
    );
  });
});
