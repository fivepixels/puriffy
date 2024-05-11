import type { Profile } from "@type/index";
import type {
  OnCompilationFunction,
  OnHydrationFunction,
  OnRequestFunction,
} from "puriffy";

export const OnCompilation: OnCompilationFunction = async () => {
  console.log("On Compilation: 500");

  return;
};

export const OnHydration: OnHydrationFunction = () => {
  console.log("On Hydration: 500");

  return;
};

export const OnRequest: OnRequestFunction = () => {
  console.log("On Request: 500");

  return;
};

const ServerErrorProfile: Profile = {
  method: "SSG",
};

export default ServerErrorProfile;
