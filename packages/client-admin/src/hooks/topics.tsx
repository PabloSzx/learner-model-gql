import { AllTopicsBaseQuery, gql, useGQLInfiniteQuery } from "graph/rq-gql";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AsyncSelect, AsyncSelectProps } from "../components/AsyncSelect";

export type TopicInfo =
  AllTopicsBaseQuery["adminDomain"]["allTopics"]["nodes"][number];

export const AllTopicsBaseDoc = gql(/* GraphQL */ `
  query AllTopicsBase($pagination: CursorConnectionArgs!) {
    adminDomain {
      allTopics(pagination: $pagination) {
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
        }
        ...Pagination
      }
    }
  }
`);

export type AllTopicsOptions = { jsFilter?: (topic: TopicInfo) => boolean };

export const useAllTopics = ({ jsFilter }: AllTopicsOptions = {}) => {
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      AllTopicsBaseDoc,
      (after) => {
        return {
          pagination: {
            first: 20,
            after,
          },
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
  topics,
}: {
  topics?: AllTopicsOptions;
} = {}) => {
  const { isFetching, isLoading, filteredOptions, asOptions } =
    useAllTopics(topics);

  const [selectedTopic, setSelectedTopic] = useState<{
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
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedTopic]);

  return {
    selectedTopic,
    selectSingleTopicComponent,
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
  const { isFetching, isLoading, filteredOptions, asOptions } =
    useAllTopics(topics);

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
  };
};
