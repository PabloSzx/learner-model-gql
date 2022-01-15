import { useLatestRef } from "@chakra-ui/react";
import {
  AdminKCsFilter,
  AllKCsBaseQueryVariables,
  getKey,
  gql,
  useGQLInfiniteQuery,
} from "graph";
import { useEffect, useMemo, useRef, useState } from "react";
import { useImmer } from "use-immer";
import {
  AsyncSelectProps,
  OptionValue,
  Select,
  SelectRefType,
} from "../components/AsyncSelect";

export const AllKCsBaseDoc = gql(/* GraphQL */ `
  query AllKCsBase(
    $pagination: CursorConnectionArgs!
    $filters: AdminKCsFilter!
  ) {
    adminDomain {
      allKCs(pagination: $pagination, filters: $filters) {
        nodes {
          id
          code
          label
        }
        ...Pagination
      }
    }
  }
`);

export interface KCsBaseOptions {
  initialKcsFilter: AdminKCsFilter;
  limit: number;
}

export const useKCsBase = ({ initialKcsFilter, limit }: KCsBaseOptions) => {
  const [kcsFilter, produceKCsFilter] =
    useImmer<AdminKCsFilter>(initialKcsFilter);
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      AllKCsBaseDoc,
      (pageParam) => {
        return {
          pagination: {
            first: 50,
            after: pageParam,
          },
          filters: kcsFilter,
        };
      },
      {
        getNextPageParam({
          adminDomain: {
            allKCs: {
              pageInfo: { hasNextPage, endCursor },
            },
          },
        }) {
          return hasNextPage ? endCursor : null;
        },
        staleTime: 5000,
        queryKey: getKey(AllKCsBaseDoc, {
          filters: kcsFilter,
        } as AllKCsBaseQueryVariables),
      }
    );

  const kcs = useMemo(() => {
    const kcs: Record<
      string,
      {
        id: string;
        code: string;
        label: string;
      }
    > = {};

    for (const kc of data?.pages.flatMap((v) => v.adminDomain.allKCs.nodes) ||
      []) {
      kcs[kc.id] = kc;
    }

    return Object.values(kcs);
  }, [data, hasNextPage]);

  const kcsAmount = useLatestRef(kcs.length);

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage && kcsAmount.current < limit) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching, kcsAmount, limit]);

  const asOptions = useMemo(() => {
    return kcs.map(({ id, label, code }) => {
      return {
        label: kcOptionLabel({ label, code }),
        value: id,
      };
    });
  }, [kcs]);

  return {
    kcs,
    isFetching,
    isLoading,
    asOptions,
    kcsFilter,
    produceKCsFilter,
  };
};

export const kcOptionLabel = ({
  code,
  label,
}: {
  code: string;
  label: string;
}) => `${code} | ${label}`;

export const useSelectSingleKC = ({
  state,
  selectProps,
  kcsBase,
}: {
  state?: [OptionValue | null, (value: OptionValue | null) => void];
  selectProps?: Partial<AsyncSelectProps>;
  kcsBase: KCsBaseOptions;
}) => {
  const { isFetching, isLoading, asOptions, kcsFilter, produceKCsFilter } =
    useKCsBase(kcsBase);

  const selectRef = useRef<SelectRefType>(null);

  const [selectedKC, setSelectedKC] =
    state || useState<OptionValue | null>(null);

  const selectSingleKCComponent = useMemo(() => {
    return (
      <Select
        isLoading={isFetching}
        options={asOptions}
        onChange={(selected) => {
          setSelectedKC(selected || null);
        }}
        value={selectedKC}
        placeholder="Search a KC"
        selectRef={selectRef}
        inputValue={kcsFilter.textSearch || ""}
        onInputChange={(v) => {
          produceKCsFilter((draft) => {
            draft.textSearch = v;
          });
        }}
        {...selectProps}
      />
    );
  }, [
    isLoading,
    isFetching,
    asOptions,
    selectedKC,
    selectProps,
    kcsFilter,
    produceKCsFilter,
  ]);

  return {
    selectedKC,
    setSelectedKC,
    selectSingleKCComponent,
    kcsFilter,
    produceKCsFilter,
    selectRef,
  };
};

export const useSelectMultiKCs = ({
  state,
  selectProps,
  kcsBase,
}: {
  state?: [OptionValue[], (value: OptionValue[]) => void];
  selectProps?: Partial<AsyncSelectProps>;
  kcsBase: KCsBaseOptions;
}) => {
  const { isFetching, isLoading, asOptions, kcsFilter, produceKCsFilter } =
    useKCsBase(kcsBase);

  const selectRef = useRef<SelectRefType>(null);

  const [selectedKCs, setSelectedKCs] = state || useState<OptionValue[]>([]);

  const selectMultiKCComponent = useMemo(() => {
    return (
      <Select
        isLoading={isFetching}
        options={asOptions}
        onChange={(selected) => {
          setSelectedKCs(selected || []);
        }}
        isMulti
        value={selectedKCs}
        placeholder="Search a KC"
        selectRef={selectRef}
        inputValue={kcsFilter.textSearch || ""}
        onInputChange={(v) => {
          produceKCsFilter((draft) => {
            draft.textSearch = v;
          });
        }}
        {...selectProps}
      />
    );
  }, [
    isLoading,
    isFetching,
    asOptions,
    selectedKCs,
    selectProps,
    kcsFilter,
    produceKCsFilter,
  ]);

  return {
    selectedKCs,
    setSelectedKCs,
    selectMultiKCComponent,
    kcsFilter,
    produceKCsFilter,
    selectRef,
    isFetching,
    isLoading,
  };
};
