import type { PageFunction } from "puriffy";
import type { OnCompilationReturn, OnHydrationRetrun } from "./server";

const BlogPageFunction: PageFunction<
  OnCompilationReturn,
  OnHydrationRetrun
> = ({}) => {
  return {
    head: {
      lang: "en",
      title: "Blogs",
      description: "sadfjkaskjflksa!",
      keywords: ["blog detailed"],
      author: "Seol SO",
    },
    body: {
      main: [
        {
          tag: "h1",
          children: "+Blog",
        },
      ],
    },
  };
};

export default BlogPageFunction;
