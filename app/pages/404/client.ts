import type { PageFunction } from "@type/index";

const NotFoundPageFunction: PageFunction = () => {
  return {
    head: {
      lang: "en",
      title: "Oops! Server Error!",
      description: "Server Error",
      keywords: ["jslkdf"],
      author: "none",
    },
    body: {
      main: [
        {
          tag: "h1",
          children: {
            tag: "a",
            href: "/",
            children: "Page not found, go back to the home page.",
          },
        },
      ],
    },
  };
};

export default NotFoundPageFunction;
