import { describe, expect, test } from "bun:test";
import { compile } from "puriffy";

describe("testing complex compilation", () => {
  test("testing simple tags generation with marked places", () => {
    const compiledResult = compile({
      hydrationIds: ["someTextFromHydration", "theSecondTextFromHydration"], // automatically attached by the `fromHydration`
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "h1",
            children: "Hello World!",
          },
          {
            tag: "p",
            children: "#(someTextFromHydration)#", // automatically attached by the `fromHydration`
          },
          {
            tag: "div",
            children: "#(theSecondTextFromHydration)#",
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
          positions: [30],
        },
        {
          hydrationId: "theSecondTextFromHydration",
          positions: [64],
        },
      ],
    });
  });

  test("testing multiple properties generation with marked places", () => {
    const compiledResult = compile({
      hydrationIds: ["someTextFromHydration"],
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "h1",
            children: "Hello World!",
          },
          {
            tag: "a",
            href: "#(someTextFromHydration)#",
            children: "Click this to go to some variable from hydration",
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString: `<main><h1>Hello World!</h1><a href="#(someTextFromHydration)#">Click this to go to some variable from hydration</a></main>`,
      markers: [
        {
          hydrationId: "someTextFromHydration",
          positions: [36],
        },
      ],
    });
  });

  test("testing children generation with marked places", () => {
    const compiledResult = compile({
      hydrationIds: ["someTextFromHydration", "theSecondTextFromHydration"],
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "h1",
            children: "Hello World!",
          },
          {
            tag: "p",
            children: "#(someTextFromHydration)#",
          },
          {
            tag: "div",
            children: [
              {
                tag: "h3",
                children: "#(someTextFromHydration)#",
              },
              {
                tag: "p",
                children:
                  "Multiple Times; (#(theSecondTextFromHydration)#, #(someTextFromHydration)#, #(theSecondTextFromHydration)#)",
              },
              {
                tag: "div",
                children: [
                  {
                    tag: "span",
                    children:
                      "At the middle (#(theSecondTextFromHydration)#) of the text",
                  },
                  {
                    tag: "p",
                    children:
                      "#(theSecondTextFromHydration)# even in the children",
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Hello World!</h1><p>#(someTextFromHydration)#</p><div><h3>#(someTextFromHydration)#</h3><p>Multiple Times; (#(theSecondTextFromHydration)#, #(someTextFromHydration)#, #(theSecondTextFromHydration)#)</p><div><span>At the middle (#(theSecondTextFromHydration)#) of the text</span><p>#(theSecondTextFromHydration)# even in the children</p></div></div></main>",
      markers: [
        {
          hydrationId: "someTextFromHydration",
          positions: [30, 68, 150],
        },
        {
          hydrationId: "theSecondTextFromHydration",
          positions: [118, 177, 238, 291],
        },
      ],
    });
  });
});
