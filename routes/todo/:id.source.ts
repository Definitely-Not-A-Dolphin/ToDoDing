import { WebSource } from "@kuusi/kuusi";

import { db } from "$src/db.ts";
import type { ToDo } from "$src/types.ts";
import { getRandomEmoji, returnStatus, unwrap } from "$src/utils.ts";

const route = new WebSource({
  GET: (_, patternResult) => {
    const id = patternResult.pathname.groups.id;

    const todo = db.sql`SELECT * FROM todo WHERE id = ${id}`[0] as
      | ToDo
      | undefined;
    if (!todo) return returnStatus(404);

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
  PUT: async (req, patternResult) => {
    const id = unwrap(patternResult.pathname.groups.id);

    const check = db
      .sql`SELECT COUNT(*) FROM todo WHERE id = ${id}`[0]["COUNT(*)"] as 0 | 1;
    if (!check) return returnStatus(405);

    const newData = JSON.parse(await req.text()) as Record<
      string,
      string | number
    >;

    for (const [key, value] of Object.entries(newData)) {
      const query = `UPDATE todo SET ${key} = ? WHERE id = ?`;
      db.prepare(query).get(value, id);
    }

    return returnStatus(200);
  },
  DELETE: (_, patternResult) => {
    const id = unwrap(patternResult.pathname.groups.id);

    const todo = db
      .sql`SELECT * FROM todo WHERE id = ${id}`[0] as ToDo | undefined;
    if (!todo) return returnStatus(404);

    db.sql`DELETE FROM todo WHERE id = ${id}`;
    return returnStatus(200);
  },
});

export default route;
