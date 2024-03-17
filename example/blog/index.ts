import { StaticData } from "../@types/data";
import { StaticVariable } from "../@types/variables";

interface BlogPost {
  title: string;
  author: string;
  body: string;
  views: number; // let's say it is a static value
}

export default {
  /*
   * Shell -.
   *     - Client sends a HTTP request to the server
   *     - Server responses with just HTML that includes tags, styles, and hydrator that sends another HTTP request to the server to get the data to put to the HTML CSS and JavaScript. The javascript code also receive the data and put the data into the right space in html tags. This HTML file would be a file that is pre-compiled at the build time
   *         while sending a response, the server would begin to work on preparing for data
   *     - Client receives the HTML thing and show at the first time. The JavaScript that is included would send another HTTP request to the server as written on the above step.
   *     - Server responses or gives the data right away. The server would also have to make the client wait for the data fetching things, or would be able to send the data right away.
   *     - Client receives the data, and the hydratorwould place the data to the right places that would have been configured by the developer.
   *
   *     Adv
   *       - to be able to see the initial page as fast as possible since it does not require any fetching or processing things on both sides.
   *
   *     Dis
   *       - to receive the data a bit later than the server since the hydrator would have to send another HTTP request to the server. It does increase the waiting time no matter the server prepares for the data before it gets the second http request.
   *
   * SERVER
   *     - Client sends a HTTP reqeust to the server
   *     - Server responses with HTML, CSS, JavaScript that would be coded by the server. It is a good idea to think of it as the hydratorin the shell method runs on the server side instead of the client side.
   *
   *     Adv
   *       - to be able to see the completed pages with a bit faster than the shell method
   *
   *     Dis
   *       - to have to see the whlte page until the data fetching and hydrating things are completed
   */
  method: "SHELL", // SHELL or SERVER
  events: {
    // optional
    // this is the function that will be called at the build time.
    // this function returns the data that does not change forever or changes for a long long period of time(like static data)
    onBuild: () => {
      // maybe reading from the static json file
      // maybe fetching some data

      return {};
    },
    // optional
    // this function will be called when receiving a http request as /api/{exisitingUrl}
    //
    // this function will also be called by the second http request for the shell method
    // this fucntion will also be called by the first http request on the sever side for the server method
    //
    // this fucntion has to return the only data but following the interface. THink of it as an API; it should return ONLY DATA
    // it is very important to note that it should be able to use try catch for preventing the errors.
    //
    // For the Shell method, the hydrator would have literally no idea when it receives unexpected data or when it does not receive any data from the server.
    onResponse: () => {
      const thePost = new StaticData<BlogPost>({
        id: "",
      });

      thePost.update(() => {
        return {
          title: "Hello",
          author: "sdf",
          body: "sadfjl",
          views: 20,
        };
      });

      // RETURN ONLY DATA LIKE AN API!
      return {
        // the data for metadata is going to be passed to the `medata` function
        forMetadata: { title: "HelloW orld", author: "Fivepixels" },
        // the data for page is going to be passed to the `page` function
        forPage: { thePost },
      };
    },
  },
  page: (
    fromBuildFunction: {},
    fromResponseFunction: { thePost: BlogPost },
  ) => {
    const someText = new StaticVariable<number>(2);

    return {
      head: {
        // <head />
        title: "Hello",
        author: "Hello",
        metadata: [
          {
            tag: "link",
            properties: {
              rel: "icon",
              href: "https://some.url",
            },
          },
          {
            tag: "meta",
            properties: {
              name: "theme-color",
              content: "themecolor?",
            },
          },
        ],
      },
      main: [
        // <main />
        {
          tag: "div",
          children: [
            {
              tag: "h1",
              innerText: fromResponseFunction.thePost.title,
            },
            {
              tag: "p",
              innerText: someText,
            },
            {
              tag: "p",
              innerText: fromBuildFunction,
            },
            {
              tag: "div",
            },
          ],
        },
      ],
    };
  },
};
