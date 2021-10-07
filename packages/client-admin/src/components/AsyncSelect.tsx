import { FiChevronDown } from "react-icons/fi";
import ReactSelect from "react-select";
import { components as selectComponents } from "react-select";
import ReactAsyncSelect from "react-select/async";

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

import type { CSSWithMultiValues, RecursiveCSSObject } from "@chakra-ui/react";

import type { FC } from "react";
import type { Props as ReactSelectProps } from "react-select";
interface CommonSelectProps
  extends ReactSelectProps<{ label: string; value: string }, true> {
  onChange?: ({ value }: any) => void;
  placeholder?: string;
  defaultValue?: any;
}

interface SelectProps extends CommonSelectProps {
  options?: any;
  value?: any;
}

export interface AsyncSelectProps extends CommonSelectProps {
  isLoading?: boolean;
  loadOptions?: any;
}

const chakraStyles = {
  input: (provided: Record<string, any>) => ({
    ...provided,
    color: "inherit",
    lineHeight: 1,
  }),
  menu: (provided: Record<string, any>) => ({
    ...provided,
    boxShadow: "none",
    backgroundColor: "inherit",
  }),
  valueContainer: (provided: Record<string, any>) => ({
    ...provided,
    padding: "0.125rem 1rem",
  }),
  singleValue: (provided: Record<string, any>) => ({
    ...provided,
    color: "inherit",
  }),
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
  ...props
}) => {
  const chakraTheme = useTheme();

  const placeholderColor = useColorModeValue(
    chakraTheme.colors.gray[400],
    chakraTheme.colors.whiteAlpha[400]
  );

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
      styles={{
        ...chakraStyles,
      }}
      theme={(baseTheme) => ({
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor,
          neutral40: placeholderColor,
        },
      })}
      components={components}
      {...props}
    />
  );
};

export const Select: FC<SelectProps> = ({
  options,
  onChange,
  placeholder,
  defaultValue,
  ...props
}) => {
  const chakraTheme = useTheme();

  const placeholderColor = useColorModeValue(
    chakraTheme.colors.gray[400],
    chakraTheme.colors.whiteAlpha[400]
  );

  return (
    <ReactSelect
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      isClearable
      styles={{
        ...chakraStyles,
      }}
      theme={(baseTheme) => ({
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor,
          neutral40: placeholderColor,
        },
      })}
      components={components}
      {...props}
    />
  );
};
