import { ModelState, Content, KC, Schemas } from "api-base";
//sumatoria de de todos los KC de cada contenido
export const difficulty = (
  C: (Content & {
    kcs: KC[];
  })[],
  M: ModelState | null
) => {
  const stateJSON = Schemas.stateJson.parse(M?.json);
  const difficultyLevels = C.map((c) => {
    c.kcs.reduce(
      (kcFirst, kcSecond) =>
        Math.max(
          (stateJSON?.[kcFirst]?.mth ?? 0) - (stateJSON?.[kcFirst]?.level ?? 0),
          0
        ) +
        Math.max(
          (stateJSON?.[kcSecond.code]?.mth ?? 0) -
            (stateJSON?.[kcSecond.code]?.level ?? 0),
          0
        ),
      //(stateJSON?.[kcFirst]?.mth ?? 0)+(1 - (stateJSON?.[kcSecond.code]?.level ?? 0)),
      0
    );
  });

  return difficultyLevels;
};
