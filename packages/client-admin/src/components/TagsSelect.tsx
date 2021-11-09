import { Box } from "@chakra-ui/react";
import { useMemo, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { SelectRefType, useSelectStyles } from "./AsyncSelect";

export const useTagsSelect = (
  props: {
    tagsRef?: {
      current: SelectRefType | null;
    };
    defaultTags?: string[];
    selectProps?: { isDisabled?: boolean };
  } = {}
) => {
  const tagsRef: typeof props["tagsRef"] =
    props.tagsRef || useRef<SelectRefType>(null);
  const selectStyles = useSelectStyles();

  const tagsSelect = useMemo(
    () => (
      <Box minW="250px">
        <CreatableSelect<{ label: string; value: string }, true>
          ref={tagsRef}
          placeholder="Tags"
          isMulti
          noOptionsMessage={() => `Start writing to create a new tag!`}
          defaultValue={props.defaultTags?.map((value) => ({
            label: value,
            value,
          }))}
          {...selectStyles}
          {...props.selectProps}
        />
      </Box>
    ),
    [
      selectStyles,
      props.defaultTags,
      props.tagsRef,
      props.selectProps?.isDisabled,
    ]
  );

  return {
    tagsSelect,
    tagsRef,
  };
};
