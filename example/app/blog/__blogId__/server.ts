import { readFile } from "fs/promises";

export interface OnBlogPostCompilationReturn {
  blog: BlogPost;
}

export interface BlogPost {
  title: string;
  description: string;
  writtenOn: string;
  body: string[];
}

const OnCompilation = async (
  fromRouteGeneration: string
): Promise<OnBlogPostCompilationReturn | undefined> => {
  const fileContent = await readFile("../../../data/posts.json", "utf-8");
  const data: { posts: BlogPost[] } = JSON.parse(fileContent);

  const currentPost = data.posts.find(
    currentValue => currentValue.title === fromRouteGeneration
  );

  if (!currentPost) {
    console.error("POST NOT FOUND");
    return;
  }

  return {
    blog: currentPost
  };
};

const OnRouteGeneration = async () => {
  const fileContent = await readFile("../../../data/posts.json", "utf-8");
  const data: { posts: BlogPost[] } = JSON.parse(fileContent);
  const paths: string[] = [];

  data.posts.map(currentValue => {
    paths.push(currentValue.title);
  });

  return paths;
};

export default {
  OnCompilation,
  OnRouteGeneration
};
