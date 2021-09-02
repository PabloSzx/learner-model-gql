import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import isInt, { IsIntOptions } from "validator/lib/isInt.js";

import { toNonNegativeInteger, toNonNegativeIntegerString } from "./casters";

const NonNegativeIntOpts: IsIntOptions = {
  min: 0,
};

export const IntID = new GraphQLScalarType({
  name: "IntID",
  description:
    "ID that parses as non-negative integer, serializes to string, and can be passed as string or number",

  parseValue(value) {
    return toNonNegativeInteger(value);
  },
  serialize(value): string {
    return toNonNegativeIntegerString(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      const value = ~~ast.value;
      if (value >= 0) return value;

      throw new Error(`Invalid Non-Negative Numeric ID: '${ast.value}'`);
    } else if (ast.kind === Kind.STRING) {
      if (isInt(ast.value, NonNegativeIntOpts)) return ~~ast.value;

      throw new GraphQLError(`Invalid Non-Negative Numeric ID: '${ast.value}'`);
    }
    throw new GraphQLError(
      `Can only validate Integer-like values but got a: ${ast.kind}`
    );
  },
});
