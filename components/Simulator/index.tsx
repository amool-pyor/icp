import React, { CSSProperties, useEffect, useState } from 'react'
import Card from '../atoms/Card'
import DashboardChartOptionsBar from '../atoms/DashboardChartOptionsBar';

import { Principal } from "@dfinity/principal";
import { SnsGovernanceCanister } from "@dfinity/sns";
import { hexStringToUint8Array } from '@dfinity/utils';
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { Projects } from 'clients/config';
import { Row, Spin } from 'antd';


const defaultLoaderStyle: SimulatorProps["loaderStyle"] = { margin: '30px' }

interface SimulatorProps {
    projectList: any,
    loaderStyle?: CSSProperties
}

const Simulator = ({ projectList, loaderStyle }: SimulatorProps) => {
    const [projectName, setProjectName] = useState<string>("Select Project");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [projectId, setProjectId] = useState<string[]>([]);
    const [year, setYear] = useState<string>("0");
    const [neuron_id, setNeuronId] = useState<any>();
    const [APY, setAPY] = useState<string>();

    useEffect(() => {
        const temp = Projects["Governance"][projectName];
        console.log(temp)

        setProjectId([projectName, Projects["Ledger"][temp]]);
    }, [projectName])


    const handleCalculate = async () => {
        setIsLoading(true);
        // if (!neuron_id) return console.error("neuron_id is null")
        const rootGovernanceCanisterId = Principal.fromText(projectId[0]);
        const rootLedgerCanisterId = Principal.fromText(projectId[1]);
        // const temp = Principal.from("45b9db99dcf3459be1e4019de696f02223ba5e13cde38c21e9667e5c27b13733")
        console.log(rootGovernanceCanisterId)
        const {
            nervousSystemParameters,
            getNeuron,
            listProposals,
        } = SnsGovernanceCanister.create({
            canisterId: rootGovernanceCanisterId,
        });

        console.log(neuron_id, projectId)
        const idVecNat8 = hexStringToUint8Array(neuron_id)
        try {
            let getNeuronData = await getNeuron({ neuronId: { id: idVecNat8 } });
            let listProposalsData: any = await listProposals({ limit: 1 });
            let nervousSystemParametersData = await nervousSystemParameters({
                certified: false,
            });
            let max_dissolve_delay_per = (Number(nervousSystemParametersData.max_dissolve_delay_bonus_percentage[0])) / 100;
            // @ts-ignore
            let dissolve_delay = (Number(getNeuronData.dissolve_state[0]?.DissolveDelaySeconds)) / (3600 * 24);
            let max_dissolve_delay_seconds = (Number(nervousSystemParametersData.max_dissolve_delay_seconds[0])) / (3600 * 24);
            let dissolve_delay_bonus = (Math.min(1, dissolve_delay / max_dissolve_delay_seconds)) * max_dissolve_delay_per;
            let neuron_created_timestamp = Number(getNeuronData.aging_since_timestamp_seconds);
            let neuron_age = (Number(new Date().getTime()) - neuron_created_timestamp * 1000) / (3600 * 24 * 1000);
            let amax = (Number(nervousSystemParametersData.max_neuron_age_for_age_bonus[0])) / (3600 * 24);
            // const age_bonus = (0.25 / amax) * neuron_age;
            let max_age_bonus_per = (Number(nervousSystemParametersData.max_age_bonus_percentage[0])) / 100;
            const age_bonus = Math.min(max_age_bonus_per, (neuron_age / amax) * max_age_bonus_per);
            console.log("age_bonus", age_bonus, "dissolve_delay", dissolve_delay, "neuron_age", neuron_age, new Date().getTime(), "neuron_created_timestamp", neuron_created_timestamp);
            console.log("dissolve_delay_bonus", dissolve_delay_bonus, "amax", amax);
            const ledger = IcrcLedgerCanister.create({
                canisterId: rootLedgerCanisterId
            })
            let icrc1_total_supply = await ledger.totalTokensSupply({ certified: false });

            let rmin = (Number(nervousSystemParametersData.voting_rewards_parameters[0]?.initial_reward_rate_basis_points[0])) / 100;
            let rmax = (Number(nervousSystemParametersData.voting_rewards_parameters[0]?.final_reward_rate_basis_points[0])) / 100;
            let trans_length = (Number(nervousSystemParametersData.voting_rewards_parameters[0]?.reward_rate_transition_duration_seconds[0])) / (60 * 60 * 24 * 365);

            let RT_value = (rmin + ((rmax - rmin) * (Math.max(trans_length - 0, 0) / trans_length) ** 2)) / 100;
            console.log(RT_value, rmin, rmax, trans_length, ((rmax - rmin) * (Math.max(trans_length - 0, 0) / trans_length)))

            let TVP = Number(listProposalsData?.proposals[0].latest_tally[0].total);
            let TS = Number(getNeuronData.cached_neuron_stake_e8s) * (Math.pow(10, -8));
            let VP = TS * (1 + dissolve_delay_bonus) * (1 + age_bonus);
            let TR = (RT_value) * Number(icrc1_total_supply);

            console.log("TVP", TVP, "TS", TS, "VP", VP, "TR", TR)
            console.log("(VP / TVP) * TR", (VP / TVP) * TR)
            let APY_value = (((VP * TR) / (TVP * TS)) * 100).toFixed(2)
            console.log("APY_value", APY_value);

            setAPY(APY_value.toString());
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }

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
                title="Full cycle APR - simulation"
                headStyle={{ fontSize: 18 }}
                style={{
                    width: "40vw",
                    textAlign: "center",
                }}
            >
                <li style={{ marginBottom: "10px" }}>
                    <input type="text" placeholder='Enter Your Neuron Id' style={{ outline: "none", backgroundColor: "black", borderRadius: "6px", display: "block", padding: "5px 10px", width: "100%" }} onChange={(e) => { setNeuronId(e.target.value) }} />
                </li>
                <li style={{ marginBottom: "20px" }}>
                    <DashboardChartOptionsBar
                        projectName={projectName}
                        setProjectName={setProjectName}
                        options={projectList}
                    />
                </li>
                {/* <li style={{ marginBottom: "20px" }} >
                    <input type="number" placeholder='Year' style={{ outline: "none", backgroundColor: "black", borderRadius: "6px", display: "block", padding: "5px 10px", width: "100%" }} onChange={(e) => { setYear(e.target.value) }} value={year} />
                </li> */}
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
                                APY ?
                                    <>
                                        <span>Max maturity APY = </span>
                                        <span>{APY}%</span>
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

export default Simulator