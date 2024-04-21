import { describe, expect, test } from "bun:test";
import { compile } from "puriffy";

describe("testing simple compilation", () => {
  test("testing simple tags generation", () => {
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
            children: "This is a little paragraph.",
          },
          {
            tag: "div",
            children: "This is a little div.",
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString:
        "<main><h1>Hello World!</h1><p>This is a little paragraph.</p><div>This is a little div.</div></main>",
      markers: [],
    });
  });

  test("testing multiple properties generation", () => {
    const compiledResult = compile({
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "a",
            href: "https://github.com/fivepixels/",
            target: "new_tab",
            children: "This is a little link to my github profile.",
          },
          {
            tag: "textarea",
            name: "This is a name",
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString: `<main><a href="https://github.com/fivepixels/" target="new_tab">This is a little link to my github profile.</a><textarea name="This is a name"></textarea></main>`,
      markers: [],
    });
  });

  test("testing children generation", () => {
    const compiledResult = compile({
      compilingTag: {
        tag: "main",
        children: [
          {
            tag: "a",
            href: "https://github.com/fivepixels/",
            children: {
              tag: "span",
              children:
                "This is a little link to my github profile and has a span in it.",
            },
          },
          {
            tag: "div",
            children: {
              tag: "span",
              children:
                "This is a little span in a little div and has a span in it too.",
            },
          },
        ],
      },
    });

    expect(compiledResult).toStrictEqual({
      baseString: `<main><a href="https://github.com/fivepixels/"><span>This is a little link to my github profile and has a span in it.</span></a><div><span>This is a little span in a little div and has a span in it too.</span></div></main>`,
      markers: [],
    });
  });
});
