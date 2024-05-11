import type { PageFunction } from "puriffy";

const IndexPageFunction: PageFunction = ({ fromComputer }) => {
  const compilationCalledAt = fromComputer.time.toString();

  return {
    head: {
      title: `When this page was built?`,
      description: `Do you want to know when it was built?`,
      keywords: ["builtAt"],
    },
    body: {
      nav: [],
      main: [
        {
          tag: "h1",
          children: "Do you know when this web page was built at?",
        },
        {
          tag: "div",
          children: [
            {
              tag: "p",
              children: "The answer is...",
            },
            {
              tag: "span",
              children: `${compilationCalledAt}!`,
            },
            {
              tag: "span",
              children: `compiled at ${compilationCalledAt}`,
            },
          ],
        },
      ],
      footer: [],
    },
  };
};

export default IndexPageFunction;
