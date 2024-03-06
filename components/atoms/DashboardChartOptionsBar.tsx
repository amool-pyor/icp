import { Col, Divider, DividerProps, Row, RowProps } from "antd";
import Select, { SelectProps } from "./Select";

const rowStyle: RowProps["style"] = {
    margin: '6px auto',
    fontSize: 5,
    color: '#25262A',
    // padding: "0px 10px",
    marginRight: 0
}

const dividerStyle: DividerProps["style"] = {
    marginTop: 5,
    padding: 0,
    marginBottom: 0,
    color: '#b7bac2',
    background: '#b7bac2'
}

export interface DashboardChartOptionsBarProps {
    size?: SelectProps["size"],
    bordered?: SelectProps["bordered"],
    projectName: string,
    options?: any,
    setProjectName: React.Dispatch<React.SetStateAction<string>>,
    // defaultGranularityValue: SelectProps["defaultValue"],
}

const defaultBordered: SelectProps["bordered"] = false
const defaultSize: SelectProps["size"] = "small"
const darkTheme = true

export default function DashboardChartOptionsBar({
    size,
    bordered,
    projectName,
    setProjectName,
    options
}: DashboardChartOptionsBarProps) {

    const handleProjectSourceReset = (e: string) => {
        setProjectName(e);
    }

    return (
        <>
            <Row gutter={16} style={rowStyle}>
                <Col span={12} style={{ paddingLeft: "0px" }}>
                    <Col style={{ paddingLeft: "0px" }} className='dashboardChartSelect' span={24} >
                        <Select
                            size={size ? size : defaultSize}
                            bordered={bordered ? bordered : defaultBordered}
                            defaultValue={projectName}
                            style={{ width: '100%', color: 'white' }}
                            onChange={handleProjectSourceReset}
                            value={projectName}
                            options={options}
                            darkTheme
                        />
                    </Col>
                </Col>
            </Row>
            {/* <Divider style={dividerStyle} /> */}
        </>
    );
}