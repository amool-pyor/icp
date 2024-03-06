import React, { CSSProperties } from "react";
import {
    Select as AntSelect,
    SelectProps as AntSelectProps,
    ConfigProvider,
    ThemeConfig,
} from "antd";

export interface SelectProps {
    value?: AntSelectProps["value"];
    style?: AntSelectProps["style"];
    options?: AntSelectProps["options"];
    allowClear?: AntSelectProps["allowClear"];
    onChange?: AntSelectProps["onChange"];
    dropdownRender?: AntSelectProps["dropdownRender"];
    placeholder?: AntSelectProps["placeholder"];
    size?: AntSelectProps["size"];
    defaultValue?: AntSelectProps["defaultValue"];
    showSearch?: AntSelectProps["showSearch"];
    bordered?: AntSelectProps["bordered"];
    darkTheme?: boolean;
    dropDownStyle?: AntSelectProps["dropdownStyle"];
    theme?: ThemeConfig;
    notFoundContent?: AntSelectProps["notFoundContent"];
    optionFilterProp?: AntSelectProps["optionFilterProp"];
    filterOption?: AntSelectProps["filterOption"];
    filterSort?: AntSelectProps["filterSort"];
    autoClearSearchValue?: AntSelectProps["autoClearSearchValue"];
    disabled?: AntSelectProps["disabled"]
}

const darkSelectStyle: AntSelectProps["style"] = {
    backgroundColor: "#2E3135",
    borderRadius: 5,
    fontWeight: 500,
    width: "100%",
    // height: "100%",
    textAlign: "center",
    paddingTop: 2.5,
    maxWidth: "fit-content",
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: "10px",
    paddingBottom: "2.5px",
};

const darkDropdownStyle: AntSelectProps["dropdownStyle"] = {
    backgroundColor: "#2E3135",
    // padding: 0,
    color: "white",
    justifyContent: "center",
    textAlign: "center",
};

const darkThemeStyle: ThemeConfig = {
    // token: {
    //   colorText: "#FAFDFE",
    //   controlItemBgActive: "#52555A",
    //   colorTextDisabled: "#A2A5AA",
    //   controlHeight: 25,
    //   fontSize: 14,
    // },
    token: {
        colorText: "#FAFDFE",
        controlItemBgActive: "#52555A",
        colorTextDisabled: "#A2A5AA",
        fontSize: 14,
        colorBgContainer: "#2E3136",
        colorBgElevated: "#2E3136",
        colorPrimaryHover: "#52555A",
        colorTextQuaternary: "#FAFDFE",
        colorFillTertiary: "#52555A",
    },
};

export default function Select({
    value,
    style,
    options,
    allowClear,
    onChange,
    dropdownRender,
    placeholder,
    size,
    showSearch,
    bordered,
    defaultValue,
    notFoundContent,
    darkTheme = true,
    dropDownStyle,
    theme,
    optionFilterProp,
    filterOption,
    filterSort,
    autoClearSearchValue = true,
    disabled = false,
}: SelectProps) {
    const additionalProps: any = {};

    if (showSearch) {
        additionalProps.showSearch = showSearch;
    }
    if (optionFilterProp) {
        additionalProps.optionFilterProp = optionFilterProp;
    }
    if (filterOption) {
        additionalProps.filterOption = filterOption;
    }
    if (filterSort) {
        additionalProps.filterSort = filterSort;
    }

    return (
        <ConfigProvider theme={darkTheme ? darkThemeStyle : theme}>
            <AntSelect
                showSearch
                value={value}
                style={style}
                options={options}
                allowClear={allowClear}
                onChange={onChange}
                dropdownRender={dropdownRender}
                placeholder={placeholder}
                size={size}
                bordered={bordered}
                defaultValue={defaultValue}
                dropdownStyle={darkTheme ? darkDropdownStyle : dropDownStyle}
                notFoundContent={notFoundContent}
                autoClearSearchValue={autoClearSearchValue}
                disabled={disabled}
                {...additionalProps}
            />
        </ConfigProvider>
    );
}
