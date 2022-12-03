import { ModelState, Content, KC, Schemas } from "api-base";
//sumatoria de 1-level del KC_i de todos los KC de cada contenido
export const difficulty2 = (
  C: (Content & {
    kcs: KC[];
  })[],
  M: ModelState | null
) => {
  const stateJSON = Schemas.stateJson.parse(M?.json);
  const difficultyLevels = C.map((c) => {
    c.kcs.reduce(
      (kcFirst, kcSecond) =>
        1 -
        (stateJSON?.[kcFirst]?.level ?? 0) +
        (1 - (stateJSON?.[kcSecond.code]?.level ?? 0)),
      0
    );
  });

  return difficultyLevels;
};
