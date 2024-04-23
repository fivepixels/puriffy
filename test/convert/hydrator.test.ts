import { describe, expect, test } from "bun:test";
import { compile, hydrate } from "puriffy";
import {
  hydrationOnChildren,
  hydrationOnProperties,
  hydrationWithPlain,
} from "./constants";

describe("testing simple hydration", () => {
  test("testing simple hydration", () => {
    const compiledResult = compile(hydrationWithPlain);

    const hydratedResult = hydrate({
      baseString: compiledResult,
      hydrateTarget: {
        theFirstHydration: 20,
        theSecondHydration: "Hahaha",
      },
    });

    expect(hydratedResult).toStrictEqual(
      "<main><h1>Test the h1 tag</h1><p>20</p><div>Hahaha</div></main>",
    );
  });

  test("testing properties hydration", () => {
    const compiledResult = compile(hydrationOnProperties);

    const hydratedResult = hydrate({
      baseString: compiledResult,
      hydrateTarget: {
        theFirstHydration: "https://github.com/fivepixels/",
      },
    });

    expect(hydratedResult).toStrictEqual(
      '<main><h1>Test the h1 tag</h1><a href="https://github.com/fivepixels/">Test the a tag</a></main>',
    );
  });

  test("testing children hydration", () => {
    const compiledResult = compile(hydrationOnChildren);

    const hydratedResult = hydrate({
      baseString: compiledResult,
      hydrateTarget: {
        theFirstHydration: "the first value",
        theSecondHydration: "the second value",
      },
    });

    expect(hydratedResult).toStrictEqual(
      "<main><div><h1>Test the h1 tag</h1><p>the first value</p><div><h3>Test the second value tseT</h3><p>Test multiples the first value, the second value, the first value</p><div><span>Test</span><p>Test with children the second value</p></div></div></div></main>",
    );
  });
});
