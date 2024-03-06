import ReactECharts from "echarts-for-react";
import { CSSProperties, useEffect, useRef, useState } from "react";

export interface EChartsProps {
    globe: any
    options: any
    style?: CSSProperties | undefined,
    legendRefs?: {
        [k: string]: any;
    },
}

export default function ECharts({
    globe,
    options,
    style,
    legendRefs,
}: EChartsProps) {
    const [chartInstance, setChartInstance] = useState<any>()

    useEffect(() => {
        if (legendRefs) {
            Object.keys(legendRefs).forEach((seriesName: any, value: any) => {
                if (legendRefs[seriesName].current && legendRefs[seriesName].current.ariaChecked == 'false' && globe.echartRef) {
                    globe.echartRef.getEchartsInstance().dispatchAction({
                        type: 'legendUnSelect',
                        name: seriesName
                    })
                }
            })
            if (chartInstance) {
                globe.echartRef.getEchartsInstance().on('legendselectchanged', (params: any) => {
                    if (globe.echartRef) {
                        if (legendRefs[params.name] && legendRefs[params.name].current) {
                            legendRefs[params.name].current.click()
                        }
                        if (legendRefs[params.name].current && legendRefs[params.name].current.ariaChecked == 'false' && globe.echartRef) {
                            globe.echartRef.getEchartsInstance().dispatchAction({
                                type: 'legendSelect',
                                name: params.name
                            })
                        }
                        else if (legendRefs[params.name].current && legendRefs[params.name].current.ariaChecked == 'true' && globe.echartRef) {
                            globe.echartRef.getEchartsInstance().dispatchAction({
                                type: 'legendUnSelect',
                                name: params.name
                            })
                        }
                    }
                })
            }
        }
    })

    return (
        <ReactECharts
            style={style}
            ref={(e) => { setChartInstance(e); globe.echartRef = e; }}
            option={options}
        />
    )
}