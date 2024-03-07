import React from "react";
import {
  Input as AntInput,
  InputProps as AntInputProps,
  ConfigProvider,
  ThemeConfig,
} from "antd";

interface InputProps {
  style?: AntInputProps["style"];
  placeholder?: AntInputProps["placeholder"];
  value?: AntInputProps["value"];
  onChange?: AntInputProps["onChange"];
  ref?: any;
  autoFocus?: AntInputProps["autoFocus"];
  onBlur?: AntInputProps["onBlur"];
  onPressEnter?: AntInputProps["onPressEnter"];
  darkTheme?: boolean;
  theme?: ThemeConfig;
  disabled?: boolean;
  name?: string;
  defaultValue?: AntInputProps["value"];
}

const darkThemeStyle: ThemeConfig = {
  token: {
    colorPrimary: "#159ffa",
    colorText: "#fafdfe",
    colorBgContainer: "#2e3135",
    colorTextPlaceholder: "#A2A5AA",
    controlOutline: "#2e3135",
    colorTextDisabled: "#A2A5AA",
  },
};

export default function Input({
  placeholder,
  style,
  value,
  onChange,
  ref,
  autoFocus,
  onBlur,
  onPressEnter,
  darkTheme = true,
  theme,
  disabled,
  name = "",
  defaultValue,
}: InputProps) {
  const additionalProps: any = {};

  if (defaultValue) {
    additionalProps.defaultValue = defaultValue;
  }

  return (
    <ConfigProvider theme={darkTheme ? darkThemeStyle : theme}>
      <AntInput
        style={style}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        autoFocus={autoFocus}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
        disabled={disabled}
        name={name}
        {...additionalProps}
      />
    </ConfigProvider>
  );
}
