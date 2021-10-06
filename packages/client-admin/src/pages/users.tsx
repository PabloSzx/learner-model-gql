import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Select,
  Switch,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  AdminUsersQuery,
  getKey,
  gql,
  useGQLMutation,
  useGQLQuery,
  UserInfoFragment,
  UserRole,
} from "graph/rq-gql";
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
import { proxy, useSnapshot } from "valtio";
import { useAuth, withAuth } from "../components/Auth";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useCursorPagination } from "../hooks/pagination";
import { useSelectSingleProject } from "../hooks/projects";
import { queryClient } from "../utils/rqClient";

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
    enabled
    updatedAt
    locked
  }
`);

const AdminUsers = gql(/* GraphQL */ `
  query AdminUsers($pagination: CursorConnectionArgs!) {
    adminUsers {
      allUsers(pagination: $pagination) {
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
    } & UserInfoFragment
  >
>({});

function UpsertUsers() {
  const [text, setText] = useState("");

  const { selectSingleProjectComponent, selectedProject } =
    useSelectSingleProject();

  const { mutateAsync } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpsertUsersWithProjects(
        $emails: [EmailAddress!]!
        $projectId: IntID!
      ) {
        adminUsers {
          upsertUsersWithProject(emails: $emails, projectId: $projectId) {
            ...UserInfo
          }
        }
      }
    `),
    {
      async onSuccess() {
        await queryClient.invalidateQueries(getKey(AdminUsers));
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
        if (!emails.length || !selectedProject) return;

        await mutateAsync({
          emails,
          projectId: selectedProject.value,
        });
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <FaUsers />,
      }}
      saveButton={{
        isDisabled: !selectedProject || !emails.length,
      }}
    >
      <FormControl>
        <FormLabel>Project</FormLabel>
        {selectSingleProjectComponent}
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

export default withAuth(function IndexPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();

  const usersState = useSnapshot(UsersState);

  const { data } = useGQLQuery(AdminUsers, { pagination });
  pageInfo.current = data?.adminUsers.allUsers.pageInfo;

  useEffect(() => {
    for (const user of data?.adminUsers.allUsers.nodes || []) {
      const isEditing = UsersState[user.id]?.isEditing;
      if (isEditing) continue;
      Object.assign((UsersState[user.id] ||= user), user);
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
        await queryClient.invalidateQueries(getKey(AdminUsers));
      },
    }
  );

  const { user: authUser } = useAuth();

  const toast = useToast();

  return (
    <VStack>
      <UpsertUsers />
      <DataTable<AdminUsersQuery["adminUsers"]["allUsers"]["nodes"][number]>
        data={data?.adminUsers.allUsers.nodes || []}
        prevPage={prevPage}
        nextPage={nextPage}
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
          },
          {
            Header: "Active",
            accessor: "active",
            Cell({ value }) {
              return value ? <MdCheck /> : <MdClose />;
            },
          },
          {
            Header: "Enabled",
            accessor: "enabled",
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

              const { isEditing, role } = userState;

              return isEditing ? (
                <Select
                  value={userState.role}
                  onChange={(ev) => {
                    UsersState[value]!.role =
                      ev.target.value === UserRole.Admin
                        ? UserRole.Admin
                        : UserRole.User;
                  }}
                  isDisabled={updateUser.isLoading}
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

              const { isEditing, locked } = userState;
              return isEditing ? (
                <Switch
                  isChecked={userState.locked}
                  isDisabled={updateUser.isLoading}
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
          getDateRow({ id: "lastOnline", label: "Last Online" }),
          getDateRow({ id: "createdAt", label: "Created At" }),
          getDateRow({ id: "updatedAt", label: "Created At" }),
          {
            id: "edit",
            Header: "Editar",
            defaultCanSort: false,
            defaultCanFilter: false,
            defaultCanGroupBy: false,
            accessor: "id",
            Cell({ value: id, row: { original } }) {
              const userState = usersState[id];

              if (!userState) return null;

              const { isEditing, role, locked } = userState;

              return (
                <IconButton
                  aria-label="Edit"
                  colorScheme="blue"
                  isLoading={
                    updateUser.isLoading && updateUser.variables?.data.id === id
                  }
                  isDisabled={updateUser.isLoading || authUser?.id === id}
                  onClick={() => {
                    if (
                      isEditing &&
                      (original.role !== role || original.locked !== locked)
                    ) {
                      updateUser
                        .mutateAsync({
                          data: {
                            id,
                            role,
                            locked,
                          },
                        })
                        .then(() => {
                          UsersState[id]!.isEditing = false;
                        })
                        .catch((err) => {
                          toast({
                            status: "error",
                            title: err.message,
                          });
                        });
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
