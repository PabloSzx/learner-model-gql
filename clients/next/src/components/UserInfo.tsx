import { AiOutlineLogin } from "react-icons/ai";

import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Logout } from "./Logout";

export const UserInfo = () => {
  const { user, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const emailTextColor = useColorModeValue("whiteAlpha.700", "gray.400");

  const loginVariant = useColorModeValue("solid", "outline");

  if (isLoading)
    return (
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
    );

  if (!user)
    return (
      <Button
        colorScheme="blue"
        onClick={() => {
          loginWithRedirect();
        }}
        variant={loginVariant}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        leftIcon={<AiOutlineLogin />}
      >
        Login
      </Button>
    );
  const { name, picture, email } = user;

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          as="a"
          href="#"
          p="3"
          display="block"
          transition="background 0.1s"
          rounded="xl"
          _hover={{ bg: "whiteAlpha.200" }}
          whiteSpace="nowrap"
        >
          <HStack display="inline-flex">
            {picture ? <Avatar size="sm" name={name} src={picture} /> : null}

            <Box lineHeight="1">
              {name ? <Text fontWeight="semibold">{name}</Text> : null}

              {email ? (
                <Text fontSize="xs" mt="1" color={emailTextColor}>
                  {email}
                </Text>
              ) : null}
            </Box>
          </HStack>
        </Box>
      </PopoverTrigger>
      <PopoverContent width="100%">
        <PopoverCloseButton color="black" />
        <PopoverBody>
          <Stack alignItems="flex-start" paddingTop="2em" paddingBottom="1em">
            <Logout />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
