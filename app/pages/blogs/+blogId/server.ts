import type { Profile } from "@type/index";
import type {
  OnCompilationFunction,
  OnHydrationFunction,
  OnRequestFunction,
} from "puriffy";

export interface OnCompilationReturn {}
export const OnCompilation: OnCompilationFunction<OnCompilationReturn> = () => {
  console.log("On Compilation: +Blog");

  return {};
};

export interface OnHydrationRetrun {}
export const OnHydration: OnHydrationFunction<
  OnHydrationRetrun,
  OnRequestReturn
> = () => {
  console.log("On Hydration: +Blog");

  return {};
};

export interface OnRequestReturn {}
export const OnRequest: OnRequestFunction<OnRequestReturn> = ({
  fromDynamicRoutes,
}) => {
  console.log("On Request: +Blog");
  console.log(fromDynamicRoutes);

  return {};
};

const BlogProfile: Profile = {
  method: "SSR",
};

export default BlogProfile;
