import type { PageFunction } from "puriffy";
import type { OnCompilationReturn, OnHydrationRetrun } from "./server";

const BlogPermissionsPageFunction: PageFunction<
  OnCompilationReturn,
  OnHydrationRetrun
> = ({}) => {
  return {
    head: {
      lang: "en",
      title: "Blogs",
      description: "sdkfla",
      keywords: ["asjkdlf"],
      author: "Seol SO",
    },
    body: {
      main: [
        {
          tag: "h1",
          children: "+Blog Permissions",
        },
      ],
    },
  };
};

export default BlogPermissionsPageFunction;
