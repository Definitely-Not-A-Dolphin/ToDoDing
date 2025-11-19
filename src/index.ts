import { type Route, routeGuard } from "./types.ts";
import { route404 } from "./routes.ts";

const routes: Route[] = [];
const modules = await import("./routes.ts") as object;

for (const [name, module] of Object.entries(modules)) {
  if (!routeGuard(module)) {
    console.warn(`${name} is not a route!`);
    continue;
  }

  routes.push(module as Route);
}

async function handler(req: Request): Promise<Response> {
  for (const route of routes) {
    const match = route.url.exec(req.url);
    if (!match) continue;

    console.log(
      "\x1b[101m > \x1b[0m",
      "Method:",
      req.method,
      "Headers:",
      req.headers,
    );

    const url = new URL(req.url);
    console.log(
      "Path:",
      url.pathname,
      "Query parameters:",
      url.searchParams,
    );

    if (req.body) {
      const body = await req.text();
      console.log("Body:", body);
    }

    return await route.execute(req, match);
  }

  return route404;
}

Deno.serve({ port: 7776 }, handler);
