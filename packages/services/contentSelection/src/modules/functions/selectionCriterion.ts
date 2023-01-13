import type { Content, KC, ModelState } from "api-base";
import { difficulty } from "./difficulty";
import { shuffle, maxBy, minBy } from "lodash-es";
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
    let preferredFlag = false;

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

    tableSim = table.filter((x) => (x.sim ?? 0) > 0.99);

    if (tableSim.length > 0) {
      tableSim = shuffle(tableSim);
      pAVGsim = tableSim[0]?.probSuccessAvg ?? 0.0; //consultar que pasa con esta variable cuando no hay similares (en este caso si no hay similar no se prefiere nada)
      contentSelected.push({
        P: tableSim[0]?.P,
        Msg: {
          label: messages.messageSimilar.label,
          text: messages.messageSimilar.text,
        },
        Preferred: zpd1 <= pAVGsim && pAVGsim <= zpd2 ? true : false,
        Order: 2,
      });
      if (zpd1 <= pAVGsim && pAVGsim <= zpd2) {
        preferredFlag = true;
      }
    }
    //most easier
    const dif2 = difficulty(PU, M); //dif2 difficultad ultimo ejercicio
    tableDifEasy = table
      .filter((x) => (x.sim ?? 1) < 1)
      .filter((c) => (c.diff ?? 0) < (dif2[0] ?? 0));
    if (tableDifEasy.length > 0) {
      const maxSim = maxBy(tableDifEasy, function (o) {
        return o.sim;
      })?.sim; //max value similarity
      let newTableDifEasy = tableDifEasy.filter((x) => x.sim == maxSim); //most easiers and similarity
      const maxDiff = maxBy(newTableDifEasy, function (o) {
        return o.diff;
      })?.diff; //max value difficulty of most similarity
      newTableDifEasy = shuffle(
        newTableDifEasy.filter((x) => x.diff == maxDiff)
      ); //value random of most similarity and most difficulty

      contentSelected.push({
        P: newTableDifEasy[0]?.P,
        Msg: {
          label: messages.messageEasy.label,
          text: messages.messageEasy.text,
        },
        Preferred:
          pAVGsim < zpd1 && pAVGsim != 0.0 && !preferredFlag ? true : false,
        Order: 1,
      });
      if (pAVGsim < zpd1 && pAVGsim != 0.0 && !preferredFlag) {
        preferredFlag = true;
      }
    }
    //most harder
    tableDifHarder = table
      .filter((x) => (x.sim ?? 1) < 1)
      .filter((c) => (c.diff ?? 0) > (dif2[0] ?? 0));

    if (tableDifHarder.length > 0) {
      const maxSim = maxBy(tableDifHarder, function (o) {
        return o.sim;
      })?.sim; //max value similarity
      let newTableDifHarder = tableDifHarder.filter((x) => x.sim == maxSim); //most difficulties and similarity
      const minDiff = minBy(newTableDifHarder, function (o) {
        return o.diff;
      })?.diff; //minim value difficulty of most similarity
      newTableDifHarder = shuffle(
        newTableDifHarder.filter((x) => x.diff == minDiff)
      );

      pAVGdif = newTableDifHarder[0]?.probSuccessAvg ?? 0.0;
      contentSelected.push({
        P: newTableDifHarder[0]?.P,
        Msg: {
          label: messages.messageHarder.label,
          text: messages.messageHarder.text,
        },
        Preferred:
          zpd2 < pAVGsim && pAVGsim != 0.0 && pAVGdif > zpd1 && !preferredFlag
            ? true
            : false,
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
      table = table.filter((x) => (x.diff ?? 0) > 0);
      const ejercicio1 =
        table[Math.floor((Math.random() * table.length) / 4)]?.P; //primero!!
      contentSelected.push({
        P: ejercicio1,
        Msg: {
          label: messages.messageFirst.label,
          text: messages.messageFirst.text,
        },
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
    topicCompletedMsg:
      contentSelected[0] != undefined
        ? { label: "", text: "" }
        : {
            label: messages.messageTopicCompleted.label,
            text: messages.messageTopicCompleted.text,
          },
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
