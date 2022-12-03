import { Content, KC, ModelState, Schemas } from "api-base";

export const probSuccessAvg = (
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
  const probSS = arrayKClevel.map((c) => {
    return c.reduce((a, b) => (a ?? 1) + (b ?? 1), 0);
  });
  const probSAvg = probSS.map((prob, i) => {
    return (prob ?? 0) / (arrayKClevel[i]?.length ?? 1);
  });
  return probSAvg;
};
