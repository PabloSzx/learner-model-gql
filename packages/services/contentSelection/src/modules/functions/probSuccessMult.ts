import { Content, KC, ModelState, Schemas } from "api-base";

export const probSuccessMult = (
  C: (Content & {
    kcs: KC[];
  })[],
  M: ModelState | null
) => {
  const stateJSON = Schemas.stateJson.parse(M?.json);
  const arrayKClevel = C.map((c) => {
    return c.kcs.map((kc) => {
      return stateJSON?.[kc.code]?.level;
    });
  });

  const probSM = arrayKClevel.map((c) => {
    return c.reduce((a, b) => (a ?? 1) * (b ?? 1), 1);
  });
  return probSM;
};
