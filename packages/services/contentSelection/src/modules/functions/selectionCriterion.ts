import type { Content, KC, ModelState } from "api-base";
import { difficulty } from "./difficulty";
import { probSuccessAvg } from "./probSuccessAvg";
import { probSuccessMult } from "./probSuccessMult";
import { similarity } from "./similarity";
import messages from "../functions/messages.json";

export const selectionCriterion = (
  oldP: (Content & {
    kcs: KC[];
  })[],
  P: (Content & {
    kcs: KC[];
  })[],
  PU: (Content & {
    kcs: KC[];
  })[],
  M: ModelState | null,
  zpd1: number,
  zpd2: number
) => {
  const lastExerciseDone = PU[0]?.kcs;
  let contentSelected = []; //array of object with content selected return
  let pAVGsim = 0.0;
  let pAVGdif = 0.0;

  let table: {
    P: Content & { kcs: KC[] };
    sim: number | undefined;
    diff: number | undefined;
    probSuccessMult: number | undefined;
    probSuccessAvg: number | undefined;
  }[] = [];

  let tableSim: {
    P: Content & { kcs: KC[] };
    sim: number | undefined;
    diff: number | undefined;
    probSuccessMult: number | undefined;
    probSuccessAvg: number | undefined;
  }[] = [];
  let tableDifEasy: {
    P: Content & { kcs: KC[] };
    sim: number | undefined;
    diff: number | undefined;
    probSuccessMult: number | undefined;
    probSuccessAvg: number | undefined;
  }[] = [];
  let tableDifHarder: {
    P: Content & { kcs: KC[] };
    sim: number | undefined;
    diff: number | undefined;
    probSuccessMult: number | undefined;
    probSuccessAvg: number | undefined;
  }[] = [];

  if (lastExerciseDone && M) {
    //preguntar lo de M!!!
    const dif = difficulty(P, M);
    const simi = similarity(P, M, lastExerciseDone);
    const pSM = probSuccessMult(P, M);
    const pSA = probSuccessAvg(P, M);

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

    tableSim = table.filter((x) => x.sim == 1);

    if (tableSim.length > 0) {
      pAVGsim = tableSim[0]?.probSuccessAvg ?? 0.0;
      console.log(pAVGsim);
      contentSelected.push({
        P: tableSim[0]?.P,
        Msg: messages.messageSimilar,
        Preferred: zpd1 <= pAVGsim && pAVGsim <= zpd2 ? true : false,
        Order: 2,
      });
    }
    //most easier
    const dif2 = difficulty(PU, M); //dif2 difficultad ultimo ejercicio
    tableDifEasy = table
      .filter((x) => (x.sim ?? 1) < 1)
      .filter((c) => (c.diff ?? 0) < (dif2[0] ?? 0));
    if (tableDifEasy.length > 0) {
      contentSelected.push({
        P: tableDifEasy[0]?.P,
        Msg: messages.messageEasy,
        Preferred: pAVGsim < zpd1 && pAVGsim != 0.0 ? true : false, //si zpd = 0.0 se prefiere la opción más fácil????
        Order: 1,
      });
    }
    //most harder
    tableDifHarder = table
      .filter((x) => (x.sim ?? 1) < 1)
      .filter((c) => (c.diff ?? 0) > (dif2[0] ?? 0));
    if (tableDifHarder.length > 0) {
      pAVGdif = tableDifHarder[0]?.probSuccessAvg ?? 0.0;
      contentSelected.push({
        P: tableDifHarder[0]?.P,
        Msg: messages.messageHarder,
        Preferred:
          zpd2 < pAVGsim && pAVGsim != 0.0 && pAVGdif > zpd1 ? true : false,
        Order: 3,
      });
    }
  } else {
    //first
    if (M) {
      const dif = difficulty(P, M);
      const pSM = probSuccessMult(P, M);
      const pSA = probSuccessAvg(P, M);
      P.map((p, i) =>
        table.push({
          P: p,
          sim: undefined,
          diff: dif[i],
          probSuccessMult: pSM[i],
          probSuccessAvg: pSA[i],
        })
      );

      table = table.sort((a, b) => (a.diff ?? 0) - (b.diff ?? 0)); //menor a mayor difficulty

      const ejercicio1 = table[Math.floor(Math.random() * table.length) / 4]?.P; //primero!!
      contentSelected.push({
        P: ejercicio1,
        Msg: messages.messageFirst,
        Preferred: true,
        Order: 1,
      });
    }
  }
  const Preferred = contentSelected
    .map((x) => {
      return x.Preferred;
    })
    .reduce((a, b) => a || b, false);

  if (!Preferred && contentSelected[0] != undefined) {
    contentSelected[0].Preferred = true;
  }

  return {
    contentResult: contentSelected,
    model: M?.json,
    oldP: oldP.map((p) => {
      return p.code;
    }),
    newP: P.map((p) => {
      return p.code;
    }),
    PU: PU.map((p) => {
      return p.code;
    }),

    pAVGsim: pAVGsim,
    pAVGdif: pAVGdif,
    table: table.map((x) => {
      return {
        contentCode: x.P.code,
        sim: x.sim,
        diff: x.diff,
        probSuccessAvg: x.probSuccessAvg,
        probSuccessMult: x.probSuccessMult,
      };
    }),
    tableSim: tableSim.map((x) => {
      return {
        contentCode: x.P.code,
        sim: x.sim,
        diff: x.diff,
        probSuccessAvg: x.probSuccessAvg,
        probSuccessMult: x.probSuccessMult,
      };
    }),
    tableDifEasy: tableDifEasy.map((x) => {
      return {
        contentCode: x.P.code,
        sim: x.sim,
        diff: x.diff,
        probSuccessAvg: x.probSuccessAvg,
        probSuccessMult: x.probSuccessMult,
      };
    }),
    tableDifHarder: tableDifHarder.map((x) => {
      return {
        contentCode: x.P.code,
        sim: x.sim,
        diff: x.diff,
        probSuccessAvg: x.probSuccessAvg,
        probSuccessMult: x.probSuccessMult,
      };
    }),
  };
};
