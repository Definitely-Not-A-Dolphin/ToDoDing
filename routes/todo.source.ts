import { db } from "$src/db.ts";
import type { ToDo } from "$src/types.ts";
import { getRandomEmoji } from "$src/utils.ts";
import { WebSource } from "@kuusi/kuusi";

const route = new WebSource({
  GET: () => {
    const todo = db.sql`SELECT * FROM todo` as ToDo[] | undefined;

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
  POST: async (req) => {
    const todo = JSON.parse(await req.text()) as ToDo;

    db.sql`
      INSERT INTO todo (title, description, status, postDate) VALUES (${todo.title}, ${todo.description}, ${todo.status}, ${todo.postDate})
    `;

    return new Response("{}", {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  },
});

export default route;
