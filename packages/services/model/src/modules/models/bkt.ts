import { ModelState, Action, KC, Schemas } from "api-base";
import parameters from "../parameters.json";

export const bkt = (
  D: string[],
  M: ModelState | null,
  A: (Action & {
    kcs: KC[];
  })[]
) => {
  const params = Schemas.parametersJson.parse(parameters); //params of json

  const newMJSON = //json of the last model or create
    M?.json ??
    D.reduce(
      (a, v) => ({
        ...a,
        [v]: {
          level:
            params[v]?.known ??
            params["default"]?.known ??
            parameters.default.known ??
            0.1,
          mth: params[v]?.mth ?? parameters.default.mth,
        },
      }),
      {}
    );

  let newModelJSON = Schemas.newModel.parse(newMJSON); //json del modelo que es retornado con BKT aplicado

  if (Object.keys(newModelJSON).length < D.length) {
    //if new kcs are added in the platform, they are added to the model
    newModelJSON = {
      ...newModelJSON,
      ...D.filter(
        (value) => Object.keys(M?.json ?? 0).indexOf(value) < 0
      ).reduce(
        (a, v) => ({
          ...a,
          [v]: {
            level:
              params[v]?.known ??
              params["default"]?.known ??
              parameters.default.known ??
              0.1,
            mth: params[v]?.mth ?? parameters.default.mth,
          },
        }),
        {}
      ),
    };
  }

  for (const act of A) {
    //array of action from oldest to most recent (.slice(0).reverse() innecesary)
    act.kcs.map((kc) => {
      //obtain parameters of knowledge(k), guess(g), slip(s), learn or transference(l) and forget(f) of JSON
      const k =
        newModelJSON?.[kc.code]?.level ??
        params?.[kc?.code]?.known ?? //params.[kc_i] can be undefined
        parameters.default.known; //parameter.default be a Object
      const g = params[kc?.code]?.guess ?? parameters.default.guess;
      const s = params[kc?.code]?.slip ?? parameters.default.slip;
      const l = params[kc?.code]?.learn ?? parameters.default.learn;
      const f = params[kc?.code]?.forget ?? parameters.default.forget;

      let k_posterior = 0;
      act.result == 1 && (Schemas.actionExtras.parse(act.extra).hints ?? 0) == 0
        ? (k_posterior = (k * (1 - s)) / (k * (1 - s) + (1 - k) * g))
        : (k_posterior = (k * s) / (k * s + (1 - k) * (1 - g)));

      const bkt = k_posterior * (1 - f) + (1 - k_posterior) * l;

      if (newModelJSON[kc.code] != undefined) {
        newModelJSON[kc.code]!.level = bkt;
      } //add new kcs
    });
  }

  return newModelJSON;
};
