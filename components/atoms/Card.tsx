import React from "react";
import {
    Card as AntCard,
    CardProps as AntCardProps,
    ConfigProvider,
    ThemeConfig,
} from "antd";

export interface DatePickerProps {
    title?: AntCardProps["title"];
    style?: AntCardProps["style"];
    darkTheme?: boolean;
    bordered?: AntCardProps["bordered"];
    theme?: ThemeConfig;
    children?: React.ReactNode;
    headStyle?: AntCardProps["headStyle"];
}

const darkThemeStyle: ThemeConfig = {
    token: {
        colorPrimary: "#159ffa",
        colorBgContainer: "#53565D",
        colorText: "#FAFDFE",
        colorBorder: "#FAFDFE",
    },
};

export default function Card({
    darkTheme = true,
    theme,
    style,
    children,
    title,
    bordered,
    headStyle,
}: DatePickerProps) {
    return (
        <ConfigProvider theme={darkTheme ? darkThemeStyle : theme}>
            <AntCard
                style={style}
                title={title}
                bordered={bordered}
                headStyle={headStyle}
            >
                {children}
            </AntCard>
        </ConfigProvider>
    );
}
