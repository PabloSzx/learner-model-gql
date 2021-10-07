import { ENV } from "common-api";
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

export async function expectRequestedIdsArePresent<T extends { id: number }>(
  nodes: PromiseOrValue<T[]>,
  ids: number[]
) {
  const resultNodes = await nodes;

  if (ENV.IS_PRODUCTION) {
    for (const id of ids) {
      if (resultNodes.find((v) => v.id === id) == null) {
        throw Error("Forbidden");
      }
    }
  } else {
    const missingIds = ids.filter(
      (id) => resultNodes.find((v) => v.id === id) == null
    );

    if (missingIds.length) throw Error("Forbidden ids: " + missingIds.join());
  }

  return resultNodes;
}
