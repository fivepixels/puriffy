import type { Profile } from "@type/index";
import type { OnCompilationFunction, OnRequestFunction } from "puriffy";

export const OnCompilation: OnCompilationFunction = async () => {
  console.log("On Compilation: 500");

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
