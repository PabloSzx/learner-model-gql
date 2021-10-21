import type { CSSWithMultiValues, RecursiveCSSObject } from "@chakra-ui/react";
import {
  Box,
  Center,
  CloseButton,
  Divider,
  Flex,
  Icon,
  Portal,
  StylesProvider,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
  useMultiStyleConfig,
  useStyles,
  useTheme,
} from "@chakra-ui/react";
import type { FC, RefObject } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { GroupBase, Props as ReactSelectProps, Theme } from "react-select";
import ReactSelect, {
  components as selectComponents,
  StylesConfig,
} from "react-select";
import ReactAsyncSelect from "react-select/async";
import type SelectType from "react-select/dist/declarations/src/Select";

interface CommonSelectProps
  extends ReactSelectProps<{ label: string; value: string }, true> {
  onChange?: ({ value }: any) => void;
  placeholder?: string;
  defaultValue?: any;
}

export type SelectRefType = SelectType<
  {
    value: string;
    label: string;
  },
  true,
  GroupBase<{
    value: string;
    label: string;
  }>
>;

export interface SelectProps extends CommonSelectProps {
  options?: any;
  value?: any;
  selectRef?: RefObject<SelectRefType>;
}

export interface AsyncSelectProps extends CommonSelectProps {
  isLoading?: boolean;
  loadOptions?: any;
  selectRef?: RefObject<SelectRefType>;
}

export const chakraStyles: StylesConfig<{
  label: string;
  value: string;
}> = {
  input: (provided) => ({
    ...provided,
    color: "inherit",
    lineHeight: 1,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
    backgroundColor: "inherit",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0.125rem 1rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "inherit",
  }),
  multiValueRemove(provided) {
    return {
      ...provided,
      color: "black",
    };
  },
};

const components = {
  ...{
    Control: ({
      children,
      innerRef,
      innerProps,
      isDisabled,
      isFocused,
    }: any) => {
      const inputStyles = useMultiStyleConfig("Input", {});
      return (
        <StylesProvider value={inputStyles}>
          <Flex
            ref={innerRef}
            sx={{
              ...inputStyles.field,
              p: 0,
              overflow: "hidden",
              h: "auto",
              minH: 10,
            }}
            {...innerProps}
            {...(isFocused && { "data-focus": true })}
            {...(isDisabled && { disabled: true })}
          >
            {children}
          </Flex>
        </StylesProvider>
      );
    },
    MultiValueContainer: ({
      children,
      innerRef,
      innerProps,
      data: { isFixed },
    }: any) => (
      <Tag
        ref={innerRef}
        {...innerProps}
        m="0.125rem"
        variant={isFixed ? "solid" : "subtle"}
      >
        {children}
      </Tag>
    ),
    MultiValueLabel: ({ children, innerRef, innerProps }: any) => (
      <TagLabel ref={innerRef} {...innerProps}>
        {children}
      </TagLabel>
    ),
    MultiValueRemove: ({
      children,
      innerRef,
      innerProps,
      data: { isFixed },
    }: any) => {
      if (isFixed) {
        return null;
      }

      return (
        <TagCloseButton ref={innerRef} {...innerProps}>
          {children}
        </TagCloseButton>
      );
    },
    IndicatorSeparator: ({ innerProps }: any) => (
      <Divider {...innerProps} orientation="vertical" opacity="1" />
    ),
    ClearIndicator: ({ innerProps }: any) => (
      <CloseButton {...innerProps} size="sm" mx={2} />
    ),
    DropdownIndicator: ({ innerProps }: any) => {
      const { addon } = useStyles();

      return (
        <Center
          {...innerProps}
          sx={{
            ...addon,
            h: "100%",
            p: 0,
            borderRadius: 0,
            borderWidth: 0,
            cursor: "pointer",
          }}
        >
          <Icon as={FiChevronDown} h={5} w={5} mx={2} />
        </Center>
      );
    },
    MenuPortal: ({ children, ...portalProps }: any) => (
      <Portal {...portalProps}>{children}</Portal>
    ),
    Menu: ({ children, ...menuProps }: any) => {
      const menuStyles = useMultiStyleConfig("Menu", {});
      return (
        <selectComponents.Menu {...menuProps}>
          <StylesProvider value={menuStyles}>{children}</StylesProvider>
        </selectComponents.Menu>
      );
    },
    MenuList: ({ innerRef, children, maxHeight }: any) => {
      const { list } = useStyles();
      return (
        <Box
          sx={{
            ...list,
            maxH: `${maxHeight}px`,
            overflowY: "auto",
          }}
          ref={innerRef}
        >
          {children}
        </Box>
      );
    },
    GroupHeading: ({ innerProps, children }: any) => {
      const { groupTitle } = useStyles();
      return (
        <Box sx={groupTitle} {...innerProps}>
          {children}
        </Box>
      );
    },
    Option: ({
      innerRef,
      innerProps,
      children,
      isFocused,
      isDisabled,
    }: any) => {
      const { item } = useStyles();
      interface ItemProps extends CSSWithMultiValues {
        _disabled: CSSWithMultiValues;
        _focus: CSSWithMultiValues;
      }
      return (
        <Box
          sx={{
            ...item,
            w: "100%",
            textAlign: "left",
            cursor: "pointer",
            bg: isFocused
              ? (item as RecursiveCSSObject<ItemProps>)._focus.bg
              : "transparent",
            ...(isDisabled &&
              (item as RecursiveCSSObject<ItemProps>)._disabled),
          }}
          ref={innerRef}
          {...innerProps}
          {...(isDisabled && { disabled: true })}
        >
          {children}
        </Box>
      );
    },
  },
};

export const AsyncSelect: FC<AsyncSelectProps> = ({
  isLoading,
  loadOptions,
  onChange,
  placeholder,
  defaultValue,
  selectRef,
  ...props
}) => {
  const selectStyles = useSelectStyles();

  return (
    <ReactAsyncSelect
      isLoading={isLoading}
      loadOptions={loadOptions}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      cacheOptions
      defaultOptions
      isClearable
      {...selectStyles}
      ref={selectRef}
      {...props}
    />
  );
};

export const Select: FC<SelectProps> = ({
  options,
  onChange,
  placeholder,
  defaultValue,
  selectRef,
  ...props
}) => {
  const selectStyles = useSelectStyles();

  return (
    <ReactSelect
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      isClearable
      {...selectStyles}
      ref={selectRef}
      {...props}
    />
  );
};

export const useSelectStyles = () => {
  const chakraTheme = useTheme();

  const placeholderColor = useColorModeValue(
    chakraTheme.colors.gray[400],
    chakraTheme.colors.whiteAlpha[400]
  );

  return {
    styles: {
      ...chakraStyles,
    },
    theme: (baseTheme: Theme) => ({
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        neutral50: placeholderColor,
        neutral40: placeholderColor,
      },
    }),
    components,
  };
};
