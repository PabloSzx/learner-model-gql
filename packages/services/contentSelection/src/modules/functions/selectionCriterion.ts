import type { Content, KC, ModelState } from "api-base";
import { difficulty } from "./difficulty";
import { probSuccessAvg } from "./probSuccessAvg";
import { probSuccessMult } from "./probSuccessMult";
import { similarity } from "./similarity";

export const selectionCriterion = (
  P: (Content & {
    kcs: KC[];
  })[],
  PU: (Content & {
    kcs: KC[];
  })[],
  M: ModelState | null
) => {
  const lastExerciseDone = PU[0]?.kcs ?? undefined;
  let contentSelected = []; //array of object with content selected return

  if (lastExerciseDone) {
    const dif = difficulty(P, M);
    const simi = similarity(P, M, lastExerciseDone);
    const pSM = probSuccessMult(P, M);
    const pSA = probSuccessAvg(P, M);
    let table: {
      P: Content & { kcs: KC[] };
      sim: number | undefined;
      diff: number | undefined;
      probSuccessMult: number | undefined;
      probSuccessAvg: number | undefined;
    }[] = [];
    P.map((p, i) =>
      table.push({
        P: p,
        sim: simi[i],
        diff: dif[i],
        probSuccessMult: pSM[i],
        probSuccessAvg: pSA[i],
      })
    );
    //similaridad ESTRUCTURAL (cosine similarity [0,1])
    table = table
      .filter((x) => (x.diff ?? 0) > 0)
      .sort((a, b) => (b.sim ?? 0) - (a.sim ?? 0));
    const tableSim = table.filter((x) => x.sim == 1);
    if (tableSim.length > 0) {
      contentSelected.push({ p: tableSim[0]?.P, msg: "mas similar" });
    }
    //most easier
    const dif2 = difficulty(PU, M);
    const tableDifEasy = table
      .filter((x) => x.sim || 1 < 1)
      .filter((c) => (c.diff ?? 0) < (dif2[0] ?? 0));
    if (tableDifEasy.length > 0) {
      contentSelected.push({ p: tableDifEasy[0]?.P, msg: "mas fácil" });
    }
    //most harder
    const tableDifHarder = table
      .filter((x) => x.sim || 1 < 1)
      .filter((c) => (c.diff ?? 0) > (dif2[0] ?? 0));
    if (tableDifHarder.length > 0) {
      contentSelected.push({ p: tableDifHarder[0]?.P, msg: "mas dificil" });
    }
  } else {
    //first
    let table: {
      P: Content & { kcs: KC[] };
      diff: number | undefined;
      probSuccessMult: number | undefined;
      probSuccessAvg: number | undefined;
    }[] = [];
    const dif = difficulty(P, M);
    const pSM = probSuccessMult(P, M);
    const pSA = probSuccessAvg(P, M);
    P.map((p, i) =>
      table.push({
        P: p,
        diff: dif[i],
        probSuccessMult: pSM[i],
        probSuccessAvg: pSA[i],
      })
    );
    table = table.sort((a, b) => (a.diff ?? 0) - (b.diff ?? 0)); //menor a mayor difficulty
    const ejercicio1 = table[Math.floor(Math.random() * table.length) / 4]?.P; //primero!!
    contentSelected.push({ ejercicio1, msg: "Primer ejercicio " });
  }
  return contentSelected;
};
