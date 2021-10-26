import {
  Button,
  Textarea,
  TextareaProps,
  useLatestRef,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiPrettier } from "react-icons/si";

export function useJSONEditor({
  textAreaProps,
  defaultJson,
}: {
  textAreaProps?: TextareaProps;
  defaultJson?: string;
} = {}) {
  const [json, setJson] = useState(defaultJson || "");

  const latestJson = useLatestRef(json);

  const toast = useToast();

  useEffect(() => {
    return () => {
      toast.closeAll();
    };
  }, []);

  const { isValid, parsedJson } = useMemo(() => {
    try {
      const parsedJson: Record<string, unknown> = JSON.parse(json);

      if (
        typeof parsedJson !== "object" ||
        parsedJson == null ||
        Array.isArray(parsedJson)
      )
        throw Error("Invalid JSON");
      return {
        isValid: true,
        parsedJson,
      };
    } catch (err) {
      return {
        isValid: false,
      };
    }
  }, [json]);

  const [isFormatted, setIsFormatted] = useState(false);

  const format = useCallback(() => {
    Promise.all([
      import("prettier/standalone"),
      import("prettier/parser-babel"),
    ]).then(async ([{ format }, { default: babelParser }]) => {
      try {
        setIsFormatted(true);

        if (json !== latestJson.current) return;

        const formattedCode = format(json, {
          parser: "json",
          plugins: [babelParser],
        });

        if (!parsedJson)
          throw Error(`Value is not a JSON object: ${JSON.stringify(json)}`);

        setJson(formattedCode.trim());
        toast({
          title: "Formatted ✔️",
          duration: 1000,
          status: "success",
        });
      } catch (err) {
        toast({
          title: err instanceof Error ? err.message : JSON.stringify(err),
          status: "error",
          duration: null,
          isClosable: true,
        });
      }
    });
  }, [json, toast]);

  const jsonEditor = useMemo(
    () => (
      <VStack>
        <Textarea
          value={json}
          onChange={(ev) => {
            toast.closeAll();
            setJson(ev.target.value);
            setIsFormatted(false);
          }}
          {...textAreaProps}
        />
        <Button
          isDisabled={isFormatted || !json}
          onClick={format}
          leftIcon={<SiPrettier />}
          transition="all 0.5s"
          colorScheme={isValid ? "purple" : "red"}
        >
          Check and Format
        </Button>
      </VStack>
    ),
    [json, setJson, isFormatted]
  );

  return {
    jsonEditor,
    json,
    setJson,
    isValid,
    parsedJson,
  };
}
