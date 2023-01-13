import type { Content, KC } from "api-base";

export const subtraction = (
  P: (Content & {
    kcs: KC[];
  })[],
  PU: (
    | Content & {
        kcs: KC[];
      }
  )[]
) => {
  const pIndex = P.map((p) => {
    return p.id;
  });
  const puIndex = PU.map((p) => {
    return p?.id;
  });

  const subtractionIndex = pIndex.filter((x) => {
    return !puIndex.includes(x);
  });

  const subtractionContent = P.filter((x) => subtractionIndex.includes(x.id));

  return subtractionContent;
};
