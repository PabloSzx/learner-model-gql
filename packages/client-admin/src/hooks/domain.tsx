import { useLatestRef } from "@chakra-ui/react";
import {
  AdminDomainsFilter,
  AllDomainsBaseQueryVariables,
  getKey,
  gql,
  useGQLInfiniteQuery,
} from "graph";
import { useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import {
  AsyncSelectProps,
  OptionValue,
  Select,
} from "../components/AsyncSelect";

export const AllDomainsBaseDoc = gql(/* GraphQL */ `
  query AllDomainsBase(
    $pagination: CursorConnectionArgs!
    $filters: AdminDomainsFilter!
  ) {
    adminDomain {
      allDomains(pagination: $pagination, filters: $filters) {
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

export interface UseDomainsBaseOptions {
  initialDomainsFilter: AdminDomainsFilter;
  limit: number;
}

export const useDomainsBase = ({
  initialDomainsFilter,
  limit,
}: UseDomainsBaseOptions) => {
  const [domainsFilter, produceDomainsFilter] =
    useImmer<AdminDomainsFilter>(initialDomainsFilter);
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      AllDomainsBaseDoc,
      (pageParam) => {
        return {
          pagination: {
            first: 50,
            after: pageParam,
          },
          filters: domainsFilter,
        };
      },
      {
        getNextPageParam({
          adminDomain: {
            allDomains: {
              pageInfo: { hasNextPage, endCursor },
            },
          },
        }) {
          return hasNextPage ? endCursor : null;
        },
        staleTime: 5000,
        queryKey: getKey(AllDomainsBaseDoc, {
          filters: domainsFilter,
        } as AllDomainsBaseQueryVariables),
      }
    );

  const domains = useMemo(() => {
    const domains: Record<
      string,
      {
        id: string;
        code: string;
        label: string;
      }
    > = {};

    for (const domain of data?.pages.flatMap(
      (v) => v.adminDomain.allDomains.nodes
    ) || []) {
      domains[domain.id] = domain;
    }

    return Object.values(domains);
  }, [data]);

  const domainsAmount = useLatestRef(domains.length);

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage && domainsAmount.current < limit) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching, limit, domainsAmount]);

  const asOptions = useMemo(() => {
    return domains.map(({ id, label, code }) => {
      return {
        label: domainOptionLabel({ label, code }),
        value: id,
      };
    });
  }, [domains]);

  return {
    domains,
    isFetching,
    isLoading,
    asOptions,
    domainsFilter,
    produceDomainsFilter,
  };
};

export const domainOptionLabel = ({
  code,
  label,
}: {
  code: string;
  label: string;
}) => `${code} | ${label}`;

export const useSelectSingleDomain = ({
  state,
  selectProps,
  domainsBase,
}: {
  state?: [OptionValue | null, (value: OptionValue | null) => void];
  selectProps?: Partial<AsyncSelectProps>;
  domainsBase: UseDomainsBaseOptions;
}) => {
  const {
    isFetching,
    isLoading,
    asOptions,
    domainsFilter,
    produceDomainsFilter,
  } = useDomainsBase(domainsBase);

  const [selectedDomain, setSelectedDomain] =
    state || useState<OptionValue | null>(null);

  const selectSingleDomainComponent = useMemo(() => {
    return (
      <Select
        isLoading={isFetching}
        options={asOptions}
        onChange={(selected) => {
          setSelectedDomain(selected || null);
        }}
        value={selectedDomain}
        placeholder="Search a domain"
        inputValue={domainsFilter.textSearch || ""}
        onInputChange={(value) => {
          produceDomainsFilter((draft) => {
            draft.textSearch = value;
          });
        }}
        {...selectProps}
      />
    );
  }, [
    isLoading,
    isFetching,
    asOptions,
    selectedDomain,
    selectProps,
    domainsFilter,
    produceDomainsFilter,
  ]);

  return {
    selectedDomain,
    setSelectedDomain,
    selectSingleDomainComponent,
    domainsFilter,
    produceDomainsFilter,
  };
};

export const useSelectMultiDomains = ({
  state,
  selectProps,
  domainsBase,
}: {
  state?: [OptionValue[], (value: OptionValue[]) => void];
  selectProps?: Partial<AsyncSelectProps>;
  domainsBase: UseDomainsBaseOptions;
}) => {
  const {
    isFetching,
    isLoading,
    asOptions,
    domainsFilter,
    produceDomainsFilter,
  } = useDomainsBase(domainsBase);

  const [selectedDomains, setSelectedDomains] =
    state || useState<OptionValue[]>([]);

  const selectMultiDomainComponent = useMemo(() => {
    return (
      <Select
        isLoading={isFetching}
        options={asOptions}
        onChange={(selected) => {
          setSelectedDomains(selected || []);
        }}
        isMulti
        value={selectedDomains}
        placeholder="Search a domain"
        inputValue={domainsFilter.textSearch || ""}
        onInputChange={(v) => {
          produceDomainsFilter((draft) => {
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
    selectedDomains,
    domainsFilter,
    produceDomainsFilter,
  ]);

  return {
    selectedDomains,
    setSelectedDomains,
    selectMultiDomainComponent,
    domainsFilter,
    produceDomainsFilter,
  };
};
