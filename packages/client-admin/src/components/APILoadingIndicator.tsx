import { useIsFetching } from "react-query";
import { memo, useEffect, useMemo, useState } from "react";
import useDebounce from "react-use/lib/useDebounce.js";

import { Progress } from "@chakra-ui/react";

export const APILoadingIndicator = memo(() => {
  const onFetchAmountAPI = useIsFetching();

  const [onFetchAmount, setOnFetchAmount] = useState(onFetchAmountAPI);

  useEffect(() => {
    // From 0 to start loading should be immediate
    if (onFetchAmount === 0 && onFetchAmountAPI) {
      setOnFetchAmount(onFetchAmountAPI);
    }
  }, [onFetchAmount, onFetchAmountAPI]);

  // After the state is loading, further changes should be debounced
  // for the progress to not flash too quickly
  useDebounce(
    () => {
      setOnFetchAmount(onFetchAmountAPI);
    },
    100,
    [onFetchAmountAPI]
  );

  const isFetching = onFetchAmount > 0;

  return useMemo(() => {
    if (isFetching) {
      return (
        <Progress
          zIndex={10000}
          position="fixed"
          top="0px"
          left="0px"
          isIndeterminate
          width="100vw"
          height="5px"
          colorScheme="cyan"
        />
      );
    }

    return null;
  }, [isFetching]);
});
