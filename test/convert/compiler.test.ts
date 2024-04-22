import { describe, expect, test } from "bun:test";
import { compile } from "puriffy";

import {
  simpleWithPlain,
  simpleWithChildren,
  simpleWithProperties,
  hydrationWithPlain,
  hydrationIdsForPlain,
  hydrationIdsForProperties,
  hydrationOnProperties,
  hydrationIdsForChildren,
  hydrationOnChildren,
} from "./constants.test";

describe("testing simple compilation", () => {
  test("testing tags generation", () => {
    const compiledResult = compile({
      compilingTag: simpleWithPlain,
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Test the h1 tag</h1><p>Test the p tag</p><div>Test the div tag</div></main>",
      markers: [],
    });
  });

  test("testing properties generation", () => {
    const compiledResult = compile({
      compilingTag: simpleWithProperties,
    });

    expect(compiledResult).toStrictEqual({
      baseString: `<main><a href=\"https://github.com/fivepixels/\" target=\"new_tab\">Test the a tag</a><textarea name="Test the textarea tag"></textarea></main>`,
      markers: [],
    });
  });

  test("testing children generation", () => {
    const compiledResult = compile({
      compilingTag: simpleWithChildren,
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Test the h1 tag</h1><p>Test the p tag</p><div><h2>Test children tags</h2><p>Test children tags</p></div></main>",
      markers: [],
    });
  });
});

describe("testing complex compilation", () => {
  test("testing tags generation with hydration ids", () => {
    const compiledResult = compile({
      hydrationIds: hydrationIdsForPlain, // automatically attached by the `fromHydration`
      compilingTag: hydrationWithPlain,
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Test the h1 tag</h1><p>#(theFirstHydration)#</p><div>#(theSecondHydration)#</div></main>",
      markers: [
        {
          hydrationId: "theFirstHydration",
          positions: [33],
        },
        {
          hydrationId: "theSecondHydration",
          positions: [63],
        },
      ],
    });
  });

  test("testing properties generation with hydration ids", () => {
    const compiledResult = compile({
      hydrationIds: hydrationIdsForProperties,
      compilingTag: hydrationOnProperties,
    });

    expect(compiledResult).toStrictEqual({
      baseString: `<main><h1>Test the h1 tag</h1><a href=\"#(theFirstHydration)#\">Test the a tag</a></main>`,
      markers: [
        {
          hydrationId: "theFirstHydration",
          positions: [39],
        },
      ],
    });
  });

  test("testing children generation with hydration ids", () => {
    const compiledResult = compile({
      hydrationIds: hydrationIdsForChildren,
      compilingTag: hydrationOnChildren,
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><div><h1>Test the h1 tag</h1><p>#(theFirstHydration)#</p><div><h3>Test #(theSecondHydration)# tseT</h3><p>Test multiples #(theFirstHydration)#, #(theSecondHydration)#, #(theFirstHydration)#</p><div><span>Test</span><p>Test with children #(theSecondHydration)#</p></div></div></div></main>",
      markers: [
        {
          hydrationId: "theFirstHydration",
          positions: [38, 127, 174],
        },
        {
          hydrationId: "theSecondHydration",
          positions: [77, 150, 243],
        },
      ],
    });
  });
});
