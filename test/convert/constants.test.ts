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

export const hydrationIdsForPlain = ["theFirstHydration", "theSecondHydration"];
export const hydrationWithPlain: Tag = {
  tag: "main",
  children: [
    {
      tag: "h1",
      children: "Test the h1 tag",
    },
    {
      tag: "p",
      children: "#(theFirstHydration)#",
    },
    {
      tag: "div",
      children: "#(theSecondHydration)#",
    },
  ],
};

export const hydrationIdsForProperties = ["theFirstHydration"];
export const hydrationOnProperties: Tag = {
  tag: "main",
  children: [
    {
      tag: "h1",
      children: "Test the h1 tag",
    },
    {
      tag: "a",
      href: "#(theFirstHydration)#",
      children: "Test the a tag",
    },
  ],
};

export const hydrationIdsForChildren = [
  "theFirstHydration",
  "theSecondHydration",
];
export const hydrationOnChildren: Tag = {
  tag: "main",
  children: [
    {
      tag: "div",
      children: [
        {
          tag: "h1",
          children: "Test the h1 tag",
        },
        {
          tag: "p",
          children: "#(theFirstHydration)#",
        },
        {
          tag: "div",
          children: [
            {
              tag: "h3",
              children: "Test #(theSecondHydration)# tseT",
            },
            {
              tag: "p",
              children:
                "Test multiples #(theFirstHydration)#, #(theSecondHydration)#, #(theFirstHydration)#",
            },
            {
              tag: "div",
              children: [
                {
                  tag: "span",
                  children: "Test",
                },
                {
                  tag: "p",
                  children: "Test with children #(theSecondHydration)#",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
