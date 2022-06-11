export const KCRelationType = {
  PARTOF: "PARTOF",
  INTERACT: "INTERACT",
  PREREQUISITE: "PREREQUISITE",
} as const;

export type KCRelationType = keyof typeof KCRelationType;

export function parseKCRelation(relation: string) {
  return (
    Object.values(KCRelationType).find((v) => v === relation) ||
    (() => {
      throw Error("Unexpected relation type: " + relation);
    })()
  );
}
