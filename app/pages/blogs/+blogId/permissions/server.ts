import type { Profile } from "@type/index";
import type {
  OnCompilationFunction,
  OnHydrationFunction,
  OnRequestFunction,
} from "puriffy";

export interface OnCompilationReturn {}
export const OnCompilation: OnCompilationFunction<OnCompilationReturn> = () => {
  console.log("On Compilation: +Blogs Permissions");

  return {};
};

export interface OnHydrationRetrun {}
export const OnHydration: OnHydrationFunction<
  OnHydrationRetrun,
  OnRequestReturn
> = () => {
  console.log("On Hydration: +Blogs Permissions");

  return {};
};

export interface OnRequestReturn {}
export const OnRequest: OnRequestFunction<OnRequestReturn> = ({
  fromDynamicRoutes,
}) => {
  console.log("On Request: +Blogs Permissions");
  console.log(fromDynamicRoutes);

  return {};
};

const BlogPermissionsProfile: Profile = {
  method: "SSR",
};

export default BlogPermissionsProfile;
