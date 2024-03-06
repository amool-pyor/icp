import InfoPopover, { PopoverProps } from "@/components/atoms/InfoPopover";
// import Switch from "@/components/atoms/Switch";
import Tooltip from "@/components/atoms/Tooltip";
// import { componentTitleToDetailsMapping } from "@/constants/titleToDetailsMapping";
import { ExpandOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Col, Row, RowProps, Space } from "antd";
import { CSSProperties, MouseEventHandler } from "react";

export interface PanelTitleBarProps {
    title: string;
    titleStyle?: any;
    overlayStyle?: PopoverProps["overlayStyle"];
    popoverStyle?: PopoverProps["style"];
    content?: PopoverProps["content"] | any;
    infoTitle?: PopoverProps["title"];
    trigger?: PopoverProps["trigger"];
    rowStyle?: RowProps["style"];
    allowPercentConversion?: boolean;
    allowFullScreen?: boolean;
    onPercentChange?: (data: boolean) => void;
    onFullScreen?: MouseEventHandler<HTMLSpanElement>;
}

const defaultTitleStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    fontSize: 14,
};
const defaultTrigger: PanelTitleBarProps["trigger"] = "hover";
const defaultRowStyle: RowProps["style"] = {
    margin: "6px auto 0",
    padding: 4,
    marginTop: "0",
    fontWeight: 500,
    backgroundColor: "#292E38",
    color: "#AEB1B6",
    height: "5%",
};

export default function PanelTitleBar({
    title,
    titleStyle,
    overlayStyle,
    popoverStyle,
    content,
    infoTitle,
    trigger,
    rowStyle,
    allowPercentConversion,
    allowFullScreen,
    onPercentChange,
    onFullScreen,
}: PanelTitleBarProps) {
    return (
        <Row gutter={16} style={rowStyle ? rowStyle : defaultRowStyle}>
            <Col span={24} style={{ paddingLeft: 0 }}>
                <Space
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <Space
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <p style={titleStyle ? titleStyle : defaultTitleStyle}>{title}</p>
                            <Tooltip
                                title={"infoTitle"}
                                renderContent={() => (
                                    <div
                                        style={{
                                            width: "fit-content",
                                            maxWidth: "200px",
                                            fontSize: 10,
                                            color: 'white',
                                            fontFamily: "Roboto Mono"
                                        }}
                                    >
                                        {content}
                                    </div>
                                )}
                            >
                                <InfoCircleTwoTone />
                            </Tooltip>
                        </Space>
                    </div>
                    {/* <div>
                        {allowPercentConversion ? (
                            <span
                                style={{
                                    color: "#FAFDFE",
                                    fontSize: 12,
                                    justifyContent: "space-between",
                                    marginRight: "10px",
                                }}
                            >
                                <Switch
                                    style={{ marginRight: "5px" }}
                                    onChange={onPercentChange}
                                />
                                Percent
                            </span>
                        ) : null}
                        {allowFullScreen ? (
                            <ExpandOutlined
                                style={{
                                    color: "#FAFDFE",
                                    fontSize: 12,
                                    justifyContent: "space-between",
                                    marginRight: "10px",
                                }}
                                onClick={onFullScreen}
                            />
                        ) : null}
                    </div> */}
                </Space>
            </Col >
        </Row >
    );
}
