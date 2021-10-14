import { Box, Flex, FlexProps, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props extends FlexProps {
  label?: string;
  value: ReactNode;
}

export const Property = (props: Props) => {
  const { label, value, ...flexProps } = props;
  return (
    <Flex
      as="dl"
      direction={{ base: "column", sm: "row" }}
      px="6"
      py="4"
      _even={{ bg: useColorModeValue("gray.50", "gray.600") }}
      {...flexProps}
    >
      {label ? (
        <Box as="dt" minWidth="180px">
          {label}
        </Box>
      ) : null}
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
    </Flex>
  );
};
