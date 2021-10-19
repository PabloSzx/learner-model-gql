import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { formatSpanish } from "common";
import { gql, GroupInfoFragment, useGQLMutation, useGQLQuery } from "graph";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { MdAdd, MdCheck, MdClose, MdEdit, MdSave } from "react-icons/md";
import { proxy, ref, useSnapshot } from "valtio";
import { withAdminAuth } from "../components/Auth";
import { Card } from "../components/Card/Card";
import { CardContent } from "../components/Card/CardContent";
import { CardHeader } from "../components/Card/CardHeader";
import { Property } from "../components/Card/Property";
import { DataTable, getDateRow } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { useSelectMultiGroups } from "../hooks/groups";
import { useCursorPagination } from "../hooks/pagination";
import { projectOptionLabel, useSelectMultiProjects } from "../hooks/projects";
import { queryClient } from "../rqClient";

gql(/* GraphQL */ `
  fragment GroupInfo on Group {
    id
    code
    label
    updatedAt
    createdAt
    projects {
      id
      code
      label
    }
    users {
      id
      email
      name
      role
      active
      lastOnline
    }
  }
`);

const AdminGroups = gql(/* GraphQL */ `
  query AllGroups($pagination: CursorConnectionArgs!) {
    adminUsers {
      allGroups(pagination: $pagination) {
        nodes {
          ...GroupInfo
        }
        ...Pagination
      }
    }
  }
`);

