import { type Route, routeGuard } from "./types.ts";
import { returnStatus } from "./routes.ts";

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

    const reqText = await req.text();
    if (req.body) console.log("Body:", JSON.parse(reqText));

    switch (req.method) {
      case "GET":
        if (route.GET) return await route.GET(req);
        break;
      case "POST":
        if (route.POST) return await route.POST(req, JSON.parse(reqText));
        break;
      case "PUT":
        if (route.PUT) return await route.PUT(req, JSON.parse(reqText));
        break;
      default:
        returnStatus(405);
    }
  }

  return returnStatus(404);
}

Deno.serve({ port: 7776 }, handler);
