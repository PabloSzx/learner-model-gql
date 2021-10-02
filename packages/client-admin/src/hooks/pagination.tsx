import type { CursorConnectionArgs, PageInfo } from "graph/rq-gql";
import { useMemo, useRef, useState } from "react";

export function useCursorPagination({ amount = 20 }: { amount?: number } = {}) {
  const [pagination, setPagination] = useState<CursorConnectionArgs>(() => {
    return {
      first: amount,
    };
  });

  const pageInfo = useRef<PageInfo | undefined>();

  return useMemo(() => {
    return {
      pagination,
      pageInfo,
      leftPagination: {
        get isDisabled() {
          return !pageInfo.current?.hasPreviousPage;
        },
        get isLoading() {
          return pageInfo.current == null;
        },
        onClick() {
          setPagination({
            before: pageInfo.current?.startCursor,
            last: amount,
          });
        },
        "aria-label": "Pagina Anterior",
      },
      rightPagination: {
        get isDisabled() {
          return !pageInfo.current?.hasNextPage;
        },
        get isLoading() {
          return pageInfo.current == null;
        },
        onClick() {
          setPagination({
            after: pageInfo.current?.endCursor,
            first: amount,
          });
        },
        "aria-label": "Pagina Siguiente",
      },
    };
  }, [pagination, setPagination, pageInfo]);
}
