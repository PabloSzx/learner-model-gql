import { Stack } from "@chakra-ui/react";
import { API_URL } from "common";
import { BiBookContent } from "react-icons/bi";
import { FaBookReader, FaSatellite } from "react-icons/fa";
import { FiBook, FiUsers } from "react-icons/fi";
import { MdOutlineTopic } from "react-icons/md";
import { RiGroup2Line } from "react-icons/ri";
import { VscGithubAction, VscProject } from "react-icons/vsc";
import { useAuth } from "./Auth";
import { DarkModeToggle } from "./DarkModeToggle";
import { ScrollArea } from "./ScrollArea";
import { SidebarLink } from "./SidebarLink";
import { BiTestTube } from "react-icons/bi";
import { useMemo } from "react";

export function Navigation() {
  const { user, authorization } = useAuth();

  const altairUrl = useMemo(() => {
    if (!authorization) return null;

    const altairUrlObject = new URL(API_URL);

    altairUrlObject.pathname = "/altair";

    altairUrlObject.searchParams.set("token", authorization);

    return altairUrlObject.href;
  }, [authorization]);
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
            <SidebarLink href="/kcs" icon={<FaBookReader />}>
              KC
            </SidebarLink>
            <SidebarLink href="/projects" icon={<VscProject />}>
              Projects
            </SidebarLink>
            <SidebarLink href="/content" icon={<BiBookContent />}>
              Content
            </SidebarLink>
            <SidebarLink href="/actions" icon={<VscGithubAction />}>
              Actions
            </SidebarLink>
            {altairUrl ? (
              <SidebarLink
                href={altairUrl}
                icon={<BiTestTube />}
                isExternal
                target="_blank"
              >
                Altair GraphQL Web Client
              </SidebarLink>
            ) : null}
            <SidebarLink
              href={new URL("/voyager", API_URL).href}
              icon={<FaSatellite />}
              isExternal
              target="_blank"
            >
              Voyager GraphQL Schema Visualization
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
