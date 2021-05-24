import { Stack } from "@chakra-ui/react";
import { useHelloQuery } from "react-graphql";

export default function IndexPage() {
  useHelloQuery(
    {},
    {
      refetchInterval: 5000,
      onSuccess(data) {
        console.log(data);
      },
    }
  );
  return <Stack width="100%" padding="1em" alignItems="center"></Stack>;
}
