import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { MobileMenuButton } from "./MobileMenuButton";
import { Navigation } from "./Navigation";
import { useMobileMenuState } from "./useMobileMenuState";
import { UserInfo } from "./UserInfo";

export function MainLayout({ children }: { children: ReactNode }) {
  const { isOpen, toggle } = useMobileMenuState();

  return (
    <Flex
      height="100vh"
      bg={mode("blue.800", "gray.800")}
      overflow="hidden"
      sx={{ "--sidebar-width": "16rem" }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <UserInfo />

          <Navigation />
        </Box>
      </Box>
      <Box
        flex="1"
        p={{ base: "0", md: "6" }}
        marginStart={{ md: "var(--sidebar-width)" }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          maxW="calc(97vw - var(--sidebar-width))"
          bg={mode("white", "gray.700")}
          height="100%"
          pb="6"
          rounded={{ md: "lg" }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
              display={{ base: "block", md: "none" }}
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
              </Flex>
            </Flex>
            <Flex
              overflowY="auto"
              direction="column"
              flex="1"
              overflow="auto"
              px="10"
              pt="8"
            >
              {children}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
