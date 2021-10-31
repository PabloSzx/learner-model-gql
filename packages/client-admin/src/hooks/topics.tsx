import {
  AdminTopicsFilter,
  AllTopicsBaseQuery,
  AllTopicsBaseQueryVariables,
  getKey,
  gql,
  useGQLInfiniteQuery,
} from "graph";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import {
  AsyncSelect,
  AsyncSelectProps,
  OptionValue,
} from "../components/AsyncSelect";

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
          sortIndex
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
          content {
            id
            code
            label
            tags
          }
          updatedAt
          createdAt
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
    useGQLInfiniteQuery(
      AllTopicsBaseDoc,
      (pageParam) => {
        return {
          pagination: {
            first: 20,
            after: pageParam,
          },
          filters: topicsFilter,
        };
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
        queryKey: getKey(AllTopicsBaseDoc, {
          filters: topicsFilter,
        } as AllTopicsBaseQueryVariables),
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
  state?: [OptionValue | null, (value: OptionValue | null) => void];
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
    state || useState<OptionValue | null>(null);

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
  state?: [OptionValue[], (value: OptionValue[]) => void];
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
    state || useState<OptionValue[]>([]);

  const selectMultiTopicComponent = useMemo(() => {
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
    selectMultiTopicComponent,
    setSelectedTopics,
    topicsFilter,
    produceTopicsFilter,
  };
};
