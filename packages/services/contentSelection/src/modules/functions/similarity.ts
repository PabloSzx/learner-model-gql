import { Content, KC, ModelState, Schemas } from "api-base";

export const similarity = (
  C: (Content & {
    kcs: KC[];
  })[],
  M: ModelState | null,
  lastExerciseDone: KC[] | undefined
) => {
  //[kc1,kc2,..., kcn]
  const kcs = Object.keys(Schemas.stateJson.parse(M?.json)); //all kcs (array)
  const codeKC = lastExerciseDone?.map((x) => x.code); // lastExerciseDone array of code kcs
  const C1 = kcs.map((x) => (codeKC?.includes(x) ? 1 : 0)); //array [0,1,...] when 1 is kc_i in C1

  function CnKC(Ckcs: KC[], kcs: string[]) {
    //array of arrays to 0's and 1's
    const codeKCn = Ckcs?.map((x) => x.code); // lastExerciseDone array of code kcs
    return kcs.map((x) => (codeKCn?.includes(x) ? 1 : 0)); //array [0,1,...] when 1 is kc_i in C1
  }

  const Cn = C.map((content) => {
    return CnKC(content.kcs, kcs);
  });

  function validateCi(num: 1 | 0 | undefined) {
    if (num == undefined) {
      return 0;
    }
    return num;
  }

  function cosineSimilarity(C1: (1 | 0)[], Ci: (1 | 0)[]) {
    const AxB = C1.map((x, i) => x * validateCi(Ci[i])).reduce(
      (a, b) => a + b,
      0
    );
    const normA = Math.sqrt(C1.map((x) => x * x).reduce((a, b) => a + b, 0));
    const normB = Math.sqrt(Ci.map((x) => x * x).reduce((a, b) => a + b, 0));
    return AxB / (normA * normB);
  }

  const similarity = Cn.map((Ci) => cosineSimilarity(C1, Ci));

  return similarity; //return index of best similarity
};
