"use client"

import React, { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { SnsGovernanceCanister } from "@dfinity/sns";
import { IcrcLedgerCanister } from "@dfinity/ledger"
// import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";

import { Actor, HttpAgent } from "@dfinity/agent";
import Chart from "@/components/Charts";
import { CUBE_TYPE, getCubeData } from "clients/cube";

export default function icp() {

  async function test() {
    const rootCanisterId = Principal.fromText(
      "vtrom-gqaaa-aaaaq-aabia-cai"
    );
    const {
      nervousSystemParameters,
      metadata,
      getNeuron,
      listNeurons,
      listProposals,
    } = SnsGovernanceCanister.create({
      canisterId: rootCanisterId,
    });

    const agent = new HttpAgent({ host: "https://ic0.app" });
    const ledger = IcrcLedgerCanister.create({
      agent,
      canisterId: rootCanisterId
    });

    // let nervousSystemParametersData = await nervousSystemParameters({
    //   certified: false,
    // });
    // let metadataData = await metadata({ certified: false });
    // let listNeuronData = await listNeurons({});
    // let neuron_id: any = listNeuronData[0].id[0];
    // let getNeuronData = await getNeuron({ neuronId: neuron_id });
    // let listProposalsData = await listProposals({ limit: 1 });
    // let mdData = await totalTokensSupply({ certified: false });

    // console.log(nervousSystemParametersData, "sara-icp");
    // console.log(listNeuronData, "sara-icp");
    // console.log(getNeuronData, "sara-icp");
    // console.log(listProposalsData, "sara-icp");
    // console.log(metadataData)
    try {
      let datas = await ledger.totalTokensSupply({ certified: false });
      console.log(datas);
    } catch (error) {
      console.log(error)
    }

    // let Rmin = nervousSystemParametersData.voting_rewards_parameters.initial_reward_rate_basis_points
    // let Rmax = nervousSystemParametersData.voting_rewards_parameters.final_reward_rate_basis_points
    // let tdelta = nervousSystemParametersData.voting_rewards_parameters.reward_rate_transition_duration_seconds

    // let ddmax = nervousSystemParametersData.max_dissolve_delay_seconds
    // let dd = getNeuronData.dissolve_state[0].WhenDissolvedTimestampSeconds
    // let amax = nervousSystemParametersData.max_neuron_age_for_age_bonus
    // let neuron_created_timestamp =  getNeuronData.aging_since_timestamp_seconds
    // let TS = getNeuronData.cached_neuron_stake_e8s
    // let TVP = listProposalsData?.proposals[0].latest_tally[0].total
  }


  return <Chart
    title="Test"
    chartTitle={"Daily Maturity"}
    chartText={"Daily Maturity"}
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
    }} />;
  // return <div>Hello</div>
}

