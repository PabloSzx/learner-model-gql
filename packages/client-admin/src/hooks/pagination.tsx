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
      prevPage: {
        get isDisabled() {
          return !pageInfo.current?.hasPreviousPage;
        },
        get isLoading() {
          return pageInfo.current == null;
        },
        onClick() {
          if (!pageInfo.current?.hasPreviousPage) return;

          setPagination({
            before: pageInfo.current?.startCursor,
            last: amount,
          });
        },
      },
      nextPage: {
        get isDisabled() {
          return !pageInfo.current?.hasNextPage;
        },
        get isLoading() {
          return pageInfo.current == null;
        },
        onClick() {
          if (!pageInfo.current?.hasNextPage) return;

          setPagination({
            after: pageInfo.current?.endCursor,
            first: amount,
          });
        },
      },
    };
  }, [pagination, setPagination, pageInfo]);
}
