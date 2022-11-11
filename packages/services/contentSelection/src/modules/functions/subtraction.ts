import type { Content, KC } from "api-base";

export const subtraction = (
  P: (Content & {
    kcs: KC[];
  })[],
  PU: (Content & {
    kcs: KC[];
  })[]
) => {
  return P.filter((x) => PU.includes(x));
};
