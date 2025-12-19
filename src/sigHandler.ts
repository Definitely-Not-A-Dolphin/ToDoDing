import type { MaybePromiseVoid } from "./types.ts";

let handlers: (() => MaybePromiseVoid)[] = [];

export function addSigListener(fun: () => MaybePromiseVoid): void {
  handlers.push(fun);
}

export function removeSigListener(fun: () => MaybePromiseVoid): void {
  handlers = handlers.filter((v) => v === fun);
}

const sigHandler = async () => {
  console.log("Shutting down...");
  for (const handler of handlers) await handler();

  Deno.exit();
};

if (Deno.build.os !== "windows") Deno.addSignalListener("SIGTERM", sigHandler);
// Windows momentje
Deno.addSignalListener("SIGINT", sigHandler);
