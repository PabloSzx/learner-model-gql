import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

import { IconButton, useColorMode } from "@chakra-ui/react";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      isRound
      size="md"
      fontSize="2xl"
      aria-label="Dark mode toggle"
      variant="link"
      color="white"
      icon={colorMode === "light" ? <RiMoonClearFill /> : <RiSunFill />}
      onClick={toggleColorMode}
    />
  );
};
