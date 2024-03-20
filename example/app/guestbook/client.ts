import type { ServerPage } from "../../placeholder/rehydrationData";
import type {
  OnGuestbookCompilationReturn,
  OnGuestbookHydrationReturn
} from "./server";

const GuestbookPage: ServerPage<
  OnGuestbookCompilationReturn,
  OnGuestbookHydrationReturn
> = ({ fromCompilation, fromHydration }) => {
  const currentYear = new Date().getFullYear();

  return {
    head: {
      title: fromCompilation.title.use(),
      description: fromCompilation.description.use(),
      keywords: ["blog", "guestbook", "puriffy"],
      author: "Fivepixels",
      charset: "utf-8"
    },
    main: [
      {
        tag: "h1",
        content: fromCompilation.title.use(),
        style: {
          font: {
            size: 20
          }
        }
      },
      {
        tag: "div",
        content: [
          {
            tag: "div",
            content: [
              {
                tag: "p",
                content: fromCompilation.description.use()
              },
              {
                tag: "p",
                content: fromCompilation.warningText.use(),
                style: {
                  background: {
                    color: "red"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        tag: "div",
        content: fromHydration.comments.iterate(
          (currentComment, commentIndex) => {
            return [
              {
                tag: "div",
                content: [
                  {
                    tag: "span",
                    content: currentComment.author.use()
                  },
                  {
                    tag: "span",
                    confirm: currentComment.commentedAt.use()
                  }
                ]
              },
              {
                tag: "p",
                content: currentComment.content.use(),
                style: {
                  font: {
                    size: commentIndex === 2 ? 100 : 10,
                    color: "red"
                  }
                }
              }
            ];
          }
        )
      },
      {
        tag: "footer",
        content: `copyright ${currentYear}`
      }
    ]
  };
};

export default GuestbookPage;
