import { HStack, Spinner } from "@chakra-ui/react";
import { formatSpanish } from "common";
import { MdCheck, MdClose } from "react-icons/md";
import { withAuth } from "../components/Auth";
import { Card } from "../components/Card/Card";
import { CardContent } from "../components/Card/CardContent";
import { CardHeader } from "../components/Card/CardHeader";
import { Property } from "../components/Card/Property";
import { useQuery } from "../gqty";

export default withAuth(function IndexPage() {
  const query = useQuery();
  return (
    <HStack
      wrap="wrap"
      width="100%"
      Ø
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
          const { __typename, id, email, name, active, lastOnline, createdAt } =
            user;

          if (!__typename) return null;

          return (
            <Card key={user.id} margin="0.5em">
              <CardHeader title={email!} />
              <CardContent>
                <Property label="ID" value={id} />
                {name && <Property label="Nombre" value={name} />}
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
                <Property
                  label="Fecha de creación"
                  value={formatSpanish(new Date(createdAt!), "PPpp")}
                />
              </CardContent>
            </Card>
          );
        })}
    </HStack>
  );
});
