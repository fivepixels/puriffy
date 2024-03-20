const pageOptions = {
  method: "STATIC",
  hydrationOptions: {
    every: 120, // the server will automatically re-hydrate this page every 2 minutes
    countNumber: true
  },
  defaultMetadata: {
    title: "Puriffy's Blog",
    description:
      "Here is the official Puriffy Blog where you can read a lot of news regarding the technologies and features that are being released in Puriffy!",
    keywords: ["blog", "puriffy"],
    author: "Fivepixels",
    charset: "utf-8"
  }
};

export default pageOptions;
