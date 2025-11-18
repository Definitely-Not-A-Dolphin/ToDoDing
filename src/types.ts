export type Route = {
  url: URLPattern;
  execute: (
    req?: Request,
    match?: URLPatternResult,
  ) => Promise<Response> | Response;
};

export const routeGuard = (object: object) =>
  "url" in object && "execute" in object;
