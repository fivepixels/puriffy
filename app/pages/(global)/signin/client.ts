import type { PageFunction } from "puriffy";

const SignInPageFunction: PageFunction = () => {
  return {
    head: {
      lang: "en",
      title: "SIGN IN",
      description: `ssinalkgnlsdkfnkl`,
      keywords: ["builtAt"],
      author: "Seol So",
    },
    body: {
      nav: [],
      main: [
        {
          tag: "h1",
          children: "Sign in",
        },
      ],
      footer: [],
    },
  };
};

export default SignInPageFunction;
