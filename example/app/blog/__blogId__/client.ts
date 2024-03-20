import type { FullyStaticPage } from "../../../placeholder/rehydrationData";
import type { OnBlogPostCompilationReturn } from "./server";

const BlogPostPage: FullyStaticPage<OnBlogPostCompilationReturn> = ({
  fromCompilation,
  fromRouteGeneration,
  fromClient
}) => {
  return [
    {
      tag: "div",
      content: [
        {
          tag: "h1",
          content: fromCompilation.blog.title.use()
        }
      ]
    }
  ];
};

export default BlogPostPage;
