import type {
  OnCompilationFunction,
  OnHydrationFunction,
  OnRequestFunction,
  Profile,
} from "puriffy";

export const OnCompilation: OnCompilationFunction = () => {
  console.log("On Compilation: Sign IN");

  return;
};

export const OnHydration: OnHydrationFunction = () => {
  console.log("On Hydration: Sign IN");

  return;
};

export const OnRequest: OnRequestFunction = () => {
  console.log("On Request: Sign IN");

  return;
};

const SignInProfile: Profile = {
  method: "SSG",
};

export default SignInProfile;
