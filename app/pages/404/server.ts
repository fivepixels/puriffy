import type { Profile } from "@type/index";
import type { OnCompilationFunction, OnRequestFunction } from "puriffy";

export const OnCompilation: OnCompilationFunction = async () => {
  console.log("On Compilation: 404");

  return;
};

export const OnRequest: OnRequestFunction = () => {
  console.log("On Request: 404");

  return;
};

const NotFoundProfile: Profile = {
  method: "SSG",
};

export default NotFoundProfile;
