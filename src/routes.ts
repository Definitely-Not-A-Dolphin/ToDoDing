import { getRandomEmoji } from "./utils.ts";
import { Route } from "./types.ts";

export const thingRoute: Route = {
  url: new URLPattern({ pathname: "/thing/:id" }),
  execute: (_, match?: URLPatternResult) => {
    const id = match?.pathname.groups.id;

    const responseBody = JSON.stringify({
      id: id,
      from: "/thing",
      emoji: getRandomEmoji(),
    });

    return new Response(responseBody, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  },
};

export const thingDefaultRoute: Route = {
  url: new URLPattern({ pathname: "/thing" }),
  execute: () => {
    const responseBody = JSON.stringify({
      from: "/thing",
      emoji: getRandomEmoji(),
    });

    return new Response(responseBody, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  },
};

export const homeRoute: Route = {
  url: new URLPattern({ pathname: "/" }),
  execute: () => {
    const responseBody = JSON.stringify({
      from: "/",
      emoji: getRandomEmoji(),
    });

    return new Response(responseBody, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  },
};
