import { formatSpanish } from "common";
import { useEffect, useState } from "react";
import {
  MdCheck,
  MdClose,
  MdEdit,
  MdLock,
  MdLockOpen,
  MdSave,
} from "react-icons/md";
import { useImmer } from "use-immer";

import {
  HStack,
  IconButton,
  Select,
  Spinner,
  Switch,
  useToast,
} from "@chakra-ui/react";

import { useAuth, withAuth } from "../components/Auth";
import { Card } from "../components/Card/Card";
import { CardContent } from "../components/Card/CardContent";
import { CardHeader } from "../components/Card/CardHeader";
import { Property } from "../components/Card/Property";
import { useMutation, useQuery, User, UserRole } from "../gqty";

const UserCard = ({ user }: { user: User }) => {
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
  }, [role, enabled]);

  const [userState, produceUserState] = useImmer(() => {
    return {
      role,
      locked,
    };
  });

  const [updateUser, updateUserState] = useMutation(
    (mutation) => {
      return mutation.adminUsers.updateUser({
        data: {
          id,
          role: userState.role!,
          locked: userState.locked!,
        },
      }).__typename;
    },
    {
      refetchQueries: [user],
      awaitRefetchQueries: true,
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
            isLoading={updateUserState.isLoading}
            isDisabled={updateUserState.isLoading || authUser?.id === user.id}
            onClick={() => {
              if (
                isEdit &&
                (role !== userState.role || locked !== userState.locked)
              ) {
                updateUser()
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
                      ev.target.value === UserRole.ADMIN
                        ? UserRole.ADMIN
                        : UserRole.USER;
                  });
                }}
                isDisabled={updateUserState.isLoading}
              >
                <option value={UserRole.ADMIN}>ADMIN</option>
                <option value={UserRole.USER}>USER</option>
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
                checked={userState.locked}
                isDisabled={updateUserState.isLoading}
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

export default withAuth(function IndexPage() {
  const query = useQuery();
  return (
    <HStack
      wrap="wrap"
      width="100%"
      paddingX="1em"
      paddingY="0.2em"
      alignItems="flex-start"
      fontSize="0.8em"
      justifyContent="space-around"
    >
      {query.$state.isLoading && <Spinner />}
      {query.adminUsers
        .allUsers({
          pagination: {
            first: 10,
          },
        })
        .nodes.map((user) => {
          return <UserCard user={user} key={user.id || 0} />;
        })}
    </HStack>
  );
});
