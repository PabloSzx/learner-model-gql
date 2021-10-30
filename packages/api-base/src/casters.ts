import isInt, { IsIntOptions } from "validator/lib/isInt.js";

const NonNegativeIntOpts: IsIntOptions = {
  min: 0,
};

export function toNonNegativeInteger(value: unknown): number {
  if (typeof value === "number" && Number.isInteger(value) && value >= 0) {
    return value;
  } else if (typeof value === "string" && isInt(value, NonNegativeIntOpts)) {
    return ~~value;
  }

  throw new Error(`Invalid Non-Negative Numeric ID: '${value}'`);
}

export function toNonNegativeIntegerString(value: unknown): string {
  return toNonNegativeInteger(value).toString();
}
