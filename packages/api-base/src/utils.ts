import assert from "assert/strict";
import type { PromiseOrValue } from "graphql-ez";
import isNumeric from "validator/lib/isNumeric.js";

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

export async function getNodeIdList<T extends { id: number }>(
  nodes: PromiseOrValue<T[]>,
  ids: number[]
) {
  const result = (await nodes).reduce<Record<string | number, T>>(
    (acum, node) => {
      acum[node.id] = node;
      return acum;
    },
    {}
  );

  return ids.map((id) => {
    const data = result[id];

    if (data == null) throw Error(`${id} not found!`);

    return data;
  });
}

export function assertNotNumericCode(value: string | number) {
  if (typeof value !== "string") return;

  assert(!isNumeric(value), `Code "${value}" can't be numeric.`);
}
