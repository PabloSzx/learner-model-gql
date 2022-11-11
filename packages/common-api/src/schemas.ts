import { z } from "zod";

const actionExtrasObject = z
  .object({
    attemps: z.number(),
    hints: z.number(),
  })
  .partial();

export const actionExtras = actionExtrasObject
  .nullish()
  .transform((value) => value || {});

export const stateJson = z.record(
  z.object({
    level: z.number(),
    mth: z.number(),
  })
);

export const parametersJson = z.record(
  z.object({
    known: z.number(),
    guess: z.number(),
    slip: z.number(),
    learn: z.number(),
    forget: z.number(),
    mth: z.number(),
  })
);

export const newModel = z.record(
  z.object({
    level: z.number(),
    mth: z.number(),
  })
);
