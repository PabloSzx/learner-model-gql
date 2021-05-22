import {
  BsFillBookmarksFill,
  BsFillInboxFill,
  BsPencilSquare,
} from "react-icons/bs";

import { Stack } from "@chakra-ui/react";

import { DarkModeToggle } from "./DarkModeToggle";
import { NavSectionTitle } from "./NavSectionTitle";
import { ScrollArea } from "./ScrollArea";
import { SidebarLink } from "./SidebarLink";

export function Navigation() {
  return (
    <ScrollArea pt="5" pb="6">
      <Stack pb="6">
        <SidebarLink icon={<BsFillInboxFill />}>Lorem Ipsum</SidebarLink>
        <SidebarLink icon={<BsFillBookmarksFill />}>Lorem Ipsum</SidebarLink>
        <SidebarLink icon={<BsPencilSquare />}>Lorem Ipsum</SidebarLink>
      </Stack>
      <Stack pb="6">
        <NavSectionTitle>Lorem Ipsum</NavSectionTitle>
        <SidebarLink>🎉 Lorem Ipsum</SidebarLink>
        <SidebarLink>👍 Lorem Ipsum</SidebarLink>
        <SidebarLink>🦋 Lorem Ipsum</SidebarLink>
      </Stack>
      <Stack alignItems="center">
        <DarkModeToggle />
      </Stack>
    </ScrollArea>
  );
}
