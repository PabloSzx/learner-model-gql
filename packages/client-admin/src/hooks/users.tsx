import { AllUsersBaseQuery, gql, useGQLInfiniteQuery } from "graph";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AsyncSelect, OptionValue } from "../components/AsyncSelect";

export type UserInfo =
  AllUsersBaseQuery["adminUsers"]["allUsers"]["nodes"][number];

export const useUsersBase = () => {
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      gql(/* GraphQL */ `
        query AllUsersBase($pagination: CursorConnectionArgs!) {
          adminUsers {
            allUsers(pagination: $pagination) {
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
            first: 20,
            after,
          },
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
      }
    );

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  const users = useMemo(() => {
    const users: Record<string, UserInfo> = {};

    for (const user of data?.pages.flatMap(
      (v) => v.adminUsers.allUsers.nodes
    ) || []) {
      users[user.id] = user;
    }

    return Object.values(users);
  }, [data]);

  const asOptions = useMemo(() => {
    return users.map((user) => {
      return {
        label: userOptionLabel(user),
        value: user.id,
      };
    });
  }, [users]);

  const filteredOptions = useCallback(
    async (input: string) => {
      return input
        ? asOptions.filter((v) => v.label.includes(input))
        : asOptions;
    },
    [asOptions]
  );

  return {
    users,
    isFetching,
    isLoading,
    asOptions,
    filteredOptions,
  };
};

export const userOptionLabel = ({ name, email }: UserInfo) =>
  name ? `${name} : ${email}` : email;

export const useSelectSingleUser = () => {
  const { isFetching, isLoading, filteredOptions, asOptions } = useUsersBase();

  const [selectedUser, setSelectedUsers] = useState<OptionValue | null>(null);

  const selectSingleUserComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedUsers(selected || null);
        }}
        value={selectedUser}
        placeholder="Search a user"
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedUser]);

  return {
    selectedUser,
    selectSingleUserComponent,
  };
};

export const useSelectMultiUsers = () => {
  const { isFetching, isLoading, filteredOptions, asOptions } = useUsersBase();

  const [selectedUsers, setSelectedUsers] = useState<OptionValue[]>([]);

  const selectMultiUsersComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedUsers(selected || []);
        }}
        isMulti
        value={selectedUsers}
        placeholder="Search a user"
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedUsers]);

  return {
    selectedUsers,
    selectMultiUsersComponent,
    setSelectedUsers,
  };
};
