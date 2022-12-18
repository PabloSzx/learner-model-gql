import type { Content, KC, ModelState } from "api-base";
import { difficulty } from "./difficulty";
import { probSuccessAvg } from "./probSuccessAvg";
import { probSuccessMult } from "./probSuccessMult";
import { similarity } from "./similarity";
import messages from "../functions/messages.json";

export const selectionCriterion = (
  P: (Content & {
    kcs: KC[];
  })[],
  PU: (
    | Content & {
        kcs: KC[];
      }
  )[],
  M: ModelState | null,
  zpd1: number,
  zpd2: number
) => {
  const lastExerciseDone = PU[0]?.kcs;
  //console.log("lastExerciseDone");
  //console.log(lastExerciseDone);
  let contentSelected = []; //array of object with content selected return

  if (lastExerciseDone && M) {
    //preguntar lo de M!!!
    const dif = difficulty(P, M);
    const simi = similarity(P, M, lastExerciseDone);
    const pSM = probSuccessMult(P, M);
    const pSA = probSuccessAvg(P, M);
    //const pAVGlastExerciseDone =
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
    //console.log("table!!");
    //console.log(table);
    //similaridad ESTRUCTURAL (cosine similarity [0,1])
    table = table
      .filter((x) => (x.diff ?? 0) > 0)
      .sort((a, b) => (b.sim ?? 0) - (a.sim ?? 0));

    const tableSim = table.filter((x) => x.sim == 1);
    //console.log("model");
    //console.log(M);
    //console.log("table filter similarity!!");
    //console.log(table);
    console.log("zpd new");
    console.log(zpd1);
    console.log(zpd2);
    console.log("zpd similar");
    let zpdSimilar = 0.0;
    //console.log(zpdSimilar);
    if (tableSim.length > 0) {
      zpdSimilar = tableSim[0]?.probSuccessAvg ?? 0.0;
      console.log(zpdSimilar);
      contentSelected.push({
        P: tableSim[0]?.P,
        Msg: messages.messageSimilar,
        Preferred: zpd1 <= zpdSimilar && zpdSimilar <= zpd2 ? true : false,
        Order: 2,
      });
    }
    //most easier
    const dif2 = difficulty(PU, M); //dif2 difficultad ultimo ejercicio
    const tableDifEasy = table
      .filter((x) => x.sim || 1 < 1)
      .filter((c) => (c.diff ?? 0) < (dif2[0] ?? 0));
    if (tableDifEasy.length > 0) {
      contentSelected.push({
        P: tableDifEasy[0]?.P,
        Msg: messages.messageEasy,
        Preferred: zpdSimilar > zpd2 && zpdSimilar != 0.0 ? true : false, //si zpd = 0.0 se prefiere la opción más fácil????
        Order: 1,
      });
    }
    //most harder
    const tableDifHarder = table
      .filter((x) => x.sim || 1 < 1)
      .filter((c) => (c.diff ?? 0) > (dif2[0] ?? 0));
    if (tableDifHarder.length > 0) {
      contentSelected.push({
        P: tableDifHarder[0]?.P,
        Msg: messages.messageHarder,
        Preferred: zpd1 > zpdSimilar && zpdSimilar != 0.0 ? true : false,
        Order: 3,
      });
    }
  } else {
    //first
    if (M) {
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

      console.log(table);
      console.log("table");
      table = table.sort((a, b) => (a.diff ?? 0) - (b.diff ?? 0)); //menor a mayor difficulty
      //console.log("table order by difficulty");
      //console.log(table);
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
  //console.log("paso por el if");
  //console.log(contentSelected);
  return contentSelected;
};
