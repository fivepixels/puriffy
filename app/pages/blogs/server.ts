import type { Profile } from "@type/index";
import type {
  OnCompilationFunction,
  OnHydrationFunction,
  OnRequestFunction,
} from "puriffy";

export interface OnCompilationReturn {
  blogList: string[];
}
export const OnCompilation: OnCompilationFunction<OnCompilationReturn> =
  async ({ fromLocal }) => {
    console.log("On Compilation: Blogs");

    const blogList = (await fromLocal.docs.getList()).files;

    return {
      blogList,
    };
  };

export interface OnHydrationRetrun {
  requestNum: string;
  hydrationName: string;
}

export const OnHydration: OnHydrationFunction<
  OnHydrationRetrun,
  OnRequestReturn
> = ({ fromRequest }) => {
  console.log("On Hydration: Blogs");

  return {
    requestNum: fromRequest.requestNum.toString(),
    hydrationName: "Seol Sooo",
  };
};

export interface OnRequestReturn {
  requestNum: number;
}
export const OnRequest: OnRequestFunction<OnRequestReturn> = () => {
  console.log("On Request: Blogs");

  const randomNumber = Math.floor(Math.random() * 100);

  return {
    requestNum: randomNumber,
  };
};

const BlogsProfile: Profile = {
  method: "SSR",
};

export default BlogsProfile;
