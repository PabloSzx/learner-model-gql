import { ModelState, Content, KC, Schemas } from "api-base";
//sumatoria de de todos los KC de cada contenido
export const difficulty = (
  C: (
    | Content & {
        kcs: KC[];
      }
  )[],
  M: ModelState | null
) => {
  const stateJSON = Schemas.stateJson.parse(M?.json);

  const kcsCode = C.map((p) => {
    //[c1,c2,..., c_n] => c1 = [kc1Level, kc2level, ...]
    return p?.kcs.map((kc) =>
      Math.max(
        (stateJSON?.[kc.code]?.mth ?? 0.95) -
          (stateJSON?.[kc.code]?.level ?? 0.2),
        0
      )
    );
  }); //array of array

  const difficultyLevels = kcsCode.map((c) => {
    return c?.reduce((a, b) => a + b, 0);
  });

  return difficultyLevels;
};
