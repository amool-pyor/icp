import { Card, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { CUBE_TYPE, getCubeData } from 'clients/cube';
import Projects from 'clients/Projects';
import React, { CSSProperties, useState, useEffect } from 'react'
import DashboardChartOptionsBar from '../atoms/DashboardChartOptionsBar';
import PanelTitleBar from '../atoms/PanelTitleBar';
import CustomChart from './customChart'

const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
};

export interface PanelCardProps {
    title: string,
    globe: any,
    chartTitle: string,
    chartText: string,
    chartStyle?: CSSProperties,
    cardStyle?: CSSProperties,
    options?: any
}

const Chart = ({
    title,
    globe,
    chartText,
    chartTitle,
    cardStyle,
    chartStyle,
    options
}: PanelCardProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [projectList, SetProjectList] = useState<string[]>([])
    const [projectName, setProjectName] = useState<string>("")

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

    useEffect(()=>{
        console.log(projectName)
    },[projectName])

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