import { describe, expect, test } from "bun:test";
import { compile } from "puriffy";

describe("testing complex compilation", () => {
  test("testing simple tags generation with marked places", () => {
    const compiledResult = compile({
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "h1",
            children: "Hello World!",
          },
          {
            tag: "p",
            children: {
              hydrationId: "someTextFromHydration",
            },
          },
          {
            tag: "div",
            children: {
              hydrationId: "theSecondTextFromHydration",
            },
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Hello World!</h1><p>#(someTextFromHydration)#</p><div>#(theSecondTextFromHydration)#</div></main>",
      markers: [
        {
          hydrationId: "someTextFromHydration",
        },
        {
          hydrationId: "theSecondTextFromHydration",
        },
      ],
    });
  });

  test("testing multiple properties generation with marked places", () => {
    const compiledResult = compile({
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "h1",
            children: "Hello World!",
          },
          {
            tag: "p",
            children: {
              hydrationId: "someTextFromHydration",
            },
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Hello World!</h1><p>#(someTextFromHydration)#</p></main>",
      markers: [
        {
          hydrationId: "someTextFromHydration",
        },
      ],
    });
  });

  test("testing children generation with marked places", () => {
    const compiledResult = compile({
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "h1",
            children: "Hello World!",
          },
          {
            tag: "p",
            children: {
              hydrationId: "someTextFromHydration",
            },
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Hello World!</h1><p>#(someTextFromHydration)#</p></main>",
      markers: [
        {
          hydrationId: "someTextFromHydration",
        },
      ],
    });
  });
});
