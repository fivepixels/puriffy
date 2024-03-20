import type { HydratablePage } from "../../placeholder/rehydrationData";
import type { OnBlogHydrationReturn } from "./server";

const BlogPage: HydratablePage<OnBlogHydrationReturn> = ({ fromHydration }) => {
  return {
    main: [
      {
        tag: "h1",
        content: "Puriffy's Blog"
      },
      {
        tag: "div",
        content: [
          {
            tag: "p",
            content: "Today's Random Number from the sever",
            eventListeners: {}
          },
          {
            tag: "h3",
            content: fromHydration.randomNumber.use(),
            style: {
              font: {
                size: 20,
                color: "red"
              },
              background: {
                color: "blue"
              }
            }
          }
        ]
      }
    ]
  };
};

export default BlogPage;
