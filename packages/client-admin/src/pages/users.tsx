import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Select,
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  AdminUsersQuery,
  gql,
  useGQLMutation,
  useGQLQuery,
  UserInfoFragment,
  UserRole,
} from "graph";
import { useEffect, useMemo, useState } from "react";
import { FaUsers } from "react-icons/fa";
import {
  MdCheck,
  MdClose,
  MdEdit,
  MdLock,
  MdLockOpen,
  MdSave,
} from "react-icons/md";
import { proxy, ref, useSnapshot } from "valtio";
import type { OptionValue, SelectRefType } from "../components/AsyncSelect";
import { useAuth, withAdminAuth } from "../components/Auth";
import {
  DataTable,
  getDateRow,
  useDebouncedDataTableSearchValue,
} from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useTagsSelect } from "../components/TagsSelect";
import { useCursorPagination } from "../hooks/pagination";
import { projectOptionLabel, useSelectMultiProjects } from "../hooks/projects";
import { queryClient } from "../rqClient";

gql(/* GraphQL */ `
  fragment UserInfo on User {
    __typename
    id
    email
    name
    active
    lastOnline
    createdAt
    role
    updatedAt
    locked
    tags
    projects {
      id
      code
      label
    }
  }
`);

const AdminUsers = gql(/* GraphQL */ `
  query AdminUsers(
    $pagination: CursorConnectionArgs!
    $filters: AdminUsersFilter
  ) {
    adminUsers {
      allUsers(pagination: $pagination, filters: $filters) {
        nodes {
          ...UserInfo
        }
        ...Pagination
      }
    }
  }
`);

const UsersState = proxy<
  Record<
    string,
    {
      isEditing?: boolean;
      selectedProjects: Array<OptionValue>;
      tagsRef: {
        current: SelectRefType | null;
      };
      nameRef: { current: string };
    } & UserInfoFragment
  >
>({});

