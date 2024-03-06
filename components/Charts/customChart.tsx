import ECharts, { EChartsProps } from "@/components/atoms/ECharts";
import { Row, RowProps, Spin } from "antd";
import { CSSProperties } from "react";

const defaultLoaderStyle: CustomChartProps["loaderStyle"] = { margin: '30px' }

export interface CustomChartProps {
    chartStyle?: EChartsProps["style"]
    globe: EChartsProps["globe"]
    options: EChartsProps["options"]
    isLoading: boolean
    loaderStyle?: CSSProperties
    rowStyle?: RowProps["style"]
    legendRefs?: {
        [k: string]: any;
    },
}

export default function CustomChart({
    chartStyle,
    globe,
    options,
    isLoading,
    loaderStyle,
    rowStyle,
    legendRefs,
}: CustomChartProps) {
    return (
        <Row style={rowStyle}>
            {
                isLoading || options == null ?
                    <div className="loader" style={loaderStyle ? loaderStyle : defaultLoaderStyle}>
                        <Spin />
                    </div>
                    :
                    <ECharts
                        style={chartStyle}
                        globe={globe}
                        options={{ ...options, dataZoom: null }}
                        legendRefs={legendRefs}
                    />
            }
        </Row>
    )
}