import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

export const Card = (props: BoxProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded={{ md: "lg" }}
      shadow="base"
      overflow="hidden"
      {...props}
    />
  );
};
