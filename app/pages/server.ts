import type {
  OnCompilationFunction,
  OnHydrationFunction,
  OnRequestFunction,
  Profile,
} from "puriffy";

export const OnCompilation: OnCompilationFunction = () => {
  console.log("On Compilation: Index");

  return;
};

export const OnHydration: OnHydrationFunction = () => {
  console.log("On Hydration: Index");

  return;
};

export const OnRequest: OnRequestFunction = () => {
  console.log("On Request: Index");

  return;
};

const IndexProfile: Profile = {
  method: "SSG",
};

export default IndexProfile;
