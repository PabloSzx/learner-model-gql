import { useEffect } from "react";

import { useBoolean, useBreakpointValue } from "@chakra-ui/react";

export const useMobileMenuState = () => {
  const [isOpen, actions] = useBoolean();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (isMobile == false) {
      actions.off();
    }
  }, [isMobile, actions]);

  return { isOpen, ...actions };
};
