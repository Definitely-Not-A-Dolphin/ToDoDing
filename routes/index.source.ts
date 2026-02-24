import { getRandomEmoji } from "$src/utils.ts";
import { WebSource } from "@kuusi/kuusi";

const route = new WebSource({
  GET: (req) => {
    const responseBody = JSON.stringify({
      todo_url: req.url,
      emoji: getRandomEmoji(),
    });

    return new Response(responseBody, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  },
});

export default route;
