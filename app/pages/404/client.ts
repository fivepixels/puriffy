import type { PageFunction } from "@type/index";

const NotFoundPage: PageFunction = () => {
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
            children: "Page not found, go back to the home page.",
          },
        },
      ],
    },
  };
};

export default NotFoundPage;
