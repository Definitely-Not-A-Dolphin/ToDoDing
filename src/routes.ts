import { db } from "./db.ts";
import type { Route, ToDo } from "./types.ts";
import { getRandomEmoji } from "./utils.ts";

export const route404 = new Response(
  JSON.stringify({
    message: "Not found",
    status: 404,
  }),
  {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  },
);

export const todoIdRoute: Route = {
  url: new URLPattern({ pathname: "/todo/:id" }),
  execute: (_req, match) => {
    const id = match.pathname.groups.id;

    const todo = db.sql`SELECT * FROM todo WHERE id = ${id}`[0] as
      | ToDo
      | undefined;

    if (!todo) return route404;

    const responseBody = JSON.stringify({
      ...todo,
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

export const todoDefaultRoute: Route = {
  url: new URLPattern({ pathname: "/todo" }),
  execute: (_req, _match) => {
    const responseBody = JSON.stringify({
      todo_id_url: "/todo/:id",
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
  execute: (req, _match) => {
    const responseBody = JSON.stringify({
      from: req.url,
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
