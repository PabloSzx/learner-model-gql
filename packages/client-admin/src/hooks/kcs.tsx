import {
  AdminKCsFilter,
  AllKCsBaseQueryVariables,
  getKey,
  gql,
  useGQLInfiniteQuery,
} from "graph";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useImmer } from "use-immer";
import {
  AsyncSelect,
  AsyncSelectProps,
  OptionValue,
  SelectRefType,
} from "../components/AsyncSelect";

export const AllKCsBaseDoc = gql(/* GraphQL */ `
  query AllKCsBase(
    $pagination: CursorConnectionArgs!
    $filters: AdminKCsFilter
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

export const useKCsBase = () => {
  const [kcsFilter, produceKCsFilter] = useImmer<AdminKCsFilter | null>(null);
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      AllKCsBaseDoc,
      (pageParam) => {
        return {
          pagination: {
            first: 20,
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

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  const kcs = useMemo(() => {
    if (hasNextPage) return [];

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

  const asOptions = useMemo(() => {
    return kcs.map(({ id, label, code }) => {
      return {
        label: kcOptionLabel({ label, code }),
        value: id,
      };
    });
  }, [kcs]);

  const filteredOptions = useCallback(
    async (input: string) => {
      return input
        ? asOptions.filter((v) => v.label.includes(input))
        : asOptions;
    },
    [asOptions]
  );

  return {
    kcs,
    isFetching,
    isLoading,
    asOptions,
    filteredOptions,
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
}: {
  state?: [OptionValue | null, (value: OptionValue | null) => void];
  selectProps?: Partial<AsyncSelectProps>;
} = {}) => {
  const {
    isFetching,
    isLoading,
    filteredOptions,
    asOptions,
    kcsFilter,
    produceKCsFilter,
  } = useKCsBase();

  const selectRef = useRef<SelectRefType>(null);

  const [selectedKC, setSelectedKC] =
    state || useState<OptionValue | null>(null);

  const selectSingleKCComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedKC(selected || null);
        }}
        value={selectedKC}
        placeholder="Search a KC"
        selectRef={selectRef}
        {...selectProps}
      />
    );
  }, [
    filteredOptions,
    isLoading,
    isFetching,
    asOptions,
    selectedKC,
    selectProps,
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
}: {
  state?: [OptionValue[], (value: OptionValue[]) => void];
  selectProps?: Partial<AsyncSelectProps>;
} = {}) => {
  const {
    isFetching,
    isLoading,
    filteredOptions,
    asOptions,
    kcsFilter,
    produceKCsFilter,
  } = useKCsBase();

  const selectRef = useRef<SelectRefType>(null);

  const [selectedKCs, setSelectedKCs] = state || useState<OptionValue[]>([]);

  const selectMultiKCComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedKCs(selected || []);
        }}
        isMulti
        value={selectedKCs}
        placeholder="Search a KC"
        selectRef={selectRef}
        {...selectProps}
      />
    );
  }, [
    filteredOptions,
    isLoading,
    isFetching,
    asOptions,
    selectedKCs,
    selectProps,
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
