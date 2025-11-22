export function randomNumber(lower: number, upper: number): number {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function getRandomEmoji(): string {
  const emojis = [":)", ":D", ":P", ":3"];
  return emojis[randomNumber(0, emojis.length - 1)];
}

export function isObjKey(
  key: string | number | symbol,
  object: object,
): key is keyof object {
  return key in object;
}
