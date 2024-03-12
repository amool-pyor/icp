import React, { CSSProperties, useState } from 'react'
import Card from '../atoms/Card'

import { Principal } from "@dfinity/principal";
import { GovernanceCanister } from "@dfinity/nns";
import { Row, Spin } from 'antd';
import { Topics, TopicWeights } from 'clients/config';


const defaultLoaderStyle: SimulatorProps["loaderStyle"] = { margin: '30px' }

interface SimulatorProps {
    loaderStyle?: CSSProperties
}

const NNS_Simulator = ({ loaderStyle }: SimulatorProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [neuron_id, setNeuronId] = useState<any>();
    const [NNS, setNNS] = useState<string>();
    const [list1, setList1] = useState<any>([])
    const [list2, setList2] = useState<any>([])



    const handleCalculate = async () => {
        setIsLoading(true);
        if (!neuron_id) return console.error("neuron_id is null")
        const rootGovernanceCanisterId = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");
        console.log(rootGovernanceCanisterId)

        const { listProposals, getNeuron } = GovernanceCanister.create({
            canisterId: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
        });

        const getNeuronData = await getNeuron({ certified: false, neuronId: neuron_id });
        const listProposalsData: any = await listProposals({
            request: {
                limit: 100,
                includeRewardStatus: [],
                excludeTopic: [],
                includeStatus: [],
                includeAllManageNeuronProposals: true,
                beforeProposal: undefined
            },
            certified: false
        })

        console.log(getNeuronData)
        console.log(listProposalsData)
        let VP: any[] = [];
        let VPW: number = 0;
        let totalWeight: number = 0;
        let UC: any[] = [];

        listProposalsData.proposals.map((item: any) => {
            // console.log(item.id)
            let temp = 0;
            // console.log([Topics[item.topic]], totalWeight, VPW)
            if (TopicWeights[Topics[item.topic]]) {
                totalWeight += TopicWeights[`${Topics[item.topic]}`]
                console.log(TopicWeights[Topics[item.topic]])
            } else {
                totalWeight += 1;
            }
            getNeuronData?.recentBallots.map((item2: any) => {
                if (item2.proposalId === item.id) {
                    console.log("Ok")
                    temp = 1;
                    setList1([...list1, item.id])
                    VP = [...VP, item.id];
                    console.log(item.topic, Topics[item.topic])
                    if (TopicWeights[Topics[item.topic]]) {
                        VPW += TopicWeights[`${Topics[item.topic]}`]
                    } else {
                        VPW += 1;
                    }
                    return;
                }
            })
            if (temp === 0) {
                console.log("done");
                UC = [...UC, item.id];
                setList2([...list2, item.id]);
            }
        })


        setIsLoading(false);
        console.log(VP.length, UC, VPW, totalWeight, VP);

        setNNS((VPW / totalWeight).toString())

        // console.log(TS, TVP)
    }

    return (
        <div style={{
            marginTop: "3rem",
            height: "40vh",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
        >
            <Card
                title="NNS - simulation"
                headStyle={{ fontSize: 18 }}
                style={{
                    width: "40vw",
                    textAlign: "center",
                }}
            >
                <li style={{ marginBottom: "10px" }}>
                    <input type="text" placeholder='Enter Your Neuron Id' style={{ outline: "none", backgroundColor: "black", borderRadius: "6px", display: "block", padding: "5px 10px", width: "100%" }} onChange={(e) => { setNeuronId(e.target.value) }} />
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <button style={{ padding: "5px 10px", borderRadius: "6px", cursor: "pointer", backgroundColor: "#159ffa" }} onClick={handleCalculate} >Calculate</button>
                </li>
            </Card>

            <Row style={{
                margin: "0",
                padding: '0',
                justifyContent: 'center'
            }}>
                {
                    isLoading ?
                        <div className="loader" style={loaderStyle ? loaderStyle : defaultLoaderStyle}>
                            <Spin />
                        </div>
                        :
                        <div style={{ marginTop: "40px" }}>
                            {
                                NNS ?
                                    <>
                                        <span>Max maturity earned per neuron = </span>
                                        <span>{NNS}%</span>
                                    </>
                                    :
                                    null
                            }
                        </div>
                }
            </Row>
        </div >
    )
}

export default NNS_Simulator