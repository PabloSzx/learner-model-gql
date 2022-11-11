import type { Content, KC } from "api-base";

export const selections = (
  P: (Content & {
    kcs: KC[];
  })[],
  PU: (Content & {
    kcs: KC[];
  })[],
  difficultyLevel: void[],
  similarity: number[]
) => {
  const newMJSON = P.map((x, i) => {
    x.code, PU[i]?.createdAt, difficultyLevel[i], similarity[i];
  });
  //const lastExerciseDone=PU[0]
  return newMJSON;
};
