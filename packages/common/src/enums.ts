export const KCRelationType = {
  PARTOF: "PARTOF",
  INTERACT: "INTERACT",
  PREREQUISITE: "PREREQUISITE",
} as const;

export type KCRelationType = keyof typeof KCRelationType;

const KcRelationTypeValues = Object.values(KCRelationType);

export function parseKCRelation(relation: string | undefined) {
  return (
    KcRelationTypeValues.find((v) => v === relation) ||
    (() => {
      throw Error("Unexpected relation type: " + relation);
    })()
  );
}
