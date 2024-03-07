import { Card, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { CUBE_TYPE, getCubeData } from 'clients/cube';
import { Projects } from 'clients/config';
import React, { CSSProperties, useState, useEffect } from 'react'
import DashboardChartOptionsBar from '../atoms/DashboardChartOptionsBar';
import PanelTitleBar from '../atoms/PanelTitleBar';
import CustomChart from './customChart'

export interface PanelCardProps {
    title: string,
    globe: any,
    chartTitle: string,
    chartText: string,
    chartStyle?: CSSProperties,
    cardStyle?: CSSProperties,
    projectList?: string[],
    SetProjectList?: any,
}

const Chart = ({
    title,
    globe,
    chartText,
    chartTitle,
    cardStyle,
    chartStyle,
    SetProjectList,
    projectList,
}: PanelCardProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [projectList, SetProjectList] = useState<string[]>([])
    const [projectName, setProjectName] = useState<string>("");
    const [options, setOptions] = useState<any>({})


    const genrateOptions = (xAxisData: string[], yAxisData: number[]) => {
        const option = {
            xAxis: {
                type: 'category',
                data: xAxisData
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: yAxisData,
                    type: 'line'
                }
            ]
        };

        setOptions(option);
        return;
    }


    useEffect(() => {
        const getProjects = async () => {
            const response = await getCubeData({
                "measures": [
                    "IcpSystemParameters.count"
                ],
                "timeDimensions": [
                    {
                        "dimension": "IcpSystemParameters.date"
                    }
                ],
                "order": {
                    "IcpSystemParameters.count": "desc"
                },
                "dimensions": [
                    "IcpSystemParameters.canister_id"
                ]
            }, { type: CUBE_TYPE.SERVER })

            const data = response.map((item: any) => {
                const id: string = item["IcpSystemParameters.canister_id"]
                const label: string = Projects.Governance[`${id}`]

                return {
                    value: item["IcpSystemParameters.canister_id"],
                    label: label
                }
            })
            SetProjectList(data)
            setProjectName(data[0].value)
        }
        getProjects()
    }, []);

    useEffect(() => {
        setIsLoading(true)
        if (projectName != "") {
            // console.log(projectName, "line 84")
            const data = async () => {
                let response = await getCubeData({
                    "measures": [
                        "IcpSystemParameters.distributed_e8s_equivalent",
                        "IcpSystemParameters.round"
                    ],
                    "timeDimensions": [
                        {
                            "dimension": "IcpSystemParameters.date",
                            "granularity": "day"
                        }
                    ],
                    "order": {
                        "IcpSystemParameters.count": "desc"
                    },
                    "dimensions": [
                        "IcpSystemParameters.canister_id"
                    ],
                    "filters": [
                        {
                            "member": "IcpSystemParameters.canister_id",
                            "operator": "equals",
                            "values": [
                                `${projectName}`
                            ]
                        }
                    ]
                }, { type: CUBE_TYPE.SERVER })

                response = response.map((item: any) => {
                    return {
                        date: new Date(item["IcpSystemParameters.date"]).toLocaleDateString(),
                        distributed_e8s_equivalent: item["IcpSystemParameters.distributed_e8s_equivalent"],
                        round: item["IcpSystemParameters.round"]
                    }
                })
                response.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                const xAxisData = response.map((item: any) => {
                    return item.date;
                })
                const yAxisData = response.map((item: any, index: number) => {
                    let value: number = 0;
                    if (index != 0) {
                        // console.log(item.round, index, response[index - 1].round);
                        if (item.round != response[index - 1].round) {
                            value = item.distributed_e8s_equivalent * Math.pow(10, -8);
                        }
                    } else {
                        value = item.distributed_e8s_equivalent * Math.pow(10, -8);
                    }
                    return value;
                })
                // console.log(response)
                // console.log(xAxisData, yAxisData)
                genrateOptions(xAxisData, yAxisData)
                setIsLoading(false)
            }

            data()
        }
    }, [projectName])

    return (
        <Card
            key={title}
            style={cardStyle ? cardStyle : {
                padding: '0',
                margin: '0',
                borderColor: 'transparent',
                marginBottom: 20,
                height: '325px',
                backgroundColor: '#16181d',
                borderRadius: 5
            }}
            bodyStyle={{
                padding: "0"
            }}
            className="dashboard"
        >
            <Layout
                style={{
                    margin: 0,
                    padding: 0,
                    borderRadius: 5,
                    justifyContent: 'center'
                }}
                className="site-layout"
            >
                <Content
                    style={{
                        margin: 0,
                        padding: 0,
                        backgroundColor: '#16181d',
                        borderRadius: 5,
                        borderColor: 'transparent',
                    }}
                >
                    <PanelTitleBar
                        title={chartTitle}
                        content={chartText}
                        infoTitle={chartTitle}
                    />
                    <DashboardChartOptionsBar
                        projectName={projectName}
                        setProjectName={setProjectName}
                        options={projectList}
                    />
                    <CustomChart
                        chartStyle={chartStyle ? chartStyle : {
                            width: '100%',
                            height: '257px',
                            margin: "0",
                            padding: '0',
                            color: '#FAFDFE',
                            borderRadius: 5,
                            borderColor: 'transparent'
                        }}
                        globe={globe}
                        options={options ? options : null}
                        isLoading={isLoading}
                        rowStyle={{
                            margin: "0",
                            padding: '0',
                            justifyContent: 'center'
                        }}
                    />
                </Content>
            </Layout>
        </Card>
    )
}

export default Chart