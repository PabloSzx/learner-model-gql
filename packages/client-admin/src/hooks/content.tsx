import {
  AdminContentFilter,
  AllContentBaseQuery,
  AllContentBaseQueryVariables,
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

export const AllContentBaseDoc = gql(/* GraphQL */ `
  query AllContentBase(
    $pagination: CursorConnectionArgs!
    $filters: AdminContentFilter
  ) {
    adminContent {
      allContent(pagination: $pagination, filters: $filters) {
        nodes {
          id
          code
          label
          tags
        }
        ...Pagination
      }
    }
  }
`);

export const useAllContentBase = () => {
  const [contentFilter, produceContentFilter] =
    useImmer<AdminContentFilter | null>(null);

  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      AllContentBaseDoc,
      (pageParam) => {
        return {
          pagination: {
            first: 20,
            after: pageParam,
          },
          filters: contentFilter,
        };
      },
      {
        getNextPageParam({
          adminContent: {
            allContent: {
              pageInfo: { hasNextPage, endCursor },
            },
          },
        }) {
          return hasNextPage ? endCursor : null;
        },
        staleTime: 5000,
        queryKey: getKey(AllContentBaseDoc, {
          filters: contentFilter,
        } as AllContentBaseQueryVariables),
      }
    );

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  const content = useMemo(() => {
    if (hasNextPage) return [];

    const content: Record<
      string,
      AllContentBaseQuery["adminContent"]["allContent"]["nodes"][number]
    > = {};

    for (const contentValue of data?.pages.flatMap(
      (v) => v.adminContent.allContent.nodes
    ) || []) {
      content[contentValue.id] = contentValue;
    }

    return Object.values(content);
  }, [data, hasNextPage]);

  const asOptions = useMemo(() => {
    return content.map(({ id, label, code, tags }) => {
      return {
        label: contentOptionLabel({ label, code, tags }),
        value: id,
      };
    });
  }, [content]);

  const filteredOptions = useCallback(
    async (input: string) => {
      return input
        ? asOptions.filter((v) => v.label.includes(input))
        : asOptions;
    },
    [asOptions]
  );

  return {
    content,
    asOptions,
    isFetching,
    isLoading,
    filteredOptions,
    contentFilter,
    produceContentFilter,
  };
};

export const contentOptionLabel = ({
  code,
  label,
  tags,
}: {
  code: string;
  label: string;
  tags: string[];
}) =>
  tags.length
    ? `[${code} | ${label}] - [${tags.join(",")}]`
    : `[${code} | ${label}]`;

export const useSelectMultiContent = ({
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
    contentFilter,
    produceContentFilter,
  } = useAllContentBase();

  const selectRef = useRef<SelectRefType>(null);

  const [selectedContent, setSelectedContent] =
    state || useState<OptionValue[]>([]);

  const selectMultiContentComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedContent(selected || []);
        }}
        isMulti
        value={selectedContent}
        placeholder="Search Content"
        selectRef={selectRef}
        {...selectProps}
      />
    );
  }, [
    filteredOptions,
    isLoading,
    isFetching,
    asOptions,
    selectedContent,
    selectProps,
  ]);

  return {
    selectedContent,
    setSelectedContent,
    selectMultiContentComponent,
    contentFilter,
    produceContentFilter,
    selectRef,
    isFetching,
    isLoading,
  };
};
