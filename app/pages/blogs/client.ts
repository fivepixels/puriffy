import type { PageFunction } from "puriffy";
import type { OnCompilationReturn, OnHydrationRetrun } from "./server";

const BlogsPageFunction: PageFunction<
  OnCompilationReturn,
  OnHydrationRetrun
> = ({ fromCompilation, fromHydration }) => {
  return {
    head: {
      lang: "en",
      title: "Blogs",
      description: "See all blogs here.",
      keywords: ["blogs"],
      author: "Seol SO",
    },
    body: {
      nav: [],
      main: [
        {
          tag: "h1",
          children: "See all blogs",
        },
        {
          tag: "div",
          children: fromCompilation.blogList.map((currentBlog) => {
            return {
              tag: "a",
              href: `/blogs/${currentBlog}`,
              children: { tag: "h3", children: currentBlog },
            };
          }),
        },
        {
          tag: "div",
          children: [
            {
              tag: "span",
              children: `From Request(expected to be randomly generated): ${fromHydration.use(
                "requestNum",
              )}`,
            },
            {
              tag: "span",
              children: `From Hydration(expected to be Seol Sooo): ${fromHydration.use(
                "hydrationName",
              )}`,
            },
          ],
        },
      ],
      footer: [],
    },
  };
};

export default BlogsPageFunction;
