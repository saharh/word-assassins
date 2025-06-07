import _ from "lodash";
import { WORD_LIST } from "./master-word-list";

export function getRandomWords(count: number, customWordList : string[] | null): string[] {
  // Use the custom word list if available, otherwise use the default
  const wordSource = customWordList || WORD_LIST;
  return _.shuffle(wordSource).slice(0, count);
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
