import _ from "lodash";

const WORD_LIST = [
  "elephant",
  "umbrella",
  "rainbow",
  "butterfly",
  "mountain",
  "octopus",
  "penguin",
  "volcano",
  "dolphin",
  "giraffe",
];

export function getRandomWords(count: number): string[] {
  return _.shuffle(WORD_LIST).slice(0, count);
}

export function assignTargets<T>(items: T[]): Map<T, T> {
  if (items.length < 2) {
    throw new Error("Need at least 2 items to create a cycle");
  }

  // Create a copy and shuffle it
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Create the cycle mapping
  const targetMap = new Map<T, T>();
  for (let i = 0; i < shuffled.length; i++) {
    const nextIndex = (i + 1) % shuffled.length;
    targetMap.set(shuffled[i], shuffled[nextIndex]);
  }

  return targetMap;
}
