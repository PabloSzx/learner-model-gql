import { AllVerbNamesQuery, gql } from "graph";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGQLInfiniteQuery } from "rq-gql";
import {
  AsyncSelect,
  AsyncSelectProps,
  OptionValue,
} from "../components/AsyncSelect";

export type VerbInfo =
  AllVerbNamesQuery["adminActions"]["allActionsVerbs"]["nodes"][number];

export const useAllVerbNames = () => {
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      gql(/* GraphQL */ `
        query AllVerbNames($pagination: CursorConnectionArgs!) {
          adminActions {
            allActionsVerbs(pagination: $pagination) {
              nodes {
                id
                name
              }
              ...Pagination
            }
          }
        }
      `),
      (pageParam) => {
        return {
          pagination: {
            first: 20,
            after: pageParam,
          },
        };
      }
    );

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  const actionVerbs = useMemo(() => {
    const verbs: Record<string, VerbInfo> = {};

    for (const verb of data?.pages.flatMap(
      (v) => v.adminActions.allActionsVerbs.nodes
    ) || []) {
      verbs[verb.id] = verb;
    }

    return Object.values(verbs);
  }, [data]);

  const asOptions = useMemo(() => {
    return actionVerbs.map(({ id, name: label }) => {
      return {
        label,
        value: id,
      };
    });
  }, [actionVerbs]);

  const filteredOptions = useCallback(
    async (input: string) => {
      return input
        ? asOptions.filter((v) => v.label.includes(input))
        : asOptions;
    },
    [asOptions]
  );

  return {
    topics: actionVerbs,
    isFetching,
    isLoading,
    asOptions,
    filteredOptions,
  };
};

export const useSelectMultiVerbs = ({
  state,
  ...selectProps
}: {
  state?: [OptionValue[], (value: OptionValue[]) => void];
} & Partial<AsyncSelectProps> = {}) => {
  const { isFetching, isLoading, filteredOptions, asOptions } =
    useAllVerbNames();

  const [selectedVerbs, setSelectedVerbs] =
    state || useState<OptionValue[]>([]);

  const selectMultiVerbComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedVerbs(selected || []);
        }}
        isMulti
        value={selectedVerbs}
        placeholder="Search a verb"
        {...selectProps}
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedVerbs]);

  return {
    selectedVerbs,
    selectMultiVerbComponent,
    setSelectedVerbs,
  };
};