function CreateGroup() {
  const { mutateAsync } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation CreateGroup($data: CreateGroupInput!) {
        adminUsers {
          createGroup(data: $data) {
            id
            label
            code
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

  const codeRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);
  const { selectMultiProjectComponent, selectedProjects } =
    useSelectMultiProjects();
  return (
    <FormModal
      title="Create Group"
      onSubmit={async () => {
        if (!codeRef.current?.value || !labelRef.current?.value)
          throw Error("All fields are required");

        await mutateAsync({
          data: {
            projectIds: selectedProjects.map((v) => v.value),
            code: codeRef.current.value,
            label: labelRef.current.value,
            tags: [],
          },
        });

        queryClient.invalidateQueries();

        codeRef.current.value = "";
        labelRef.current.value = "";
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <MdAdd />,
      }}
    >
      <FormControl>
        <FormLabel>Associated Projects</FormLabel>

        {selectMultiProjectComponent}
      </FormControl>
      <FormControl id="code" isRequired>
        <FormLabel>Code</FormLabel>
        <Input type="text" ref={codeRef} />
        <FormHelperText>
          Unique Code not intended to be showed to the users
        </FormHelperText>
      </FormControl>
      <FormControl id="label" isRequired>
        <FormLabel>Label</FormLabel>
        <Input type="text" ref={labelRef} />
        <FormHelperText>Human readable label</FormHelperText>
      </FormControl>
    </FormModal>
  );
}

function GroupsUsers({
  users,
  code,
  label,
}: {
  users: GroupInfoFragment["users"][number][];
  code: string;
  label: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={<IoIosEye />}
        onClick={onOpen}
        colorScheme="facebook"
        isDisabled={users.length === 0}
      >
        {users.length}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {label} - {code}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {users.map(({ id, email, name, role, active, lastOnline }) => {
              return (
                <Card key={id} margin="0.5em !important">
                  <CardHeader title={email} />
                  <CardContent>
                    <Property label="ID" value={id} />
                    {name && <Property label="Nombre" value={name} />}
                    <Property label="Rol" value={role} />
                    <Property
                      label="Activo"
                      value={active ? <MdCheck /> : <MdClose />}
                    />
                    <Property
                      label="Última conexión"
                      value={
                        lastOnline
                          ? formatSpanish(new Date(lastOnline), "PPpp")
                          : "---"
                      }
                    />
                  </CardContent>
                </Card>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function AssignGroupsUsers() {
  const [text, setText] = useState("");

  const { selectMultiGroupComponent, selectedGroups, setSelectedGroups } =
    useSelectMultiGroups();
  const { mutateAsync } = useGQLMutation(
    gql(/* GraphQL */ `
      mutation SetUserGroups(
        $usersEmails: [EmailAddress!]!
        $groupIds: [IntID!]!
      ) {
        adminUsers {
          setUserGroups(usersEmails: $usersEmails, groupIds: $groupIds) {
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
      title="Assigns Users to Groups"
      onSubmit={async () => {
        if (!selectedGroups.length) return;

        await mutateAsync({
          groupIds: selectedGroups.map((v) => v.value),
          usersEmails: emails,
        });

        setSelectedGroups([]);
        setText("");
      }}
      triggerButton={{
        colorScheme: "facebook",
        leftIcon: <FaUsers />,
      }}
      saveButton={{
        isDisabled: !selectedGroups.length,
      }}
    >
      <FormControl isRequired>
        <FormLabel>Groups</FormLabel>
        {selectMultiGroupComponent}
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

const GroupsState = proxy<
  Record<
    string,
    GroupInfoFragment & {
      isEditing?: boolean;
      labelRef: { current: string };
      codeRef: { current: string };
      selectedProjects: Array<{ label: string; value: string }>;
    }
  >
>({});

export default withAdminAuth(function GroupsPage() {
  const { pagination, prevPage, nextPage, pageInfo } = useCursorPagination();
  const { data } = useGQLQuery(AdminGroups, { pagination });
  pageInfo.current = data?.adminUsers.allGroups.pageInfo;

  useEffect(() => {
    for (const group of data?.adminUsers.allGroups.nodes || []) {
      const isEditing = GroupsState[group.id]?.isEditing;
      if (isEditing) continue;
      Object.assign(
        (GroupsState[group.id] ||= {
          ...group,
          codeRef: ref({ current: group.code }),
          labelRef: ref({ current: group.label }),
          selectedProjects: group.projects.map(({ code, label, id }) => {
            return {
              label: projectOptionLabel({ code, label }),
              value: id,
            };
          }),
        }),
        group
      );
    }
  }, [data]);

  const groupsState = useSnapshot(GroupsState);

  const updateGroup = useGQLMutation(
    gql(/* GraphQL */ `
      mutation UpdateGroup($data: UpdateGroupInput!) {
        adminUsers {
          updateGroup(data: $data) {
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

  return (
    <VStack>
      <CreateGroup />
      <AssignGroupsUsers />
      <DataTable<GroupInfoFragment>
        data={data?.adminUsers.allGroups.nodes || []}
        prevPage={prevPage}
        nextPage={nextPage}
        minH="80vh"
        columns={[
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Code",
            accessor: "code",
            Cell({
              value,
              row: {
                original: { id },
              },
            }) {
              const groupState = groupsState[id];

              if (!groupState) return value;

              if (groupState.isEditing) {
                const ref = GroupsState[id]!.codeRef;
                return (
                  <Input
                    isDisabled={updateGroup.isLoading}
                    defaultValue={ref.current}
                    onChange={(ev) => {
                      ref.current = ev.target.value;
                    }}
                    colorScheme="facebook"
                    borderColor="blackAlpha.500"
                    width="20ch"
                  />
                );
              }

              return value;
            },
          },
          {
            Header: "Label",
            accessor: "label",
            Cell({
              value,
              row: {
                original: { id },
              },
            }) {
              const groupState = groupsState[id];

              if (!groupState) return value;

              if (groupState.isEditing) {
                const ref = GroupsState[id]!.labelRef;

                return (
                  <Input
                    isDisabled={updateGroup.isLoading}
                    defaultValue={ref.current}
                    onChange={(ev) => {
                      ref.current = ev.target.value;
                    }}
                    colorScheme="facebook"
                    borderColor="blackAlpha.500"
                    width="20ch"
                  />
                );
              }

              return value;
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

              const groupState = groupsState[id];

              if (!groupState) return projectsCodes;

              if (groupState.isEditing) {
                const { selectMultiProjectComponent } = useSelectMultiProjects({
                  state: [
                    groupState.selectedProjects,
                    (value) => {
                      GroupsState[id]!.selectedProjects = value;
                    },
                  ],
                  isDisabled: updateGroup.isLoading,
                });

                return selectMultiProjectComponent;
              }

              return projectsCodes;
            },
          },
          {
            id: "users",
            Header: "Users",
            accessor: "id",
            Cell({
              row: {
                original: { users, label, code },
              },
            }) {
              return <GroupsUsers users={users} label={label} code={code} />;
            },
          },
          getDateRow({ id: "createdAt", label: "Created At" }),
          getDateRow({ id: "updatedAt", label: "Updated At" }),
          {
            id: "edit",
            Header: "Editar",
            defaultCanSort: false,
            defaultCanFilter: false,
            defaultCanGroupBy: false,
            accessor: "id",
            Cell({ value: id, row: { original } }) {
              const groupState = groupsState[id];

              if (!groupState) return null;

              const { isEditing, codeRef, labelRef, selectedProjects } =
                groupState;

              return (
                <IconButton
                  aria-label="Edit"
                  colorScheme="blue"
                  isLoading={
                    updateGroup.isLoading &&
                    updateGroup.variables?.data.id === id
                  }
                  isDisabled={updateGroup.isLoading}
                  onClick={() => {
                    if (
                      isEditing &&
                      (original.code !== codeRef.current ||
                        original.label !== labelRef.current ||
                        original.projects
                          .map((v) => v.id)
                          .sort()
                          .join() !==
                          selectedProjects
                            .map((v) => v.value)
                            .sort()
                            .join())
                    ) {
                      updateGroup
                        .mutateAsync({
                          data: {
                            id,
                            code: codeRef.current,
                            label: labelRef.current,
                            projectIds: selectedProjects.map((v) => v.value),
                            tags: [],
                          },
                        })
                        .then(() => {
                          GroupsState[id]!.isEditing = false;
                        })
                        .catch(console.error);
                    } else {
                      GroupsState[id]!.isEditing = !isEditing;
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
