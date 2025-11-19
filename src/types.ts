export type Route = {
  url: URLPattern;
  execute: (
    req: Request,
    match: URLPatternResult,
  ) => Promise<Response> | Response;
};

export const routeGuard = (object: object) =>
  "url" in object && "execute" in object;

export type MaybePromiseVoid = void | Promise<void>;

export type DayMonthYear = `${number}-${number}-${number}`;

export type ToDo = {
  id: number;
  title: string;
  description: string;
  status: "haven't started" | "active" | "finished";
  postDate: DayMonthYear;
  closeDate?: DayMonthYear;
};
