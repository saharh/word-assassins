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

  const shuffled = _.shuffle(items);
  const targetMap = new Map<T, T>();

  _.forEach(shuffled, (item, index) => {
    const nextIndex = (index + 1) % shuffled.length;
    targetMap.set(item, shuffled[nextIndex]);
  });

  return targetMap;
}
