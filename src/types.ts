import { isObjKey } from "./utils.ts";

export type MaybePromiseVoid = void | Promise<void>;

export type ToDo = {
  title: string;
  description: string;
  status: "haven't started" | "active" | number;
  postDate: number;
  dueDate?: number;
  url?: string;
};

const todoExample: ToDo = {
  title: "string",
  description: "string",
  status: "haven't started",
  postDate: 6,
  dueDate: 36,
  url: "string",
};

export const toDoGuard = (object: object) =>
  Object.entries(object).every(([key, value]) =>
    isObjKey(key, todoExample) && typeof todoExample[key] === typeof value
  );
