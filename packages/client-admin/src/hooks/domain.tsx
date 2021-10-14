import {
  AdminDomainsFilter,
  AllDomainsBaseQueryVariables,
  getKey,
  gql,
  useGQLInfiniteQuery,
} from "graph/rq-gql";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { AsyncSelect, AsyncSelectProps } from "../components/AsyncSelect";

export const AllDomainsBaseDoc = gql(/* GraphQL */ `
  query AllDomainsBase(
    $pagination: CursorConnectionArgs!
    $filters: AdminDomainsFilter
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

export const useDomainsBase = () => {
  const [domainsFilter, produceDomainsFilter] =
    useImmer<AdminDomainsFilter | null>(null);
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      AllDomainsBaseDoc,
      (pageParam) => {
        return {
          pagination: {
            first: 20,
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

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

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

  const asOptions = useMemo(() => {
    return domains.map(({ id, label, code }) => {
      return {
        label: domainOptionLabel({ label, code }),
        value: id,
      };
    });
  }, [domains]);

  const filteredOptions = useCallback(
    async (input: string) => {
      return input
        ? asOptions.filter((v) => v.label.includes(input))
        : asOptions;
    },
    [asOptions]
  );

  return {
    domains,
    isFetching,
    isLoading,
    asOptions,
    filteredOptions,
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
}: {
  state?: [
    {
      value: string;
      label: string;
    } | null,
    (value: { value: string; label: string } | null) => void
  ];
  selectProps?: Partial<AsyncSelectProps>;
} = {}) => {
  const {
    isFetching,
    isLoading,
    filteredOptions,
    asOptions,
    domainsFilter,
    produceDomainsFilter,
  } = useDomainsBase();

  const [selectedDomain, setSelectedDomain] =
    state ||
    useState<{
      value: string;
      label: string;
    } | null>(null);

  const selectSingleDomainComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedDomain(selected || null);
        }}
        value={selectedDomain}
        placeholder="Search a domain"
        {...selectProps}
      />
    );
  }, [
    filteredOptions,
    isLoading,
    isFetching,
    asOptions,
    selectedDomain,
    selectProps,
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
  ...selectProps
}: {
  state?: [
    {
      value: string;
      label: string;
    }[],
    (
      value: {
        value: string;
        label: string;
      }[]
    ) => void
  ];
} & Partial<AsyncSelectProps> = {}) => {
  const {
    isFetching,
    isLoading,
    filteredOptions,
    asOptions,
    domainsFilter,
    produceDomainsFilter,
  } = useDomainsBase();

  const [selectedDomains, setSelectedDomains] =
    state ||
    useState<
      {
        value: string;
        label: string;
      }[]
    >([]);

  const selectMultiDomainComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedDomains(selected || []);
        }}
        isMulti
        value={selectedDomains}
        placeholder="Search a domain"
        {...selectProps}
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedDomains]);

  return {
    selectedDomains,
    setSelectedDomains,
    selectMultiDomainComponent,
    domainsFilter,
    produceDomainsFilter,
  };
};
