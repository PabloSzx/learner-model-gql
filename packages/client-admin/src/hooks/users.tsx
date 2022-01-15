import { useLatestRef } from "@chakra-ui/react";
import {
  AdminUsersFilter,
  AllUsersBaseDocument,
  AllUsersBaseQuery,
  AllUsersBaseQueryVariables,
  getKey,
  gql,
  useGQLInfiniteQuery,
} from "graph";
import { useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { OptionValue, Select } from "../components/AsyncSelect";

export type UserInfo =
  AllUsersBaseQuery["adminUsers"]["allUsers"]["nodes"][number];

export interface UsersBaseOptions {
  initialUsersFilter: AdminUsersFilter;
  limit: number;
}

export const useUsersBase = ({
  initialUsersFilter = {
    textSearch: "",
  },
  limit,
}: UsersBaseOptions) => {
  const [usersFilter, produceUsersFilter] =
    useImmer<UsersBaseOptions["initialUsersFilter"]>(initialUsersFilter);
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      gql(/* GraphQL */ `
        query AllUsersBase(
          $pagination: CursorConnectionArgs!
          $filters: AdminUsersFilter!
        ) {
          adminUsers {
            allUsers(pagination: $pagination, filters: $filters) {
              nodes {
                id
                name
                email
              }
              ...Pagination
            }
          }
        }
      `),
      (after) => {
        return {
          pagination: {
            first: 50,
            after,
          },
          filters: usersFilter,
        };
      },
      {
        getNextPageParam({
          adminUsers: {
            allUsers: {
              pageInfo: { hasNextPage, endCursor },
            },
          },
        }) {
          return hasNextPage ? endCursor : null;
        },
        staleTime: 5000,
        queryKey: getKey(AllUsersBaseDocument, {
          filters: usersFilter,
        } as AllUsersBaseQueryVariables),
      }
    );

  const users = useMemo(() => {
    const users: Record<string, UserInfo> = {};

    for (const user of data?.pages.flatMap(
      (v) => v.adminUsers.allUsers.nodes
    ) || []) {
      users[user.id] = user;
    }

    return Object.values(users);
  }, [data]);

  const usersAmount = useLatestRef(users.length);

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage && usersAmount.current < limit) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching, usersAmount, limit]);

  const asOptions = useMemo(() => {
    return users.map((user) => {
      return {
        label: userOptionLabel(user),
        value: user.id,
      };
    });
  }, [users]);

  return {
    users,
    isFetching,
    isLoading,
    asOptions,
    usersFilter,
    produceUsersFilter,
  };
};

export const userOptionLabel = ({ name, email }: UserInfo) =>
  name ? `${name} : ${email}` : email;

export const useSelectMultiUsers = () => {
  const { isFetching, asOptions, usersFilter, produceUsersFilter } =
    useUsersBase({
      initialUsersFilter: {
        textSearch: "",
      },
      limit: 50,
    });

  const [selectedUsers, setSelectedUsers] = useState<OptionValue[]>([]);

  const selectMultiUsersComponent = useMemo(() => {
    return (
      <Select
        isLoading={isFetching}
        options={asOptions}
        onChange={(selected) => {
          setSelectedUsers(selected || []);
        }}
        inputValue={usersFilter.textSearch || ""}
        onInputChange={(input) => {
          produceUsersFilter((draft) => {
            draft.textSearch = input;
          });
        }}
        isMulti
        value={selectedUsers}
        placeholder="Search a user"
      />
    );
  }, [isFetching, asOptions, selectedUsers, usersFilter]);

  return {
    selectedUsers,
    selectMultiUsersComponent,
    setSelectedUsers,
  };
};
