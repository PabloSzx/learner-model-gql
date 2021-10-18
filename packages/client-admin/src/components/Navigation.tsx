import { Stack } from "@chakra-ui/react";
import { FiBook, FiUsers } from "react-icons/fi";
import { MdOutlineTopic } from "react-icons/md";
import { RiGroup2Line } from "react-icons/ri";
import { VscProject } from "react-icons/vsc";
import { BiBookContent } from "react-icons/bi";
import { useAuth } from "./Auth";
import { DarkModeToggle } from "./DarkModeToggle";
import { ScrollArea } from "./ScrollArea";
import { SidebarLink } from "./SidebarLink";

export function Navigation() {
  const { user } = useAuth();
  return (
    <ScrollArea pt="5" pb="6">
      <Stack pb="6">
        {user?.role === "ADMIN" && (
          <>
            <SidebarLink href="/users" icon={<FiUsers />}>
              Users
            </SidebarLink>
            <SidebarLink href="/groups" icon={<RiGroup2Line />}>
              Groups
            </SidebarLink>
            <SidebarLink href="/domains" icon={<FiBook />}>
              Domains
            </SidebarLink>
            <SidebarLink href="/topics" icon={<MdOutlineTopic />}>
              Topics
            </SidebarLink>
            <SidebarLink href="/projects" icon={<VscProject />}>
              Projects
            </SidebarLink>
            <SidebarLink href="/content" icon={<BiBookContent />}>
              Content
            </SidebarLink>
          </>
        )}
      </Stack>

      <Stack alignItems="center">
        <DarkModeToggle />
      </Stack>
    </ScrollArea>
  );
}
