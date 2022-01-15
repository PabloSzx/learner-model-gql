import { useLatestRef } from "@chakra-ui/react";
import {
  AdminContentFilter,
  AllContentBaseQuery,
  AllContentBaseQueryVariables,
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

export const AllContentBaseDoc = gql(/* GraphQL */ `
  query AllContentBase(
    $pagination: CursorConnectionArgs!
    $filters: AdminContentFilter!
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

export interface AllContentBaseOptions {
  initialContentFilter: AdminContentFilter;
  limit: number;
}

export const useAllContentBase = ({
  initialContentFilter,
  limit,
}: AllContentBaseOptions) => {
  const [contentFilter, produceContentFilter] =
    useImmer<AdminContentFilter>(initialContentFilter);

  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      AllContentBaseDoc,
      (pageParam) => {
        return {
          pagination: {
            first: 50,
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

  const content = useMemo(() => {
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

  const contentAmount = useLatestRef(content.length);

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage && contentAmount.current < limit) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching, contentAmount, limit]);

  const asOptions = useMemo(() => {
    return content.map(({ id, label, code, tags }) => {
      return {
        label: contentOptionLabel({ label, code, tags }),
        value: id,
      };
    });
  }, [content]);

  return {
    content,
    asOptions,
    isFetching,
    isLoading,
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
  allContentBaseOptions,
}: {
  state?: [OptionValue[], (value: OptionValue[]) => void];
  selectProps?: Partial<AsyncSelectProps>;
  allContentBaseOptions: AllContentBaseOptions;
}) => {
  const {
    isFetching,
    isLoading,
    asOptions,
    contentFilter,
    produceContentFilter,
  } = useAllContentBase(allContentBaseOptions);

  const selectRef = useRef<SelectRefType>(null);

  const [selectedContent, setSelectedContent] =
    state || useState<OptionValue[]>([]);

  const selectMultiContentComponent = useMemo(() => {
    return (
      <Select
        isLoading={isFetching}
        options={asOptions}
        onChange={(selected) => {
          setSelectedContent(selected || []);
        }}
        isMulti
        value={selectedContent}
        placeholder="Search Content"
        selectRef={selectRef}
        inputValue={contentFilter.textSearch || ""}
        onInputChange={(value) => {
          produceContentFilter((draft) => {
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
    selectedContent,
    selectProps,
    produceContentFilter,
    contentFilter,
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
