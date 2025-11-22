import { isObjKey } from "./utils.ts";

export type Route = {
  url: URLPattern;
  GET: (
    req: Request,
  ) => Promise<Response> | Response;
  POST?: (
    req: Request,
    postBody: object,
  ) => Promise<Response> | Response;
  PUT?: (
    req: Request,
    postBody: object,
  ) => Promise<Response> | Response;
};

export const routeGuard = (object: object) =>
  "url" in object && "GET" in object;

export type MaybePromiseVoid = void | Promise<void>;

export type ToDo = {
  title: string;
  description: string;
  status: "haven't started" | "active" | "finished";
  postDate: number;
  closeDate?: number;
};

const todoExample: ToDo = {
  title: "string",
  description: "string",
  status: "haven't started",
  postDate: Date.now(),
  closeDate: Date.now(),
};

// object must have these keys and these keys only, and all their types must match
export const toDoGuard = (object: object): boolean => {
  for (const [key, value] of Object.entries(object)) {
    if (
      !isObjKey(key, todoExample) || typeof todoExample[key] !== typeof value
    ) return false;
  }
  return true;
};
