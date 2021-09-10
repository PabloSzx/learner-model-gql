import type { PromiseOrValue } from "graphql-ez";

export const getIdsIntersection = async (
  a: PromiseOrValue<number[]>,
  b: PromiseOrValue<number[]>
) => {
  const [aSet, bSet] = await Promise.all([
    Promise.resolve(a).then((v) => new Set(v)),
    Promise.resolve(b).then((v) => new Set(v)),
  ]);

  const ids: number[] = [];

  for (const id of aSet) {
    if (bSet.has(id)) ids.push(id);
  }

  return ids;
};
