import { prisma, PrismaNS, ResolveCursorConnection } from "api-base";
import type { ModelStateConnectionInput } from "./ez.generated";

export function ModelStateConnection(
  { pagination, orderBy, filters }: ModelStateConnectionInput,
  {
    where,
  }: {
    where?: PrismaNS.ModelStateWhereInput;
  } = {}
) {
  return ResolveCursorConnection(pagination, (connection) => {
    return prisma.modelState.findMany({
      ...connection,
      orderBy: {
        id: orderBy?.id === "ASC" ? "asc" : "desc",
      },
      where:
        filters?.creators || filters?.type || where
          ? {
              creator: filters?.creators
                ? {
                    in: filters.creators,
                  }
                : undefined,
              type: filters?.type
                ? {
                    in: filters.type,
                  }
                : undefined,
              ...where,
            }
          : undefined,
    });
  });
}