function UpsertUsers() {
  const [text, setText] = useState("");

  const { selectMultiProjectComponent, selectedProjects } =
    useSelectMultiProjects();

  const { mutateAsync, isLoading } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpsertUsersWithProjects(
        $emails: [EmailAddress!]!
        $projectsIds: [IntID!]!
      ) {
        adminUsers {
          upsertUsersWithProjects(emails: $emails, projectsIds: $projectsIds) {
            ...UserInfo
          }
        }
      }
    `),
    {
      async onSuccess() {
        await queryClient.invalidateQueries();
      },
    }
  );

  const emails = useMemo(() => {
    return Array.from(
      text
        .trim()
        .split(/\r\n|\n/g)
        .reduce<Array<string>>((acum, value) => {
          const email = value.trim();

          if (email) acum.push(email);

          return acum;
        }, [])
    );
  }, [text]);

  return (
    <FormModal
      title="Upsert Users"
      onSubmit={async () => {
        if (!emails.length) return;

        await mutateAsync({
          emails,
          projectsIds: selectedProjects.map((v) => v.value),
        });
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <FaUsers />,
      }}
      saveButton={{
        isDisabled: isLoading || !emails.length,
      }}
    >
      <FormControl>
        <FormLabel>Projects</FormLabel>
        {selectMultiProjectComponent}
      </FormControl>
      <FormControl>
        <FormLabel>Users List</FormLabel>
        <Textarea
          value={text}
          onChange={(ev) => {
            setText(ev.target.value);
          }}
        />
        <FormHelperText>List of emails separated by a new line</FormHelperText>
      </FormControl>
    </FormModal>
  );
}

export default withAdminAuth(function UsersPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();

  const usersState = useSnapshot(UsersState);

  const textSearch = useDebouncedDataTableSearchValue();

  const { data } = useGQLQuery(AdminUsers, {
    pagination,
    filters: {
      textSearch,
    },
  });
  pageInfo.current = data?.adminUsers.allUsers.pageInfo;

  useEffect(() => {
    for (const user of data?.adminUsers.allUsers.nodes || []) {
      const isEditing = UsersState[user.id]?.isEditing;
      if (isEditing) continue;
      Object.assign(
        (UsersState[user.id] ||= {
          ...user,
          selectedProjects: user.projects.map((project) => ({
            value: project.id,
            label: projectOptionLabel(project),
          })),
          tagsRef: ref({
            current: null,
          }),
          nameRef: { current: user.name || "" },
        }),
        user
      );
    }
  }, [data]);

  const updateUser = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpdateUser($data: UpdateUserInput!) {
        adminUsers {
          updateUser(data: $data) {
            __typename
          }
        }
      }
    `),
    {
      async onSuccess() {
        await queryClient.invalidateQueries();
      },
    }
  );

  const { user: authUser } = useAuth();

  return (
    <VStack>
      <UpsertUsers />
      <DataTable<AdminUsersQuery["adminUsers"]["allUsers"]["nodes"][number]>
        data={data?.adminUsers.allUsers.nodes || []}
        prevPage={prevPage}
        nextPage={nextPage}
        disableDefaultTextFilter
        columns={[
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Name",
            accessor: "name",
            Cell({
              value,
              row: {
                original: { id },
              },
            }) {
              const userState = UsersState[id];

              if (userState?.isEditing) {
                const ref = userState.nameRef;
                return (
                  <Input
                    isDisabled={updateUser.isLoading}
                    defaultValue={ref.current}
                    onChange={(ev) => {
                      ref.current = ev.target.value;
                    }}
                    colorScheme="facebook"
                    borderColor="blackAlpha.500"
                    width="30ch"
                  />
                );
              }

              return value;
            },
          },
          {
            Header: "Active",
            accessor: "active",
            Cell({ value }) {
              return value ? <MdCheck /> : <MdClose />;
            },
          },
          {
            id: "role",
            Header: "Role",
            accessor: "id",
            Cell({ value }) {
              const userState = usersState[value];

              if (!userState) return null;

              const { isEditing, role, id } = userState;

              return isEditing ? (
                <Select
                  value={userState.role}
                  onChange={(ev) => {
                    UsersState[value]!.role =
                      ev.target.value === UserRole.Admin
                        ? UserRole.Admin
                        : UserRole.User;
                  }}
                  isDisabled={updateUser.isLoading || authUser?.id === id}
                  minW="13ch"
                >
                  <option value={UserRole.Admin}>ADMIN</option>
                  <option value={UserRole.User}>USER</option>
                </Select>
              ) : (
                role
              );
            },
          },
          {
            id: "locked",
            Header: "Locked",
            accessor: "id",
            Cell({ value }) {
              const userState = usersState[value];

              if (!userState) return null;

              const { isEditing, locked, id } = userState;
              return isEditing ? (
                <Switch
                  isChecked={userState.locked}
                  isDisabled={updateUser.isLoading || authUser?.id === id}
                  onChange={() => {
                    UsersState[value]!.locked = !locked;
                  }}
                />
              ) : locked ? (
                <MdLock />
              ) : (
                <MdLockOpen />
              );
            },
          },
          {
            id: "projects",
            Header: "Projects",
            accessor: "id",
            Cell({
              row: {
                original: { projects, id },
              },
            }) {
              const projectsCodes = projects.map((v) => v.code).join();

              const state = usersState[id];

              if (state?.isEditing) {
                const { selectMultiProjectComponent } = useSelectMultiProjects({
                  state: [
                    state.selectedProjects,
                    (value) => {
                      UsersState[id]!.selectedProjects = value;
                    },
                  ],
                  selectProps: {
                    isDisabled: updateUser.isLoading,
                  },
                });

                return selectMultiProjectComponent;
              }

              return projectsCodes;
            },
          },
          {
            id: "Tags",
            Header: "Tags",
            accessor: "id",
            Cell({
              row: {
                original: { id, tags },
              },
            }) {
              const state = UsersState[id];

              if (state?.isEditing) {
                const { tagsSelect } = useTagsSelect({
                  tagsRef: state.tagsRef,
                  defaultTags: tags,
                });

                return tagsSelect;
              }
              return tags.join(" | ");
            },
          },
          getDateRow({ id: "lastOnline", label: "Last Online" }),
          getDateRow({ id: "createdAt", label: "Created At" }),
          getDateRow({ id: "updatedAt", label: "Updated At" }),
          {
            id: "edit",
            Header: "Edit",
            defaultCanSort: false,
            defaultCanFilter: false,
            defaultCanGroupBy: false,
            accessor: "id",
            Cell({ value: id, row: { original } }) {
              const userState = UsersState[id];

              if (!userState) return null;

              const { isEditing, role, locked, selectedProjects, tagsRef } =
                userState;

              return (
                <IconButton
                  aria-label="Edit"
                  colorScheme="blue"
                  isLoading={
                    updateUser.isLoading && updateUser.variables?.data.id === id
                  }
                  isDisabled={updateUser.isLoading}
                  onClick={() => {
                    const tagsRefList =
                      tagsRef.current?.getValue().map((v) => v.value) || [];
                    if (
                      isEditing &&
                      (original.role !== role ||
                        original.locked !== locked ||
                        (original.name || "") !== userState.nameRef.current ||
                        original.projects
                          .map((v) => v.id)
                          .sort()
                          .join() !==
                          selectedProjects
                            .map((v) => v.value)
                            .sort()
                            .join() ||
                        original.tags.join() !== tagsRefList.join())
                    ) {
                      updateUser
                        .mutateAsync({
                          data: {
                            id,
                            role,
                            locked,
                            projectIds: selectedProjects.map((v) => v.value),
                            tags: tagsRefList,
                            name: userState.nameRef.current || null,
                          },
                        })
                        .then(() => {
                          UsersState[id]!.isEditing = false;
                        })
                        .catch(console.error);
                    } else {
                      UsersState[id]!.isEditing = !isEditing;
                    }
                  }}
                  icon={isEditing ? <MdSave /> : <MdEdit />}
                />
              );
            },
          },
        ]}
      />
    </VStack>
  );
});
