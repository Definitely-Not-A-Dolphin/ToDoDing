export const randomNumber = (lower: number, upper: number) =>
  Math.floor(Math.random() * (upper - lower + 1)) + lower;

export const returnStatus = (status: number) =>
  new Response(JSON.stringify({}), { status: status });

export function getRandomEmoji(): string {
  const emojis = [":)", ":D", ":P", ":3"] as const;
  return emojis[randomNumber(0, emojis.length - 1)];
}

export function isObjKey(
  key: string | number | symbol,
  object: object,
): key is keyof object {
  return key in object;
}

export function unwrap<T>($: T | undefined | null): NonNullable<T> {
  if ($ === undefined) {
    throw new Error("Unwrapping failed: value is undefined");
  } else if ($ === null) {
    throw new Error("Unwrapping failed: value is null");
  }

  return $;
}
