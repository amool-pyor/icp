import React from "react";
import { Popover as AntPopover, PopoverProps as AntPopoverProps, ConfigProvider, ThemeConfig } from "antd";
import { BorderOutlined, InfoCircleTwoTone, TwoToneColor } from "@ant-design/icons";

export interface PopoverProps {
    overlayStyle?: AntPopoverProps["overlayStyle"];
    style?: AntPopoverProps["style"];
    content?: AntPopoverProps["content"];
    title?: AntPopoverProps["title"]
    trigger?: AntPopoverProps["trigger"]
    twoToneColor?: TwoToneColor
    popoverTheme?: ThemeConfig
}

const defaultTwoToneColor: TwoToneColor = '#2B63FD'
const defaultOverlayStyle: PopoverProps["overlayStyle"] = { maxWidth: '500px' }
const defaultPopoverStyle: PopoverProps["style"] = { margin: '500px' }

const defaultTheme: ThemeConfig = {
    token: {
        colorText: '#292E38',
        colorBgElevated: '#b7bac2',
        colorBorder: 'pink',
    },
}

export default function InfoPopover({
    overlayStyle,
    style,
    content,
    title,
    trigger,
    twoToneColor,
    popoverTheme
}: PopoverProps) {
    return (
        <ConfigProvider
            theme={popoverTheme ? popoverTheme : defaultTheme}>
            <AntPopover
                overlayStyle={overlayStyle ? overlayStyle : defaultOverlayStyle}
                style={style ? style : defaultPopoverStyle}
                content={content}
                title={title}
                trigger={trigger}>
                <InfoCircleTwoTone twoToneColor={twoToneColor ? twoToneColor : defaultTwoToneColor} />
            </AntPopover>
        </ConfigProvider>
    )
}