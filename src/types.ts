import { isObjKey } from "./utils.ts";

export type Route = {
  url: URLPattern;
  GET: (req: Request) => Promise<Response> | Response;
  POST?: (
    req: Request,
    postBody: object,
  ) => Promise<Response> | Response;
  PUT?: (
    req: Request,
    postBody: object,
  ) => Promise<Response> | Response;
  DELETE?: (req: Request) => Promise<Response> | Response;
};

export const routeGuard = (object: object) =>
  "url" in object && "GET" in object;

export type MaybePromiseVoid = void | Promise<void>;

export type ToDo = {
  title: string;
  description: string;
  status: "haven't started" | "active" | number;
  postDate: number;
};

const todoExample: ToDo = {
  title: "string",
  description: "string",
  status: "haven't started",
  postDate: 36,
};

// object may not have any missing properties
export const toDoGuard = (object: object): boolean => {
  for (const [key, value] of Object.entries(object)) {
    if (
      !(isObjKey(key, todoExample) && typeof todoExample[key] === typeof value)
    ) return false;
  }

  for (const [key, value] of Object.entries(todoExample)) {
    if (
      !(isObjKey(key, object) && typeof object[key] === typeof value)
    ) return false;
  }
  return true;
};

// object may have some missing properties
export const partialToDoGuard = (object: object): boolean => {
  for (const [key, value] of Object.entries(object)) {
    if (
      !(isObjKey(key, todoExample) && typeof todoExample[key] === typeof value)
    ) return false;
  }
  return true;
};
