import type { PageFunction } from "@type/index";

const ServerErrorPageFunction: PageFunction = () => {
  return {
    head: {
      lang: "en",
      title: "Oops! Server Error!",
      description: "asdjkfl",
      keywords: ["jsflk"],
      author: "jsklfd",
    },
    body: {
      main: [
        {
          tag: "h1",
          children: {
            tag: "a",
            href: "/",
            children: "Server throws an error, go back to the home page.",
          },
        },
      ],
    },
  };
};

export default ServerErrorPageFunction;
