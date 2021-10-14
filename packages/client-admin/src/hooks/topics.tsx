import {
  AdminTopicsFilter,
  AllTopicsBaseQuery,
  AllTopicsBaseQueryVariables,
  getKey,
  gql,
} from "graph/rq-gql";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useImmer } from "use-immer";
import { AsyncSelect, AsyncSelectProps } from "../components/AsyncSelect";
import { rqGQLClient } from "../rqClient";

export type TopicInfo =
  AllTopicsBaseQuery["adminDomain"]["allTopics"]["nodes"][number];

export const AllTopicsBaseDoc = gql(/* GraphQL */ `
  query AllTopicsBase(
    $pagination: CursorConnectionArgs!
    $filters: AdminTopicsFilter
  ) {
    adminDomain {
      allTopics(pagination: $pagination, filters: $filters) {
        nodes {
          id
          code
          label
          domain {
            id
            code
            label
          }
          parent {
            id
            code
            label
          }
          project {
            id
            code
            label
          }
        }
        ...Pagination
      }
    }
  }
`);

export type AllTopicsOptions = { jsFilter?: (topic: TopicInfo) => boolean };

export const useAllTopics = ({ jsFilter }: AllTopicsOptions = {}) => {
  const [topicsFilter, produceTopicsFilter] =
    useImmer<AdminTopicsFilter | null>(null);
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useInfiniteQuery<AllTopicsBaseQuery, Error>(
      getKey(AllTopicsBaseDoc, {
        filters: topicsFilter,
      } as AllTopicsBaseQueryVariables),
      ({ pageParam }) => {
        return rqGQLClient.fetchGQL<
          AllTopicsBaseQuery,
          AllTopicsBaseQueryVariables
        >(AllTopicsBaseDoc, {
          pagination: {
            first: 20,
            after: pageParam,
          },
          filters: topicsFilter,
        })();
      },
      {
        getNextPageParam({
          adminDomain: {
            allTopics: {
              pageInfo: { hasNextPage, endCursor },
            },
          },
        }) {
          return hasNextPage ? endCursor : null;
        },
        staleTime: 5000,
      }
    );

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  const topics = useMemo(() => {
    const topics: Record<string, TopicInfo> = {};

    for (const topic of data?.pages.flatMap(
      (v) => v.adminDomain.allTopics.nodes
    ) || []) {
      if (jsFilter) {
        if (jsFilter(topic)) {
          topics[topic.id] = topic;
        }
      } else {
        topics[topic.id] = topic;
      }
    }

    return Object.values(topics);
  }, [data, jsFilter]);

  const asOptions = useMemo(() => {
    return topics.map(({ id, label, code }) => {
      return {
        label: topicOptionLabel({ label, code }),
        value: id,
      };
    });
  }, [topics]);

  const filteredOptions = useCallback(
    async (input: string) => {
      return input
        ? asOptions.filter((v) => v.label.includes(input))
        : asOptions;
    },
    [asOptions]
  );

  return {
    topics,
    isFetching,
    isLoading,
    asOptions,
    filteredOptions,
    topicsFilter,
    produceTopicsFilter,
  };
};

export const topicOptionLabel = ({
  code,
  label,
}: {
  code: string;
  label: string;
}) => `${code} | ${label}`;

export const useSelectSingleTopic = ({
  state,
  topics,
  selectProps,
}: {
  state?: [
    {
      value: string;
      label: string;
    } | null,
    (value: { value: string; label: string } | null) => void
  ];
  topics?: AllTopicsOptions;
  selectProps?: Partial<AsyncSelectProps>;
} = {}) => {
  const {
    isFetching,
    isLoading,
    filteredOptions,
    asOptions,
    topicsFilter,
    produceTopicsFilter,
  } = useAllTopics(topics);

  const [selectedTopic, setSelectedTopic] =
    state ||
    useState<{
      value: string;
      label: string;
    } | null>(null);

  const selectSingleTopicComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedTopic(selected || null);
        }}
        value={selectedTopic}
        placeholder="Search a topic"
        {...selectProps}
      />
    );
  }, [
    filteredOptions,
    isLoading,
    isFetching,
    asOptions,
    selectedTopic,
    selectProps,
  ]);

  return {
    selectedTopic,
    setSelectedTopic,
    selectSingleTopicComponent,
    topicsFilter,
    produceTopicsFilter,
  };
};

export const useSelectMultiTopics = ({
  state,
  topics,
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
  topics?: AllTopicsOptions;
} & Partial<AsyncSelectProps> = {}) => {
  const {
    isFetching,
    isLoading,
    filteredOptions,
    asOptions,
    topicsFilter,
    produceTopicsFilter,
  } = useAllTopics(topics);

  const [selectedTopics, setSelectedTopics] =
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
          setSelectedTopics(selected || []);
        }}
        isMulti
        value={selectedTopics}
        placeholder="Search a topic"
        {...selectProps}
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedTopics]);

  return {
    selectedTopics,
    selectMultiDomainComponent,
    setSelectedTopics,
    topicsFilter,
    produceTopicsFilter,
  };
};