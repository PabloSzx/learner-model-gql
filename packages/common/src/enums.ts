export function enumParser<Enum extends Record<string, string>>(
  enumObject: Enum,
  fallbackValue?: Enum[keyof Enum]
): (value: string) => Enum[keyof Enum] {
  const valuesList = Object.values(enumObject) as Array<Enum[keyof Enum]>;
  const valuesMap = valuesList.reduce<Record<string, Enum[keyof Enum]>>(
    (acum, value) => {
      acum[value] = value;
      return acum;
    },
    {}
  );

  return function parseEnum(value: string) {
    const enumValue = valuesMap[value];

    if (enumValue) return enumValue;

    if (fallbackValue) return fallbackValue;

    throw Error(
      `Invalid enum value: ${value}, possible values: ${valuesList.join()}`
    );
  };
}
