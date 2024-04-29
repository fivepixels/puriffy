import type { Tag } from "@type/tag";

export const simpleWithPlain: Tag = {
  tag: "main",
  children: [
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
};

export const simpleWithProperties: Tag = {
  tag: "main",
  children: [
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
};

export const simpleWithChildren: Tag = {
  tag: "main",
  children: [
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
};
