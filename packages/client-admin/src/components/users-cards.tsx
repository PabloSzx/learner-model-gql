//@ts-nocheck
import {
  HStack,
  IconButton,
  Select,
  Switch,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { formatSpanish } from "common";
import {
  DocumentType,
  getKey,
  gql,
  useGQLMutation,
  useGQLQuery,
  UserRole,
} from "graph/rq-gql";
import { useEffect, useState } from "react";
import {
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdEdit,
  MdLock,
  MdLockOpen,
  MdSave,
} from "react-icons/md";
import { useImmer } from "use-immer";
import { useAuth, withAuth } from "./Auth";
import { Card } from "./Card/Card";
import { CardContent } from "./Card/CardContent";
import { CardHeader } from "./Card/CardHeader";
import { Property } from "./Card/Property";
import { useCursorPagination } from "../hooks/pagination";
import { queryClient } from "../utils/rqClient";

const UserInfo = gql(/* GraphQL */ `
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

const UserCard = ({ user }: { user: DocumentType<typeof UserInfo> }) => {
  const {
    __typename,
    id,
    email,
    name,
    active,
    lastOnline,
    createdAt,
    role,
    enabled,
    updatedAt,
    locked,
  } = user;

  const toast = useToast();

  useEffect(() => {
    produceUserState({
      role,
      locked,
    });
  }, [role, locked]);

  const [userState, produceUserState] = useImmer(() => {
    return {
      role,
      locked,
    };
  });

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

  const [isEdit, setIsEdit] = useState(false);

  if (!__typename) return null;

  return (
    <Card key={user.id} margin="0.5em !important">
      <CardHeader
        title={email!}
        action={
          <IconButton
            aria-label="Edit"
            isLoading={updateUser.isLoading}
            isDisabled={updateUser.isLoading || authUser?.id === user.id}
            onClick={() => {
              if (
                isEdit &&
                (role !== userState.role || locked !== userState.locked)
              ) {
                updateUser
                  .mutateAsync({
                    data: {
                      id,
                      role: userState.role,
                      locked: userState.locked,
                    },
                  })
                  .then(() => {
                    setIsEdit(false);
                  })
                  .catch((err) => {
                    toast({
                      status: "error",
                      title: err.message,
                    });
                  });
              } else {
                setIsEdit((v) => !v);
              }
            }}
            icon={isEdit ? <MdSave /> : <MdEdit />}
          />
        }
      />
      <CardContent>
        <Property label="ID" value={id} />
        {name && <Property label="Nombre" value={name} />}
        <Property
          label="Rol"
          value={
            isEdit ? (
              <Select
                value={userState.role}
                onChange={(ev) => {
                  produceUserState((draft) => {
                    draft.role =
                      ev.target.value === UserRole.Admin
                        ? UserRole.Admin
                        : UserRole.User;
                  });
                }}
                isDisabled={updateUser.isLoading}
              >
                <option value={UserRole.Admin}>ADMIN</option>
                <option value={UserRole.User}>USER</option>
              </Select>
            ) : (
              role
            )
          }
        />
        <Property label="Activo" value={active ? <MdCheck /> : <MdClose />} />
        <Property
          label="Última conexión"
          value={
            lastOnline ? formatSpanish(new Date(lastOnline), "PPpp") : "---"
          }
        />
        <Property
          label="Habilitado"
          value={enabled ? <MdCheck /> : <MdClose />}
        />
        <Property
          label="Bloqueado"
          value={
            isEdit ? (
              <Switch
                isChecked={userState.locked}
                isDisabled={updateUser.isLoading}
                onChange={() => {
                  produceUserState((draft) => {
                    draft.locked = !draft.locked;
                  });
                }}
              />
            ) : locked ? (
              <MdLock />
            ) : (
              <MdLockOpen />
            )
          }
        />
        <Property
          label="Fecha de creación"
          value={formatSpanish(new Date(createdAt!), "PPpp")}
        />
        <Property
          label="Fecha de última actualización"
          value={formatSpanish(new Date(updatedAt!), "PPpp")}
        />
      </CardContent>
    </Card>
  );
};

const AdminUsers = gql(/* GraphQL */ `
  query AdminUsersCards($pagination: CursorConnectionArgs!) {
    adminUsers {
      allUsers(pagination: $pagination) {
        nodes {
          ...UserInfo
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`);

export default withAuth(function IndexPage() {
  const { pagination, leftPagination, rightPagination, pageInfo } =
    useCursorPagination();

  const { data } = useGQLQuery(AdminUsers, { pagination });
  pageInfo.current = data?.adminUsers.allUsers.pageInfo;

  return (
    <VStack>
      <HStack>
        <IconButton icon={<MdChevronLeft />} {...leftPagination} />
        <IconButton icon={<MdChevronRight />} {...rightPagination} />
      </HStack>

      <HStack
        wrap="wrap"
        width="100%"
        paddingX="1em"
        paddingY="0.2em"
        alignItems="flex-start"
        fontSize="0.8em"
        justifyContent="space-around"
      >
        {data?.adminUsers.allUsers.nodes.map((user) => {
          return <UserCard user={user} key={user.id} />;
        })}
      </HStack>
    </VStack>
  );
});
