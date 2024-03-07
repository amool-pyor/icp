"use client"
import React, { CSSProperties, useState } from "react";
import Head from "next/head";
import Title from "@/components/atoms/Title";
import TabBar from "@/components/atoms/TabBar";
import Chart from "@/components/Charts";
import Simulator from "@/components/Simulator";


const tabPanelLabelStyle: CSSProperties = {
  fontSize: 16,
}


const topContainer: CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#101213",
  overflow: "auto",
}

const extensionContainer: CSSProperties = {
  height: "100%",
  width: "70vw",
  padding: "5px",
  position: "absolute",
  left: "15vw",
  right: "15vw",
  justifyContent: "center",
  alignItems: "center"
}


const chartsContainer: CSSProperties = {
  height: "37.5vh",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
}

enum TAB_LABEL_MAPPER {
  "",
  "Charts",
  "Fee Calculator",
}

export default function icp() {
  const [projectList, SetProjectList] = useState<string[]>([])

  // return <div style={{ backgroundColor: 'black', height: "100vh", alignItems: "center" }}>
  //   <TabPanels
  //     defaultActiveKey="1"
  //     items={[
  //       {
  //         label: <span style={tabPanelLabelStyle}>
  //           Chart
  //         </span>,
  //         key: '1',
  //         children: <Chart
  //           title="Test"
  //           chartTitle={"Daily Maturity"}
  //           chartText={"Daily Maturity"}
  //           globe={{}}
  //           cardStyle={{
  //             padding: "0",
  //             margin: "0",
  //             borderColor: "transparent",
  //             backgroundColor: "#16181d",
  //             borderRadius: 5,
  //             width: "1300px",
  //           }} chartStyle={{
  //             width: "1300px",
  //             margin: "0",
  //             padding: "0",
  //             color: "#FAFDFE",
  //             borderRadius: 5,
  //             borderColor: "transparent",
  //             height: "520px",
  //           }} />
  //       },
  //       {
  //         label: <span style={tabPanelLabelStyle}>
  //           Fee Calculator
  //         </span>,
  //         key: '2',
  //         children: <p>Dummy Content 2</p>
  //       }
  //     ]}
  //     style={
  //       { justifyContent: 'left', textAlign: 'left', backgroundColor: "black" }
  //     }
  //   />
  // </div>

  return <div style={topContainer}>
    <Head>
      <title>PYOR | Compound</title>
    </Head>
    <div style={extensionContainer}>
      <Title
        level={3}
        style={{
          color: "#fafdfe",
          display: "flex",
          justifyContent: "center",
          margin: "10px auto",
        }}
      >
        ICP
      </Title>

      <TabBar
        type="card"
        theme={{
          token: {
            colorPrimary: "#159FFA",
            colorBgContainer: "#53565D",
            colorBorderSecondary: "#53565D",
          },
        }}
        items={[
          {
            key: "1",
            label: TAB_LABEL_MAPPER["1"],
            children: (
              <div style={chartsContainer}>
                <Chart
                  title="Test"
                  chartTitle={"Daily Maturity"}
                  chartText={"Daily Maturity"}
                  projectList={projectList}
                  SetProjectList={SetProjectList}
                  globe={{}}
                  cardStyle={{
                    padding: "0",
                    margin: "0",
                    borderColor: "transparent",
                    backgroundColor: "#16181d",
                    borderRadius: 5,
                    width: "1300px",
                  }} chartStyle={{
                    width: "1300px",
                    margin: "0",
                    padding: "0",
                    color: "#FAFDFE",
                    borderRadius: 5,
                    borderColor: "transparent",
                    height: "520px",
                  }} />
              </div>
            ),
          },
          {
            key: "2",
            label: TAB_LABEL_MAPPER["2"],
            children: <Simulator
              projectList={projectList} />,
          },
        ]}
      />
    </div>
  </div>
}

