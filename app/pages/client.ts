import type { PageFunction } from "puriffy";

const IndexPageFunction: PageFunction = () => {
  return {
    head: {
      lang: "en",
      title: `Animating Test`,
      description: `Animating Test`,
      keywords: ["animating", "colours"],
      author: "Soel So",
    },
    body: {
      main: [
        {
          tag: "div",
          children: [
            {
              tag: "h1",
              children: "Hello World",
            },
            {
              tag: "p",
              children:
                "In this page, I am going to animate the colour of this shape",
            },
          ],
        },
        {
          tag: "div",
          id: "theshape",
          style: {
            width: "20px",
            height: "20px",
            backgroundColor: "rgb(255, 0, 0)",
          },
        },
      ],
    },
  };
};

export default IndexPageFunction;
