import type { PageFunction } from "@type/index";

const ServerErrorPage: PageFunction = () => {
  return {
    head: {
      title: "Oops! Server Error!",
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

export default ServerErrorPage;
