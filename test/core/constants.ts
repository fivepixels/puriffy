import type { Page } from "@type/tag";

export const simpleWithPlain: Page = {
  head: {
    title: "simple test",
    description:
      "this is a simple test that contains very simple dom structure.",
    author: "Seol SO",
    lang: "en",
    keywords: ["test", "simple"],
  },
  body: {
    main: [
      {
        tag: "h1",
        children: "Test the h1 tag",
      },
      {
        tag: "p",
        children: "Test the p tag",
      },
      {
        tag: "div",
        children: "Test the div tag",
      },
    ],
  },
};

export const simpleWithProperties: Page = {
  head: {
    title: "simple test with properties",
    description:
      "this is a simple test that contains very simple dom structure with properties.",
    author: "Seol SO",
    lang: "en",
    keywords: ["test", "simple", "properties"],
  },
  body: {
    main: [
      {
        tag: "a",
        href: "https://github.com/fivepixels/",
        target: "new_tab",
        children: "Test the a tag",
      },
      {
        tag: "textarea",
        name: "Test the textarea tag",
      },
    ],
  },
};

export const simpleWithChildren: Page = {
  head: {
    title: "simple test with children",
    description:
      "this is a simple test that contains very simple dom structure with children.",
    author: "Seol SO",
    lang: "en",
    keywords: ["test", "simple", "children"],
  },
  body: {
    main: [
      {
        tag: "h1",
        children: "Test the h1 tag",
      },
      {
        tag: "p",
        children: "Test the p tag",
      },
      {
        tag: "div",
        children: [
          {
            tag: "h2",
            children: "Test children tags",
          },
          {
            tag: "p",
            children: "Test children tags",
          },
        ],
      },
    ],
  },
};
